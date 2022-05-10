/* eslint-disable capitalized-comments */
/* eslint-disable multiline-comment-style */

import { Collection } from "@guildeno/fraz";
import { ChatMessage } from "@guildeno/types";

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

type Identity<T> = { [P in keyof T]: T[P] };

// Define each of the types here
type BaseDefinition<T> = {
    missing?: (message: ChatMessage) => unknown;
    lowercase?: boolean;
    minimum?: number;
    maximum?: number;
    defaultValue?: T | ((message: ChatMessage) => T) | ((message: ChatMessage) => Promise<T>);
};

// ----------
// Boolean
// ----------

type BooleanArgumentDefinition<N extends string = string> = BaseDefinition<boolean> & {
    name: N;
    type: "boolean";
};

type BooleanOptionalArgumentDefinition<N extends string = string> = BaseDefinition<boolean> & {
    name: N;
    type: "boolean";
    required: false;
};

type MultiBooleanArgumentDefinition<N extends string = string> = BaseDefinition<boolean> & {
    name: N;
    type: "...boolean";
};

type MultiBooleanOptionalArgumentDefinition<N extends string = string> = BaseDefinition<boolean> & {
    name: N;
    type: "...boolean";
    required: false;
};

// ----------
// Command
// ----------

type CommandArgumentDefinition<N extends string = string> = BaseDefinition<string> & {
    name: N;
    type: "command";
};

type CommandOptionalArgumentDefinition<N extends string = string> = BaseDefinition<string> & {
    name: N;
    type: "command";
    required: false;
};

type MultiCommandArgumentDefinition<N extends string = string> = BaseDefinition<string[]> & {
    name: N;
    type: "...command";
};

type MultiCommandOptionalArgumentDefinition<N extends string = string> = BaseDefinition<string[]> & {
    name: N;
    type: "...command";
    required: false;
};

// ----------
// Number
// ----------

type NumberArgumentDefinition<N extends string = string> = BaseDefinition<number> & {
    name: N;
    type: "number";
};

type NumberOptionalArgumentDefinition<N extends string = string> = BaseDefinition<number> & {
    name: N;
    type: "number";
    required: false;
};

type MultiNumberArgumentDefinition<N extends string = string> = BaseDefinition<number> & {
    name: N;
    type: "...number";
};

type MultiNumberOptionalArgumentDefinition<N extends string = string> = BaseDefinition<number> & {
    name: N;
    type: "...number";
    required: false;
};

// ----------
// String
// ----------

type StringArgumentDefinition<N extends string = string> = BaseDefinition<string> & {
    name: N;
    type: "string";
};

type StringOptionalArgumentDefinition<N extends string = string> = BaseDefinition<string> & {
    name: N;
    type: "string";
    required: false;
};

type MultiStringArgumentDefinition<N extends string = string> = BaseDefinition<string[]> & {
    name: N;
    type: "...string";
};

type MultiStringOptionalArgumentDefinition<N extends string = string> = BaseDefinition<string[]> & {
    name: N;
    type: "...string";
    required: false;
};

// ----------
// Subcommand
// ----------

type SubcommandArgumentDefinition<N extends string = string> = BaseDefinition<string> & {
    name: N;
    type: "subcommand";
};
type SubcommandOptionalArgumentDefinition<N extends string = string> = BaseDefinition<string> & {
    name: N;
    type: "subcommand";
    required: false;
};

// Add each of known ArgumentDefinitions to this union.
export type ArgumentDefinition =
    | BooleanOptionalArgumentDefinition
    | BooleanArgumentDefinition
    | MultiBooleanArgumentDefinition
    | MultiBooleanOptionalArgumentDefinition
    | CommandArgumentDefinition
    | CommandOptionalArgumentDefinition
    | MultiCommandArgumentDefinition
    | MultiCommandOptionalArgumentDefinition
    | NumberOptionalArgumentDefinition
    | NumberArgumentDefinition
    | MultiNumberArgumentDefinition
    | MultiNumberOptionalArgumentDefinition
    | StringOptionalArgumentDefinition
    | StringArgumentDefinition
    | SubcommandOptionalArgumentDefinition
    | SubcommandArgumentDefinition
    | MultiStringOptionalArgumentDefinition
    | MultiStringArgumentDefinition;

