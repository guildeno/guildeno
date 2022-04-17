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
         */
        baseUrl: options.baseUrl,
        /** Authorization token which is used to send requests. */
        token: options.token,
        /**  API version which should be used. */
        version: options.version,

        /**
         * ----------
         * METHODS
         * ----------
         */

        /** URL construction functions. */
        routes,
        /** Function which is used to start a request to Guilded. */
        fetch: async function <T>(method: HttpMethod, route: string, body?: object) {
            return await runMethod<T>(this, method, route, body);
        },

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
    baseUrl: string;
    /** Authorization token which should be used to send requests. */
    token: string;
    /**  API version which should be used. */
    version: number;
};
