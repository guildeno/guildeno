import { ChatMessage, CreateMessage } from "@guildeno/types";
import { Rest } from "../../../rest";

export async function createMessage(rest: Rest, channelId: string, options: CreateMessage): Promise<ChatMessage> {
    return await rest
        .fetch<{ message: ChatMessage }>("POST", rest.routes.createChannelMessage(channelId), options)
        .then((res) => res.message);
}
