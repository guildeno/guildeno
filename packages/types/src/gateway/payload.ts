import { ChatMessage } from "../channel/message/message";
import { Ban } from "../server/ban/ban";
import { ServerMember } from "../server/member/member";
import { Webhook } from "../webhook/webhook";
import { EventName } from "./eventName";
import { OpCode } from "./opcode";

type BasePayload<OP extends OpCode> = {
    /**
     * Opcode for the payload
     */
    op: OP;
    /**
     * Event data
     */
    d?: unknown;
    /**
     * Sequence id, used for resuming sessions
     */
    s?: string;
    /**
     * Event name for this payload
     */
    t?: string;
};

type DispatchPayload<Event extends EventName, D = unknown> = BasePayload<OpCode.Dispatch> & {
    /**
     * Event name for this payload
     */
    t: Event;
    /**
     * Event data
     */
    d: D;
};

type NonDispatchPayload<OP extends OpCode, D = unknown> = Omit<BasePayload<OP>, "t"> & {
    /**
     * Event data
     */
    d: D;
};

/** Welcome payload which Guilded sends after a successful connect. */
export type GatewayWelcome = NonDispatchPayload<OpCode.Welcome, GatewayWelcomeData>;

/** Data which Guilded sends through a welcome payload. */
export type GatewayWelcomeData = {
    /** Id of the last message which has been send to this shard. */
    lastMessageId: string;
    /** User data of this bot. */
    user: GatewayWelcomeUserInfo;
    /** Interval in milliseconds in which a heartbeat ping should be send to Guilded. */
};

/** User data of the bot which Guilded sends through a welcome payload. */
export type GatewayWelcomeUserInfo = {
    /** Id of the user. */
    id: string;
    /** Id of the bot. */
    botId: string;
    /** Name of the user. */
    name: string;
    /** Timestamp in ISO 8601 format of when the user has been created. */
    createdAt: string;
    /** Id of the user which created this bot. */
    createdBy: string;
};

/** A message has been send to a channel. */
export type ChatMessageCreated = DispatchPayload<"ChatMessageCreated", ChatMessageCreatedData>;

/** Data of a `ChatMessageCreated` event payload. */
export type ChatMessageCreatedData = {
    /** Id of the server. */
    serverId: string;
    /** Message which has been send. */
    message: ChatMessage;
};

/** A previously send message has been updated. */
export type ChatMessageUpdated = DispatchPayload<"ChatMessageUpdated", ChatMessageUpdatedData>;

/** Data of a `ChatMessageUpdate` event payload. */
export type ChatMessageUpdatedData = {
    /** Id of the server. */
    serverId: string;
    /** Message which has been updated. */
    message: ChatMessage;
};

/** A previously send message has been deleted. */
export type ChatMessageDeleted = DispatchPayload<"ChatMessageDeleted", ChatMessageDeletedData>;

/** Data of a `ChatMessageDelete` event payload. */
export type ChatMessageDeletedData = {
    /** Id of the server. */
    serverId: string;
    /** Message which has been updated. */
    message: ChatMessageDeletedMessage;
};

/** Partial data of the message which got deleted. */
export type ChatMessageDeletedMessage = {
    /** Id of the message. */
    id: string;
    /** Id of the server. */
    serverId: string;
    /** Id of the channel. */
    channelId: string;
    /** Timestamp in ISO 8601 format of when the message got deleted. */
    deletedAt: string;
    /** Whether the deleted message was private. */
    isPrivate: boolean;
};

/** A server member has joined a team. */
export type TeamMemberJoined = DispatchPayload<"TeamMemberJoined", TeamMemberJoinedData>;

/** Data of a `TeamMemberJoined` event payload. */
export type TeamMemberJoinedData = {
    /** Id of the server. */
    serverId: string;
    /** Member which has joined. */
    message: ServerMember;
};

/** A server member has been removed from a team. */
export type TeamMemberRemoved = DispatchPayload<"TeamMemberRemoved", TeamMemberRemovedData>;

/** Data of a `TeamMemberRemoved` event payload. */
export type TeamMemberRemovedData = {
    /** Id of the server. */
    serverId: string;
    /** Id of the member which has been removed. */
    userId: string;
    /** Whether the remove resulted from a server kick. */
    isKick: boolean;
    /** Whether the remove resulted from a server ban. */
    isBan: boolean;
};

/** A member has been banned from a server. */
export type TeamMemberBanned = DispatchPayload<"TeamMemberBanned", TeamMemberBannedData>;

/** Data of a `TeamMemberBanned` event payload. */
export type TeamMemberBannedData = {
    /** Id of the server. */
    serverId: string;
    /** Data of the related ban. */
    serverMemberBan: Ban;
};

/** A member has been unbanned from a server. */
export type TeamMemberUnbanned = DispatchPayload<"TeamMemberUnbanned", TeamMemberUnbannedData>;

/** Data of a `TeamMemberUnbanned` event payload. */
export type TeamMemberUnbannedData = {
    /** Id of the server. */
    serverId: string;
    /** Ban which has been removed. */
    serverMemberBan: Ban;
};

/** A member has been updated. */
export type TeamMemberUpdated = DispatchPayload<"TeamMemberUpdated", TeamMemberUpdatedData>;

/** Data of a `TeamMemberUpdated` event payload. */
export type TeamMemberUpdatedData = {
    /** Id of the server. */
    serverId: string;
    /** Data for the related update. */
    userInfo: TeamMemberUpdatedUserInfo;
};

/** Data of the member  which got updated. */
export type TeamMemberUpdatedUserInfo = {
    /** Id of the user */
    id: string;
    /** Nickname that was just changed. */
    nickname: string;
};

/** A member's roles have been updated. */
export type TeamRolesUpdated = DispatchPayload<"teamRolesUpdated", TeamRolesUpdatedData>;

/** Data of a `TeamRolesUpdated` event payload */
export type TeamRolesUpdatedData = {
    /** Id of the server. */
    serverId: string;
    /** Role change data for the members which have been updated. */
    memberRoleIds: TeamRolesUpdatedMemberRoles;
};

/**  Role change data for the members which have been updated */
export type TeamRolesUpdatedMemberRoles = {
    /** Id of the user. */
    userId: string;
    /** Ids of the roles that the member now has. */
    roleIds: number[];
};

/** A webhook has been created in a server. */
export type TeamWebhookCreated = DispatchPayload<"TeamWebhookCreated", TeamWebhookCreatedData>;

/** Data of a `TeamWebhookCreated` event payload. */
export type TeamWebhookCreatedData = {
    /** Id of the server. */
    serverId: string;
    /** Webhook which got created. */
    webhook: Webhook;
};

/** A webhook has been updated in a server. */
export type TeamWebhookUpdated = DispatchPayload<"TeamWebhookUpdated", TeamWebhookUpdatedData>;

/** Data of `TeamWebhookUpdated` event payload. */
export type TeamWebhookUpdatedData = {
    /** Id of the server. */
    serverId: string;
    /** Webhook which got updated. */
    webhook: Webhook;
};

export type IncomingPayload = GatewayWelcome | IncomingDispatchPayload;

export type IncomingDispatchPayload =
    | ChatMessageCreated
    | ChatMessageUpdated
    | ChatMessageDeleted
    | TeamMemberJoined
    | TeamMemberRemoved
    | TeamMemberBanned
    | TeamMemberUnbanned
    | TeamMemberUpdated
    | TeamRolesUpdated
    | TeamWebhookCreated
    | TeamWebhookUpdated;
