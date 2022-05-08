import { ChannelType } from "./type";

/** Type definition of a server channel. */
export type ServerChannel = {
    /** Id of the channel. */
    id: string;
    /**
     * Type of the channel.
     *
     * This will determine what routes to use for creating content in a channel.
     * For example if this is `chat`, then one must use the routes for creating channel messages.
     */
    type: ChannelType;
    /**
     * Name of the channel.
     *
     * @minimum 1
     * @maximum 100
     */
    name: string;
    /**
     * Topic of the channel.
     *
     * @maximum 512
     */
    topic?: string;
    /**
     * Timestamp in ISO 8601 format,
     * of when the channel was created at.
     */
    createdAt: string;
    /** Id of the user who created this channel. */
    createdBy: string;
    /**
     * Timestamp in ISO 8601 format,
     * of when the channel was updated at,
     * if relevant.
     */
    updatedAt?: string;
    /** Id of the server. */
    serverId: string;
    /**
     * Id of the parent channel or parent thread,
     * if present.
     *
     * Only relevant for server channels.
     */
    parentId?: string;
    /**
     * Id of the category in which the channel is located.
     *
     * Only relevant for server channels.
     */
    categoryId: string;
    /** Id of the group in which the channel is located. */
    groupId: string;
    /**
     * Whether the channel can be accessed from users who are not member of the server.
     *
     * @default false
     */
    isPublic?: boolean;
    /** The Id of the user who archived this channel. */
    archivedBy?: string;
    /**
     * Timestamp in ISO 8601 format,
     * of when the channel was archived at.
     */
    archivedAt?: string;
};
