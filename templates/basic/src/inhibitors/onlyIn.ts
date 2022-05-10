import { cache } from "../cache";

cache.inhibitors.set("onlyIn", function (message, command) {
    if (command.guildOnly && !message.serverId) return true;
    if (command.dmOnly && message.serverId) return true;

    return false;
});
