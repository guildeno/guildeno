import * as dotenv from "dotenv";
dotenv.config();

export const configs = {
    // Important stuff for authentication
    token: ensureEnv("TOKEN"),

    // Bot interaction stuff
    defaultPrefix: ensureEnv("PREFIX"),

    userIds: {
        botOwners: ensureEnv("BOT_OWNERS").split(","),
        botDevs: process.env.BOT_DEVS?.split(",") ?? [],
        botSupporters: process.env.BOT_SUPPORTERS?.split(",") ?? [],
    },
};

function ensureEnv(name: string): string {
    const variable = process.env[name];

    if (!variable) {
        throw new Error(`Required ENV variable "${name}" has not been found.`);
    }

    return variable;
}
