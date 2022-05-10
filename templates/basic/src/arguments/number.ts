import { cache } from "../cache";

cache.arguments.set("number", {
    name: "number",
    execute: function (argument, parameters) {
        const number = parameters[0];

        const valid = Number(number);
        if (!valid) return;

        if (argument.minimum && valid < argument.minimum) return;
        if (argument.maximum && valid > argument.maximum) return;

        parameters.shift();

        return argument.allowDecimals ? Math.floor(valid) : valid;
    },
});

cache.arguments.set("...number", {
    name: "...number",
    execute: function (argument, parameters) {
        if (!parameters.length) return;

        const parsed = [];
        for (const number of parameters) {
            const valid = Number(number);
            if (!valid) continue;

            if (argument.minimum && valid < argument.minimum) continue;
            if (argument.maximum && valid > argument.maximum) continue;

            parsed.push(argument.allowDecimals ? Math.floor(valid) : valid);
        }

        // This clears an array
        parameters.length = 0;

        return parsed;
    },
});
