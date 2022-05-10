import { cache } from "../cache";
import { bot } from "..";
import { Embeds } from "@guildeno/fraz";

cache.commands.set("ping", {
    name: "ping",
    execute: async (message) => {
        const now = Date.now();
        const response = await bot.createMessage(message.channelId, { content: "🏓" });
        const took = Date.now() - now;

        return await bot.updateMessage(response.channelId, response.id, {
            embeds: new Embeds()
                .setColor("#00e676")
                .setTitle("Pong! 🏓")
                .setDescription(`⌛ Time: ${took} ms`)
                .setTimestamp(),
        });
    },
});
