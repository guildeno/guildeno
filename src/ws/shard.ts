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
