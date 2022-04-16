/** Type definition of how a get docs request should look like. */
export type GetDocs = {
    /**
     * Timestamp in ISO 8601 format,
     * that will be used to filter out the results for the current page.
     */
    before?: string;
    /**
     * Amount of docs which should be returned.
     *
     * @default 25
     * @minimum 1
     * @maximum 100
     */
    limit?: number;
};
