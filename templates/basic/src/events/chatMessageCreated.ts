/* eslint-disable multiline-comment-style,capitalized-comments */

import { cache } from "../cache";
import { log } from "../utils";

cache.eventHandlers.chatMessageCreated = (message) => {
    cache.monitors.forEach(async (monitor) => {
        // TODO: bot check
        // if (monitor.ignoreBots !== false && message.bybot) return;

        if (monitor.ignoreDM !== false && !message.message.serverId) {
            return;
        }

        if (monitor.ignoreUpdates !== false && message.message.updatedAt) {
            return;
        }

        // TODO: bot id check
        // if (monitor.ignoreOthers && message.authorId !== botId) return;

        // TODO: perm checks

        try {
            await monitor.execute(message.message);
        } catch (error) {
            log.error(error);
        }
    });
};
