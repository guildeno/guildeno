import { cache } from "../cache";

const yes = new Set(["true", "yes", "on", "enable", "ye", "yeah", "y"]);
const no = new Set(["false", "no", "off", "disable", "nah", "nope", "n"]);

cache.arguments.set("boolean", {
    name: "boolean",
    execute: function (_, parameters) {
        const boolean = parameters[0];

        if (yes.has(boolean)) {
            parameters.shift();

            return true;
        }

        if (no.has(boolean)) {
            parameters.shift();

            return false;
        }
    },
});

cache.arguments.set("...boolean", {
    name: "...boolean",
    execute: function (_, parameters) {
        if (!parameters.length) return;

        const parsed = [];
        for (const boolean of parameters) {
            if (yes.has(boolean)) {
                parsed.push(true);

                continue;
            }

            if (no.has(boolean)) {
                parsed.push(false);

                continue;
            }
        }

        // This clears an array
        parameters.length = 0;

        return parsed;
    },
});
