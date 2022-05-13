import { Embeds } from "@guildeno/fraz";
import { bot } from "..";
import { cache } from "../cache";
import { humanizeMilliseconds } from "../utils/humanizeMilliseconds";

export const membersInCooldown = new Map<string, Cooldown>();

type Cooldown = {
    used: number;
    timestamp: number;
};

cache.inhibitors.set("cooldown", async function (message, command) {
    if (!command.cooldown) return false;

    const key = `${message.createdBy}-${command.name}`;
    const cooldown = membersInCooldown.get(key);
    const now = Date.now();

    if (cooldown) {
        if (cooldown.used >= (command.cooldown.allowedUses ?? 1)) {
            if (cooldown.timestamp > now) {
                await bot.createMessage(message.channelId, {
                    embeds: new Embeds()
                        .setTitle(`Hey <@${message.createdBy}> you are on cooldown.`)
                        .setDescription(
                            `Please wait **${humanizeMilliseconds(
                                cooldown.timestamp - now,
                            )}** before you try to use this command again.`,
                        ),
                });

                return true;
            }

            cooldown.used = 0;
        }

        membersInCooldown.set(key, {
            used: cooldown.used + 1,
            timestamp: now + command.cooldown.ms,
        });

        return false;
    }

    membersInCooldown.set(key, {
        used: 1,
        timestamp: now + command.cooldown.ms,
    });

    return false;
});
