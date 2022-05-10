import { cache } from "../../cache";
import { PermissionLevels } from "../../types";
import { configs } from "../../configs";

cache.permissionLevels.set(PermissionLevels.BotSupport, (message) =>
    configs.userIds.botSupporters.includes(message.createdBy),
);
