import { handleChatChannelTyping } from "./channels/ChatChannelTyping.ts";

export let handlers = {
  // Channels
  ChatChannelTyping: handleChatChannelTyping,
};

export type Handlers = typeof handlers;

export function updateHandlers(newHandlers: Handlers) {
  handlers = {
    ...handlers,
    ...newHandlers,
  };
}
