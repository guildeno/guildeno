import { bot } from "..";
import { Milliseconds } from "../constants";

import { createCommand } from "../utils";

createCommand({
    name: "args",
    permissionLevels: ["BotOwner", "BotDevs"],
    cooldown: { ms: Milliseconds.Second * 5, allowedUses: 2 },
    arguments: [
        {
            name: "test",
            type: "...boolean",
            required: true,
        },
    ] as const,
    execute: async (message, args) => {
        console.log({ args });

        return await bot.createMessage(message.channelId, {
            content: `arguments: ${JSON.stringify(args, undefined, 1)}`,
        });
    },
});
