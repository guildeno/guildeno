/** Type definition of a webhook. */
export type Webhook = {
    /** Id of the webhook. */
    id: string;
    /** Name of the webhook. */
    name: string;
    /** Id of the server. */
    serverId: string;
    /** Id of the channel. */
    channelId: string;
    /**
     * Timestamp in ISO 8601 format,
     * of when this webhook was created at.
     */
    createdAt: string;
    /** Id of the user who created this webhook. */
    createdBy: string;
    /**
     * Timestamp in ISO 8601 format,
     * of when this webhook was deleted.
     */
    deletedAt?: string;
    /** Token of the webhook. */
    token?: string;
};
