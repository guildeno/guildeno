/** Type definition of how an update webhook request should look like. */
export type UpdateWebhook = {
    // TODO: figure out max length
    /**
     * Name of the webhook.
     *
     * @minimum 1
     */
    name: string;
    /** Id of the channel where the webhook should be moved to. */
    channelId?: string;
};
