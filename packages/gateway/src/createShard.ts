import { MessageEvent, WebSocket } from "ws";
import { IncomingPayload, OpCode } from "@guildeno/types";

export function createShard(options: CreateShardOptions) {
    return {
        /*
         * ----------
         *  PROPERTIES
         * ----------
         */

        /** Last received sequence id which is used to resume old sessions. */
        lastSequenceId: undefined as string | undefined,
        /** WebSocket when the shard is connected. */
        socket: undefined as WebSocket | undefined,
        /** Token which is used to authenticate with Guilded. */
        token: options.token,
        /**
         * Url which should be connected to.
         *
         * @default "wss://api.guilded.gg/v1/websocket"
         */
        url: options.url ?? "wss://api.guilded.gg/v1/websocket",

        /*
         * ----------
         *  METHODS
         * ----------
         */

        /** Connect the Shard to Guilded's gateway. */
        connect: function () {
            this.socket = new WebSocket(this.url, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            });

            this.socket.onmessage = (message) => this.handleMessage(message);
        },

        /** The Shards event handlers. */
        events: options.events ?? {},

        /** Handle an incoming message from the Guilded WebSocket. */
        handleMessage: function (message: MessageEvent) {
            if (typeof message.data !== "string") return;

            // TODO: try catch?
            const payload = JSON.parse(message.data) as IncomingPayload;

            if (payload.s) {
                this.lastSequenceId = payload.s;
            }

            switch (payload.op) {
                case OpCode.Dispatch: {
                    break;
                }
                /**
                 * Normally we would need to start heartbeating logic.
                 * But apparently `ws` does that with black magic on its own.
                 */

                case OpCode.Welcome: {
                    console.log("[CONNECTED] as", payload.d.user.name);
                    break;
                }
                // eslint-disable-next-line multiline-comment-style
                // TODO: figure out how resume works
                // Case OpCode.Resumed: {}
            }

            this.events.message?.(this, payload);
        },
    };
}

export type Shard = ReturnType<typeof createShard>;

export type CreateShardOptions = {
    /*
     * ----------
     *  PROPERTIES
     * ----------
     */

    /** Token which is used to authenticate with Guilded. */
    token: string;
    /** Url which should be connected to. */
    url?: string;

    /*
     * ----------
     *  METHODS
     * ----------
     */

    /** Event handlers for this Shard. */
    events?: {
        /** A message has been received from the gateway. */
        message?(shard: Shard, payload: IncomingPayload): unknown;
    };
};
