import { cache } from "../cache";
import { ArgumentDefinition, Command } from "../types";
import { Collection } from "@guildeno/fraz";
import { log } from "./logger";

export function createCommand<T extends readonly ArgumentDefinition[]>(command: Command<T>) {
    cache.commands.set(command.name, command);
}

const toRegister = new Collection<string, Command<any>>();

export function createSubcommand<T extends readonly ArgumentDefinition[]>(commandName: string, subcommand: Command<T>) {
    subcommand.key = `${commandName}-${subcommand.name}`;
    toRegister.set(subcommand.key, subcommand);
}

export function loadSumcommands() {
    const order = [...toRegister.keys()];
    order.sort((a, b) => a.localeCompare(b));

    for (const commandName of order) {
        const names = commandName.split("-");

        let command = cache.commands.get(names[0]);

        if (!command) {
            log.warn(`Parent command for ${commandName} is missing`);

            return;
        }

        if (names.length > 2) {
            for (let i = 1; i < names.length - 1; ++i) {
                const validCommand: Command<any> | undefined = command!.subcommands?.get(names[i]);

                if (!validCommand) {
                    log.warn(`Parent command for ${commandName} is missing`);

                    continue;
                }

                command = validCommand;
            }
        }

        if (!command.subcommands) {
            command.subcommands = new Collection();
        }

        const subcommand = toRegister.get(commandName);

        if (!subcommand) {
            log.warn(`Subcommand ${commandName} is not in register queue`);

            continue;
        }

        log.debug("Creating subcommand", command.name, subcommand.name);
        command.subcommands.set(subcommand.name, subcommand);
    }
}
