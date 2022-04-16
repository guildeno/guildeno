/** Type definition of a content reaction. */
export type ContentReaction = {
    /** Id of the content reaction. */
    id: number;
    /**
     * Id of the server,
     * if the reaction is in a channel of a server.
     */
    serverId?: string;
    /**
     * Id of the user who reacted with this emote.
     *
     * NOTE: If this content reaction includes a `createdByWebhookId`,
     * then this field can be ignored
     * since the value of this field will then always be `Ann6LewA`
     */
    createdBy: string;
    /**
     * Id of the webhook which reacted with this emote,
     * if this content reaction has been created by a webhook.
     */
    createdByWebhookId?: string;
};
