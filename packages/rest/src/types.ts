/**
 * Internal types.
 *
 * It's very unlikely that those types will be used outside the lib itself.
 * Thats why those types are directly betted into rest and not `@guildeno/types`.
 */

/** Allowed methods to send to Guilded. */
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/** Response codes which Guilded responds to us usually. */
export enum ResponseCodes {
    /** Request was successful. */
    Ok = 200,
    /** Content was created. */
    Created = 201,
    /** No content to return. */
    NoContent = 204,

    /**
     * Request was unacceptable,
     * often due to missing parameters.
     */
    BadRequest = 400,
    /** Access token is missing or invalid. */
    Unauthorized = 401,
    /** Missing permissions to access this route. */
    Forbidden = 403,
    /** Requested resource does not exist. */
    NotFound = 404,
    /** Conflicted with another request. */
    Conflict = 409,
    /**
     * Too many requests have been send in a short time period.
     *
     * Calm down.
     */
    TooManyRequests = 429,
}
