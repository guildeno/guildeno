import fetch from "node-fetch";
import { Rest } from "./rest";
import { HttpMethod, ResponseCodes } from "./types";

export async function runMethod<T>(
    rest: Rest,
    method: HttpMethod,
    route: string,
    body?: object,
    options?: { noAuthorization?: boolean; tryCounts?: number },
): Promise<T> {
    const response = await fetch(`${rest.baseUrl}/v${rest.version}${route}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: options?.noAuthorization !== false ? `Bearer ${rest.token}` : undefined,
        } as { "Content-Type": string; Authorization?: string },
        method,
        body: body ? JSON.stringify(body) : undefined,
        timeout: rest.timeout,
    });

    // TODO: smarter queue system

    if (!response.ok) {
        // TODO: better error handling and forwarding useful for proxies
        switch (response.status) {
            case ResponseCodes.BadRequest:
                throw new Error("[REST] Malformed request");
            case ResponseCodes.Unauthorized:
                if (options?.noAuthorization !== false) {
                    console.error("[REST] CRITICAL - THE PROVIDED AUTHORIZATION TOKEN IS INVALID");
                    process.exit(1);
                }

                break;
            case ResponseCodes.Forbidden:
                throw new Error("[REST] Missing Access");
            case ResponseCodes.NotFound:
                throw new Error("[REST] Not Found");
            case ResponseCodes.Conflict:
                throw new Error("[REST] Conflicted with a different request");
            case ResponseCodes.TooManyRequests:
                // TODO: propper rate limit wait implementation
                /**
                 * Sadly Guilded does not provide any useful headers as of now, therefore this needs thinking.
                 */
                if (options?.tryCounts === undefined || options.tryCounts < rest.maxRetryAmount) {
                    await new Promise((res) => setTimeout(res, 2000));

                    return await rest.fetch<T>(method, route, body, {
                        noAuthorization: options?.noAuthorization,
                        tryCounts: options?.tryCounts ? options.tryCounts + 1 : 1,
                    });
                }

                break;
        }
    }

    if (response.status !== ResponseCodes.NoContent) {
        return (await response.json()) as T;
    }

    return undefined as unknown as T;
}
