/** Type definition of a forum thread. */
export type ForumThread = {
    /** Id of the forum thread. */
    id: number;
    /** Id of the server. */
    serverId: string;
    /** Id of the channel. */
    channelId: string;
    /** Title of the forum thread. */
    title?: string;
    /** Content of the forum thread. */
    content?: string;
    /**
     * Timestamp in ISO 8601 format,
     * of when the forum thread was created at.
     */
    createdAt: string;
    /**
     * Id of the user who created this forum thread.
     *
     * NOTE: If this forum thread includes a `createdByWebhookId`,
     * then this field can be ignored
     * since the value of this field will then always be `Ann6LewA`
     */
    createdBy: string;
    /**
     * Id of the webhook which created this forum thread,
     * if this forum thread has been created by a webhook.
     */
    createdByWebhookId?: string;
    /**
     * Timestamp in ISO 8601 format,
     * of when the forum thread was updated at, if relevant.
     */
    updatedAt?: string;
};
