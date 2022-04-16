/** Type definition of how a get messages request should look like. */
export type GetMessages = {
    /**
     * Timestamp in ISO 8601 format,
     * which will be used to filter out results for the current page.
     */
    before?: string;
    /**
     * Timestamp in ISO 8610 format,
     * which will be used to filter out results for the current page.
     *
     * Order may be reversed when compared to `before` or omitting this parameter altogether.
     */
    after?: string;
    /**
     * Amount of messages to return.
     *
     * @default 50
     * @minimum 1
     * @maximum 100
     */
    limit?: number;
    /**
     * Whether to include private messages.
     *
     * @default false
     */
    includePrivate?: boolean;
};
