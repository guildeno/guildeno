/* eslint-disable capitalized-comments */

import { ChatMessage } from "@guildeno/types";

export type Monitor = {
    /** Name of the monitor */
    name: string;
    /**
     * Whether this monitor should ignore messages that are sent by bots.
     *
     * @default true
     */
    ignoreBots?: boolean;
    /**
     * Whether this monitor should ignore messages that are sent by others.
     *
     * @default false
     */
    ignoreOthers?: boolean;
    /**
     * Whether this monitor should ignore messages that are updated.
     *
     * @default true
     */
    ignoreUpdates?: boolean;
    /**
     * Whether this monitor should ignore messages that are sent in DM.
     *
     * @default true
     */
    ignoreDM?: boolean;
    execute: (message: ChatMessage) => unknown;
};
