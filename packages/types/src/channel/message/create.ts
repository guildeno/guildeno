import { ChatEmbed } from "../embed/chat";

/** Type definition of how a create message object should look like. */
export type CreateMessage = {
    /**
     * If set to `true`,
     * this message will only be displayed to those,
     * who have been mentioned or replied to.
     */
    isPrivate?: boolean;
    /**
     * If set to `true`,
     * this message will not notify any mentioned users or roles.
     */
    isSilent?: boolean;
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
    /**
     * At this time, only one embed is supported per message.
     * Attachments are unsupported.
     * If you need to send more than one embed or upload attachments,
     * consider creating a message via a webhook.
     *
     * @minimum 1
     * @maximum 1
     */
    embeds?: ChatEmbed[];
};
