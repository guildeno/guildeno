import { RequireAtLeastOne } from "../../utils";
import { ChannelType } from "./type";

/** Type definition of how a create channel request should look like. */
export type CreateChannel = RequireAtLeastOne<
    {
        /**
         * Name of the channel.
         *
         * @minimum 1
         * @maximum 100
         */
        name?: string;
        /**
         * Topic of the channel.
         *
         * @minimum 512
         */
        topic?: string;
        // TODO: figure out default
        /** Type of the channel. */
        type?: ChannelType;
        /**
         * Server in which the channel should be created in.
         *
         * Optional if providing a `groupId` or `categoryId`.
         */
        serverId?: string;
        /**
         * Group in which the channel should be created in.
         *
         * If not provided,
         * channel will be created in the "Server home" group from `serverId`
         * or in the group that corresponds to `categoryId`.
         */
        groupId?: string;
        /**
         * Category in which the channel should be created in.
         *
         * If not provided, channel will be a top-level channel.
         */
        categoryId?: string;
    },
    "serverId" | "groupId" | "categoryId"
>;
