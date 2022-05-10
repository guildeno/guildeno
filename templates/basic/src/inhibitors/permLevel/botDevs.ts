import { cache } from "../../cache";
import { PermissionLevels } from "../../types";
import { configs } from "../../configs";

cache.permissionLevels.set(PermissionLevels.BotDevs, (message) => configs.userIds.botDevs.includes(message.createdBy));
