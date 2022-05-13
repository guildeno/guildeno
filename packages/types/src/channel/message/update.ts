import { RequireAtLeastOne } from "../../utils";
import { ChatEmbed } from "../embed/chat";

/** Type definition of how a update message object should look like. */
export type UpdateMessage = RequireAtLeastOne<{
    /**
     * Content of the message.
     * In markdown format.
     *
     * @minimum 1
     * @maximum 4000
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
}>;
