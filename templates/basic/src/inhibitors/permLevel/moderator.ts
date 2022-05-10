import { cache } from "../../cache";
import { PermissionLevels } from "../../types";

cache.permissionLevels.set(PermissionLevels.Moderator, () => false);