// OPTIONALS MUST BE FIRST!!!
export type ConvertArgumentDefinitionsToArgs<T extends readonly ArgumentDefinition[]> = Identity<
    UnionToIntersection<
        {
            [P in keyof T]: T[P] extends BooleanOptionalArgumentDefinition<infer N>
                ? { [_ in N]?: boolean }
                : T[P] extends BooleanArgumentDefinition<infer N>
                ? { [_ in N]: boolean }
                : T[P] extends MultiBooleanOptionalArgumentDefinition<infer N>
                ? { [_ in N]?: boolean[] }
                : T[P] extends MultiBooleanArgumentDefinition<infer N>
                ? { [_ in N]: boolean[] }
                : T[P] extends CommandOptionalArgumentDefinition<infer N>
                ? { [_ in N]?: Command<any> }
                : T[P] extends CommandArgumentDefinition<infer N>
                ? { [_ in N]: Command<any> }
                : T[P] extends MultiCommandOptionalArgumentDefinition<infer N>
                ? { [_ in N]?: Command<any>[] }
                : T[P] extends MultiCommandArgumentDefinition<infer N>
                ? { [_ in N]: Command<any>[] }
                : T[P] extends NumberOptionalArgumentDefinition<infer N>
                ? { [_ in N]?: number }
                : T[P] extends NumberArgumentDefinition<infer N>
                ? { [_ in N]: number }
                : T[P] extends MultiNumberOptionalArgumentDefinition<infer N>
                ? { [_ in N]?: number[] }
                : T[P] extends MultiNumberArgumentDefinition<infer N>
                ? { [_ in N]: number[] }
                : T[P] extends StringOptionalArgumentDefinition<infer N>
                ? { [_ in N]?: string }
                : T[P] extends StringArgumentDefinition<infer N>
                ? { [_ in N]: string }
                : T[P] extends MultiStringOptionalArgumentDefinition<infer N>
                ? { [_ in N]?: string[] }
                : T[P] extends MultiStringArgumentDefinition<infer N>
                ? { [_ in N]: string[] }
                : T[P] extends SubcommandArgumentDefinition<infer N>
                ? { [_ in N]?: string }
                : T[P] extends SubcommandOptionalArgumentDefinition<infer N>
                ? { [_ in N]: string }
                : never;
        }[number]
    >
>;

// String valued enum so we can use perm level strings too.
export enum PermissionLevels {
    Member = "Member",
    Moderator = "Moderator",
    Admin = "Admin",
    ServerOwner = "ServerOwner",
    BotSupport = "BotSupport",
    BotDevs = "BotDevs",
    BotOwner = "BotOwner",
}

export type Command<T extends readonly ArgumentDefinition[]> = {
    key?: string;

    /** The name of the command */
    name: string;
    /** The aliases for the command */
    aliases?: string[];
    /** Whether the command should only be available in dms. Default: false */
    dmOnly?: boolean;
    /** Whether the command should only be available in guilds. Default: false */
    guildOnly?: boolean;
    /** The subcommands for this command */
    subcommands?: Collection<string, Command<T>>;
    /** Return undefined if the default checkers should check instead */
    permissionLevels?:
        | (PermissionLevels | keyof typeof PermissionLevels)[]
        | ((message: ChatMessage, command: Command<T>) => boolean | Promise<boolean | undefined> | undefined);
    /** Whether the command should have a cooldown */
    cooldown?: {
        /** How long the user needs to wait after the first execution until he can use the command again */
        ms: number;
        /** How often the user is allowed to use the command until he is in cooldown */
        allowedUses?: number;
    };
    /** The arguments for this command */
    arguments?: T;

    /** The function which will be executed by the command */
    execute?: (
        message: ChatMessage,
        args: ConvertArgumentDefinitionsToArgs<T>,
        //   guild?: Guild
    ) => unknown;
};
