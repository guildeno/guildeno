import { createRest, Helpers, Rest } from "@guildeno/rest";
import { createShard, Shard } from "@guildeno/gateway";
import { createEventHandle, EventHandlers } from "./eventHandlers";

export function createBot(options: CreateBotOptions): { rest: Rest; shard: Shard; start: () => void } & Helpers {
    const handle = createEventHandle(options.eventHandlers);

    const rest = createRest({ token: options.token });
    const shard = createShard({ token: options.token, events: { message: (_, payload) => handle(payload) } });

    return {
        rest,
        shard,
        start: function () {
            this.shard.connect();
        },

        ...rest.helpers,
    };
}

export type CreateBotOptions = {
    eventHandlers: EventHandlers;
    token: string;
};
