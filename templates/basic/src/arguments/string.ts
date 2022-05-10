import { cache } from "../cache";

cache.arguments.set("string", {
    name: "string",
    execute: function (argument, parameters) {
        const text = parameters[0];

        if (!text) return;

        if (argument.literals?.length && !argument.literals.includes(text.toLowerCase())) {
            return;
        }

        parameters.shift();

        return argument.lowercase ? text.toLowerCase() : text;
    },
});

cache.arguments.set("...string", {
    name: "...string",
    execute: function (argument, parameters) {
        if (!parameters.length) return;

        if (
            argument.literals?.length &&
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            !parameters.every((param) => argument.literals!.includes(param.toLowerCase()))
        ) {
            return;
        }

        const final = argument.lowercase ? parameters.join(" ").toLowerCase() : parameters.join(" ");

        // This clears an array
        parameters.length = 0;

        return final;
    },
});
