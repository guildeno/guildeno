import { createBot } from "@guildeno/fraz";
import { cache } from "./cache";
import { configs } from "./configs";
import { loadSubcommands } from "./utils";
import { loadFolder } from "./utils/loadFolder";

export let bot: ReturnType<typeof createBot>;

async function main() {
    const folders = ["events", "monitors", "arguments", "inhibitors", "tasks", "commands"];
    await Promise.all(folders.map((path) => loadFolder(`./src/${path}`)));

    loadSubcommands();

    bot = createBot({
        token: configs.token,
        eventHandlers: cache.eventHandlers,
    });

    bot.start();
}

main();
