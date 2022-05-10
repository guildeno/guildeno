/* eslint-disable @typescript-eslint/no-explicit-any */

import { ChatMessage } from "@guildeno/types";
import { bgBlack, bgGreen, bgMagenta, bgYellow, black, green, red, white } from "colorette";
import { bot } from "..";
import { cache } from "../cache";
import { configs } from "../configs";
import { Command, ConvertArgumentDefinitionsToArgs } from "../types";
import { log } from "../utils";

cache.monitors.set("commandHandler", {
    name: "commandHandler",
    ignoreBots: true,
    ignoreUpdates: true,
    execute: async (message) => {
        if (!message.content.startsWith(configs.defaultPrefix)) {
            return;
        }

        const prefix = parsePrefix(message.serverId);
        if (!message.content.startsWith(prefix)) return;

        /*
         * Get the first word of the message without the prefix so it is just command name. `!ping testing` becomes `ping`
         * Get the first word of the message (command name) and the following parameters.
         * Substring - remove the prefix `!ping` becomes `ping`
         * Trim - remove possible white spaces (ux for phone users) `   ping` becomes `ping`
         */
        const [commandName, ...parameters] = message.content.substring(prefix.length).trimStart().split(" ");

        // Check if this is a valid command
        const command = parseCommand(commandName);
        if (!command) return;

        const guild = { name: "SERVER" };
        logCommand(message, guild?.name ?? "DM", "Trigger", commandName);

        const lastUsed = cache.generalCooldown.get(message.createdBy);
        if (lastUsed && Date.parse(message.createdAt) - lastUsed < 1500) {
            if (message.serverId) {
                await bot.deleteMessage(message.channelId, message.id);
            }

            return logCommand(message, guild?.name || "DM", "Slowmode", commandName);
        }

        executeCommand(message, command, parameters);
    },
});

export function logCommand(
    message: ChatMessage,
    guildName: string,
    type: "Failure" | "Success" | "Trigger" | "Slowmode" | "Missing" | "Inhibit",
    commandName: string,
) {
    const command = `[COMMAND: ${bgYellow(black(commandName || "Unknown"))} - ${bgBlack(
        ["Failure", "Slowmode", "Missing"].includes(type) ? red(type) : type === "Success" ? green(type) : white(type),
    )}]`;

    const user = bgGreen(black(`USER(${message.createdBy})`));
    const guild = bgMagenta(black(`${guildName}${message.serverId ? `(${message.serverId})` : ""}`));

    log.info(`${command} by ${user} in ${guild} with MessageID: ${message.id}`);
}

export function parsePrefix(guildId: string | undefined): string {
    return guildId ? cache.guildPrefixes.get(guildId) ?? configs.defaultPrefix : configs.defaultPrefix;
}

export function parseCommand(commandName: string) {
    commandName = commandName.toLowerCase();
    const command = cache.commands.get(commandName);
    if (command) return command;

    return cache.commands.find((cmd) => !!cmd.aliases?.includes(commandName));
}

async function parseArguments(
    message: ChatMessage,
    command: Command<any>,
    parameters: string[],
): Promise<
    | false
    | {
          [key: string]: unknown;
      }
> {
    const args: { [key: string]: unknown } = {};
    if (!command.arguments) return args;

    let missingRequiredArg = false;

    for (const argument of command.arguments) {
        const resolver = cache.arguments.get(argument.type);
        if (!resolver) continue;

        while (parameters[0] === "") {
            parameters.shift();
        }

        // RESOLVER CAN AND WILL MODIFY parameters!!!!
        const result = await resolver.execute(argument, parameters, message, command);
        if (result !== undefined) {
            args[argument.name] = result;

            /*
             * Subcommands eat up all following arguments.
             * Multi args (eg. ...string, ...number) eat up all following parameters so just quit.
             */
            if (argument.type === "subcommand" || argument.type[0] === ".") {
                break;
            }

            continue;
        }

        // Invalid arg provided.
        if (Reflect.has(argument, "defaultValue")) {
            if (typeof argument.defaultValue === "function") {
                args[argument.name] = await argument.defaultValue(message);

                continue;
            }

            args[argument.name] = argument.defaultValue;

            continue;
        }

        if (argument.required !== false) {
            missingRequiredArg = true;
            argument.missing?.(message);

            break;
        }
    }

    // If an arg was missing then return false so we can error out as an object {} will always be truthy
    return missingRequiredArg ? false : args;
}

async function commandAllowed(message: ChatMessage, command: Command<any>) {
    const inhibitorResults = await Promise.all(cache.inhibitors.map((inhibitor) => inhibitor(message, command)));

    if (inhibitorResults.includes(true)) {
        const guild = { name: "SERVER" };
        logCommand(message, guild?.name || "DM", "Inhibit", command.key ?? command.name);

        return false;
    }

    return true;
}

async function executeCommand(
    message: ChatMessage,
    command: Command<any>,
    /** Parameters of the command. THESE WILL GET MODIFIED */
    parameters: string[],
): Promise<void> {
    try {
        cache.generalCooldown.set(message.createdBy, Date.now());

        const args = await parseArguments(message, command, parameters);
        if (args === false) {
            const guild = { name: "SERVER" };
            return logCommand(message, guild?.name || "DM", "Missing", command.key ?? command.name);
        }

        /*
         * If no subcommand execute the command
         * Only the first argument is allowed to be a subcommand
         */
        const argument = command.arguments?.[0] || [];
        const subcommand = argument ? (args[argument.name] as Command<any>) : undefined;

        if (argument?.type !== "subcommand" || !subcommand) {
            if (!(await commandAllowed(message, command))) return;

            await command.execute?.(message, args as ConvertArgumentDefinitionsToArgs<any>);

            const guild = { name: "SERVER" };
            logCommand(message, guild?.name || "DM", "Success", command.key ?? command.name);

            return;
        }

        return await executeCommand(message, subcommand, parameters);
    } catch (error) {
        log.error(error);
        const guild = { name: "SERVER" };
        logCommand(message, guild?.name || "DM", "Failure", command.key ?? command.name);
    }
}
