import { cache } from "../../cache";
import { PermissionLevels } from "../../types";
import { configs } from "../../configs";

cache.permissionLevels.set(PermissionLevels.BotOwner, (message) =>
    configs.userIds.botOwners.includes(message.createdBy),
);
