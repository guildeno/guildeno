/** Type definition of a doc. */
export type Doc = {
    /** Id of the doc. */
    id: number;
    /** Id of the server. */
    serverId: string;
    /** Id of the channel. */
    channelId: string;
    /** Title of the doc. */
    title: string;
    /**
     * Content of the doc.
     * In markdown format.
     */
    content: string;
    /**
     * Timestamp in ISO 8601 format,
     * of when the doc was created at.
     */
    createdAt: string;
    /** Id of the user who created this doc. */
    createdBy: string;
    /**
     * Timestamp in ISO 8601 format,
     * of when the doc was updated,
     * if relevant.
     */
    updatedAt?: string;
    /** Id of the user who updated this doc. */
    updatedBy?: string;
};
