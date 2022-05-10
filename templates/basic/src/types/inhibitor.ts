import { ChatMessage } from "@guildeno/types";
import { Command } from "./command";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Inhibitor = (message: ChatMessage, command: Command<any>) => boolean | Promise<boolean>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PermissionLevelChecker = (message: ChatMessage, command: Command<any>) => boolean | Promise<boolean>;
