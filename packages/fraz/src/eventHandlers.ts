import {
    ChatMessageCreatedData,
    ChatMessageDeletedData,
    ChatMessageUpdatedData,
    IncomingPayload,
    OpCode,
    TeamMemberBannedData,
    TeamMemberJoinedData,
    TeamMemberRemovedData,
    TeamMemberUnbannedData,
    TeamMemberUpdatedData,
    TeamRolesUpdatedData,
    TeamWebhookCreatedData,
    TeamWebhookUpdatedData,
} from "@guildeno/types";

export function createEventHandle(handlers: EventHandlers) {
    const h = {
        ChatMessageCreated: handlers.chatMessageCreated,
        ChatMessageUpdated: handlers.chatMessageUpdated,
        ChatMessageDeleted: handlers.chatMessageDeleted,
        TeamMemberJoined: handlers.teamMemberJoined,
        TeamMemberRemoved: handlers.teamMemberRemoved,
        TeamMemberBanned: handlers.teamMemberBanned,
        TeamMemberUnbanned: handlers.teamMemberUnbanned,
        TeamMemberUpdated: handlers.teamMemberUpdated,
        teamRolesUpdated: handlers.teamRolesUpdated,
        TeamWebhookCreated: handlers.teamWebhookCreated,
        TeamWebhookUpdated: handlers.teamWebhookUpdated,
    };

    return (payload: IncomingPayload) => {
        if (payload.op !== OpCode.Dispatch) {
            return;
        }

        h[payload.t]?.(payload.d as any);
    };
}

export type EventHandlers = {
    chatMessageCreated?: (data: ChatMessageCreatedData) => unknown;
    chatMessageUpdated?: (data: ChatMessageUpdatedData) => unknown;
    chatMessageDeleted?: (data: ChatMessageDeletedData) => unknown;
    teamMemberJoined?: (data: TeamMemberJoinedData) => unknown;
    teamMemberRemoved?: (data: TeamMemberRemovedData) => unknown;
    teamMemberBanned?: (data: TeamMemberBannedData) => unknown;
    teamMemberUnbanned?: (data: TeamMemberUnbannedData) => unknown;
    teamMemberUpdated?: (data: TeamMemberUpdatedData) => unknown;
    teamRolesUpdated?: (data: TeamRolesUpdatedData) => unknown;
    teamWebhookCreated?: (data: TeamWebhookCreatedData) => unknown;
    teamWebhookUpdated?: (data: TeamWebhookUpdatedData) => unknown;
};
