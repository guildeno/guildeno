/** Type definition of how a create message object should look like. */
export type CreateMessage = {
    /**
     * If set to `true`,
     * this message will only be displayed to those,
     * who have been mentioned or replied to.
     */
    isPrivate?: boolean;
    /**
     * Message Ids to reply to.
     *
     * @minimum 1
     * @maximum 5
     */
    replyMessageIds?: string[];
    /**
     * Content of the message.
     * In markdown format.
     *
     * @minimum 1 characters
     * @maximum 4000 characters
     */
    content: string;
};
