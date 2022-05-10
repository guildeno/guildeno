import { cache } from "../cache";
import { parseCommand } from "../monitors/commandsHandler";

cache.arguments.set("command", {
    name: "command",
    execute: function (_, parameters) {
        const name = parameters[0];
        if (!name) return;

        const command = parseCommand(name);

        if (command) {
            parameters.shift();

            return command;
        }
    },
});

cache.arguments.set("...command", {
    name: "...command",
    execute: function (_, parameters) {
        if (!parameters.length) return;

        const parsed = [];
        for (const name of parameters) {
            const command = parseCommand(name);

            if (command) {
                parsed.push(command);
            }
        }

        // This clears an array
        parameters.length = 0;

        return parsed;
    },
});
