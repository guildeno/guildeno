import { cache } from "../../cache";

cache.inhibitors.set("permLevel", async function (message, command) {
    if (!command.permissionLevels?.length) return false;

    if (typeof command.permissionLevels === "function") {
        const allowed = await command.permissionLevels(message, command);
        return !allowed;
    }

    for (const permLevel of command.permissionLevels) {
        const hasPermission = cache.permissionLevels.get(permLevel);
        if (!hasPermission) continue;

        const allowed = await hasPermission(message, command);

        if (allowed) return false;
    }

    return true;
});
