import { red } from "https://deno.land/std@0.91.0/fmt/colors.ts";
import { eventHandlers } from "../bot.ts";
import { handlers } from "../handlers/mod.ts";
import { GatewayEventData } from "../types/gateway/GatewayEventData.ts";
import { baseEndpoints } from "../utils/constants.ts";

export function createShard(hmac: string) {
  const ws = new WebSocket(`${baseEndpoints.BASE_GATEWAY_URL}/?jwt=${hmac}&EIO=3&transport=websocket`);

  const shard: Shard = {
    ws,
    sessionId: "",
    heartbeatIntervalId: 0,
    pingInterval: 0,
  };

  ws.onmessage = async function (event) {
    const code = event.data.match(/\d+/)?.toString();
    if (!code) return;

    const data: GatewayEventData = JSON.parse(event.data.match(/\{.*\}/)?.toString() ?? "{}");

    switch (code) {
      case "0": {
        shard.sessionId = data.sid;
        shard.pingInterval = data.pingInterval;

        // BEGIN HEARTBEATING
        shard.heartbeatIntervalId = setInterval(() => heartbeat(shard), data.pingInterval);

        break;
      }
      case "3": {
        console.log("Received Heartbeat");
        break;
      }
      case "40": {
        console.log("Shard ready!");
        break;
      }
      case "42": {
        eventHandlers.raw?.(data);
        await eventHandlers.dispatchRequirements?.(data);

        // @ts-ignore -
        return handlers[data.type]?.(data);
      }
      default: {
        console.log(red("Received unknown event"), event.data);
      }
    }
  };

  ws.onclose = function (closeEvent) {
    eventHandlers.debug?.({
      type: "wsClose",
      data: closeEvent,
    });
  };

  ws.onerror = function (errorEvent) {
    eventHandlers.debug?.({
      type: "wsError",
      data: errorEvent,
    });
  };
}

function heartbeat(shard: Shard) {
  // ONLY SEND HEARTBEATS WHEN THE WS IS OPEN
  if (shard.ws.readyState !== WebSocket.OPEN) return;

  eventHandlers.debug?.({
    type: "gatewayHeartbeat",
    data: {
      interval: shard.pingInterval,
    },
  });

  shard.ws.send("2");
}
