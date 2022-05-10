import { EventHandlers, Collection } from "@guildeno/fraz";
import { Argument, Command, Inhibitor, Monitor, PermissionLevelChecker, PermissionLevels } from "./types";

export const cache = {
    arguments: new Collection<string, Argument>(),
    commands: new Collection<string, Command<any>>(),
    eventHandlers: {} as EventHandlers,
    generalCooldown: new Collection<string, number>(),
    guildPrefixes: new Collection<string, string>(),
    inhibitors: new Collection<string, Inhibitor>(),
    monitors: new Collection<string, Monitor>(),
    permissionLevels: new Collection<keyof typeof PermissionLevels, PermissionLevelChecker>(),
};
