import { GatewayEventData } from "../../types/gateway/GatewayEventData.ts";

// deno-lint-ignore require-await
export async function handleChatChannelTyping(data: GatewayEventData) {
  // deno-lint-ignore no-explicit-any
  const payload = data as any;

  console.log("ChatChannelTyping", { channelId: payload.channelId, userId: payload.userId });
}
