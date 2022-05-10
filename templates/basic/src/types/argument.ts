import { ChatMessage } from "@guildeno/types";
import { ArgumentDefinition, Command } from "./command";

export type Argument = {
    name: string;
    execute<T extends readonly ArgumentDefinition[]>(
        arg: CommandArgument,
        parameter: string[],
        message: ChatMessage,
        command: Command<T>,
    ): unknown;
};

export type CommandArgument = {
    /** The name of the argument. Useful for when you need to alert the user X arg is missing. */
    name: string;
    /** The type of the argument you would like. Defaults to string. */
    type?:
        | "boolean"
        | "...boolean"
        | "command"
        | "...command"
        | "number"
        | "...number"
        | "string"
        | "...string"
        | "subcommand";
    /** The function that runs if this argument is required and is missing. */
    missing?: (message: ChatMessage) => unknown;
    /** Whether or not this argument is required. Defaults to true. */
    required?: boolean;
    /** If the type is string, this will force this argument to be lowercase. */
    lowercase?: boolean;
    /** If the type is string or subcommand you can provide literals. The argument MUST be exactly the same as the literals to be accepted. For example, you can list the subcommands here to make sure it matches. */
    literals?: string[];
    /** The default value for this argument/subcommand. */
    defaultValue?: string | boolean | number | Command<any>;
    /** If the type is number set the minimum amount. By default the minimum is 0 */
    minimum?: number;
    /** If the type is a number set the maximum amount. By default this is disabled. */
    maximum?: number;
    /** If the type is a number, you can use this to allow/disable non-integers. By default this is false. */
    allowDecimals?: boolean;
};
