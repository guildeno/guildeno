import { cache } from "../cache";
import { Milliseconds } from "../constants/milliseconds";
import { membersInCooldown } from "../inhibitors/cooldown";
import { registerTask } from "../utils/registerTask";

registerTask({
    name: "Clear finished command cooldowns",
    interval: Milliseconds.Second * 30,
    execute: function () {
        const now = Date.now();

        membersInCooldown.forEach((cooldown, key) => {
            if (cooldown.timestamp > now) return;
            membersInCooldown.delete(key);
        });

        cache.generalCooldown.forEach((timestamp, key) => {
            if (timestamp > now + 1500) {
                cache.generalCooldown.delete(key);
            }
        });
    },
});
