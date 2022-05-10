import { cache } from "../cache";

cache.arguments.set("subcommand", {
    name: "subcommand",
    execute: function (argument, parameters, _message, command) {
        const name = parameters[0];

        let subcommand = command.subcommands?.get(name);

        if (!subcommand) {
            subcommand = command.subcommands?.find((sub) => !!sub.aliases?.includes(name));
        }

        if (subcommand) {
            parameters.shift();

            return subcommand;
        }

        if (typeof argument.defaultValue === "string") {
            return command.subcommands?.get(argument.defaultValue);
        }
    },
});
