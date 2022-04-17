import fetch from "node-fetch";
import { Rest } from "./rest";
import { HttpMethod } from "./types";

export async function runMethod<T>(
    rest: Rest,
    method: HttpMethod,
    route: string,
    body?: object,
    options?: { noAuthorization?: boolean },
): Promise<T> {
    console.log({ method, route, body });
    const response = await fetch(`${rest.baseUrl}/v${rest.version}${route}`, {
        headers: {
            Authorization: options?.noAuthorization !== false ? `Bearer ${rest.token}` : undefined!,
            "Content-Type": "application/json",
        },
        method,
        body: JSON.stringify(body),
    });

    if (response.headers.get("content-type") === "application/json") {
        return (await response.json()) as T;
    }

    return undefined as unknown as T;
}
