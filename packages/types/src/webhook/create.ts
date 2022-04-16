/** Type definition of how a create webhook request should look like. */
export type CreateWebhook = {
    // TODO: figure out max length
    /**
     * Name of the webhook.
     *
     * @minimum 1
     */
    name: string;
    /** Id of the channel where the webhook should be created in. */
    channelId: string;
};
