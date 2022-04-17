import { API_VERSION, BASE_URL } from "./constants";
import { createHelpers, Helpers } from "./helpers";
import { routes } from "./routes";
import { runMethod } from "./runMethod";
import { HttpMethod } from "./types";

export function createRest(options: CreateRestOptions) {
    const rest = {
        /**
         * ----------
         * PROPERTIES
         * ----------
         */

        /**
         * Base URL which should be used to construct the routes.
         *
         * This can also be the URL for proxy instances.
         *
         * @default "https://www.guilded.gg/api"
         */
        baseUrl: options.baseUrl ?? BASE_URL,
        /**
         * Amount of times to retry a rate limited request before it should get dropped.
         *
         * @default 3
         */
        maxRetryAmount: options.maxRetryAmount ?? 3,
        /**
         * Timeout duration in milliseconds after which the request should be seen as failed.
         *
         * @default 10000 - 10 seconds
         */
        timeout: options.timeout ?? 10000,
        /** Authorization token which is used to send requests. */
        token: options.token,
        /**
         * API version which should be used.
         *
         * @default 1
         */
        version: options.version ?? API_VERSION,

        /**
         * ----------
         * METHODS
         * ----------
         */

        /** URL route construction functions. */
        routes,
        /** Function which is used to start a request to Guilded. */
        fetch: async function <T>(
            method: HttpMethod,
            route: string,
            body?: object,
            options?: { noAuthorization?: boolean; tryCounts?: number },
        ) {
            return await runMethod<T>(this, method, route, body, options);
        },
        /**
         * Helper functions which can be used to make requests to Guilded's API.
         *
         * Those should preferably used instead of `rest.fetch()`.
         */
        helpers: {} as Helpers,
    };

    rest.helpers = createHelpers(rest);

    return rest;
}

export type Rest = ReturnType<typeof createRest>;

export type CreateRestOptions = {
    /**
     * Base URL which should be used to construct the routes.
     *
     * This can also be the URL for proxy instances.
     */
    baseUrl?: string;
    /**
     * Amount of times to retry a rate limited request before it should get dropped.
     *
     * @default 3
     */
    maxRetryAmount?: number;
    /**
     * Timeout duration in milliseconds after which the request should be seen as failed.
     *
     * @default 10000 - 10 seconds
     */
    timeout?: number;
    /** Authorization token which should be used to send requests. */
    token: string;
    /**  API version which should be used. */
    version?: number;
};
