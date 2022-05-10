import { bot } from "..";
import { createCommand, createSubcommand } from "../utils";

createCommand({
    name: "sub",
    arguments: [
        {
            name: "subcommand",
            type: "subcommand",
            required: false,
        },
    ] as const,
    execute: async (message) => {
        return await bot.createMessage(message.channelId, {
            content: "main command",
        });
    },
});

createSubcommand("sub", {
    name: "set",
    arguments: [
        {
            name: "subcommand",
            type: "subcommand",
            required: false,
        },
        {
            name: "language",
            type: "string",
            required: false,
        },
    ] as const,
    execute: async function (message, args) {
        return await bot.createMessage(message.channelId, {
            content: `subcommand: ${JSON.stringify(args)}`,
        });
    },
});

createSubcommand("sub-set", {
    name: "delete",
    arguments: [
        {
            name: "goe",
            type: "string",
            required: true,
        },
    ] as const,
    execute: async function (message, args) {
        return await bot.createMessage(message.channelId, {
            content: `the dunder: ${JSON.stringify(args)}`,
        });
    },
});
