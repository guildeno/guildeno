import {
    IncomingPayload,
    OpCode,
    ChatMessageCreatedData,
    ChatMessageUpdatedData,
    ChatMessageDeletedData,
    TeamMemberJoinedData,
    TeamMemberRemovedData,
    TeamMemberBannedData,
    TeamMemberUnbannedData,
    TeamMemberUpdatedData,
    TeamRolesUpdatedData,
    TeamChannelCreatedData,
    TeamChannelUpdatedData,
    TeamChannelDeletedData,
    TeamWebhookCreatedData,
    TeamWebhookUpdatedData,
    DocCreatedData,
    DocUpdatedData,
    DocDeletedData,
    ListItemCreatedData,
    ListItemUpdatedData,
    ListItemDeletedData,
    ListItemCompletedData,
    ListItemUncompletedData,
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
        TeamChannelCreated: handlers.teamChannelCreated,
        TeamChannelUpdated: handlers.teamChannelUpdated,
        TeamChannelDeleted: handlers.teamChannelDeleted,
        TeamWebhookCreated: handlers.teamWebhookCreated,
        TeamWebhookUpdated: handlers.teamWebhookUpdated,
        DocCreated: handlers.docCreated,
        DocUpdated: handlers.docUpdated,
        DocDeleted: handlers.docDeleted,
        ListItemCreated: handlers.listItemCreated,
        ListItemUpdated: handlers.listItemUpdated,
        ListItemDeleted: handlers.listItemDeleted,
        ListItemCompleted: handlers.listItemCompleted,
        ListItemUncompleted: handlers.listItemUncompleted,
    };

    return async (payload: IncomingPayload) => {
        if (payload.op !== OpCode.Dispatch) {
            return;
        }
        handlers.raw?.(payload);
        await handlers.dispatch?.(payload);

        h[payload.t]?.(payload.d as any);
    };
}

export type EventHandlers = {
    raw?: (payload: IncomingPayload) => unknown;
    dispatch?: (payload: IncomingPayload) => Promise<unknown>;

    chatMessageCreated?: (data: ChatMessageCreatedData) => unknown;
    chatMessageUpdated?: (data: ChatMessageUpdatedData) => unknown;
    chatMessageDeleted?: (data: ChatMessageDeletedData) => unknown;
    teamMemberJoined?: (data: TeamMemberJoinedData) => unknown;
    teamMemberRemoved?: (data: TeamMemberRemovedData) => unknown;
    teamMemberBanned?: (data: TeamMemberBannedData) => unknown;
    teamMemberUnbanned?: (data: TeamMemberUnbannedData) => unknown;
    teamMemberUpdated?: (data: TeamMemberUpdatedData) => unknown;
    teamRolesUpdated?: (data: TeamRolesUpdatedData) => unknown;
    teamChannelCreated?: (data: TeamChannelCreatedData) => unknown;
    teamChannelUpdated?: (data: TeamChannelUpdatedData) => unknown;
    teamChannelDeleted?: (data: TeamChannelDeletedData) => unknown;
    teamWebhookCreated?: (data: TeamWebhookCreatedData) => unknown;
    teamWebhookUpdated?: (data: TeamWebhookUpdatedData) => unknown;
    docCreated?: (data: DocCreatedData) => unknown;
    docUpdated?: (data: DocUpdatedData) => unknown;
    docDeleted?: (data: DocDeletedData) => unknown;
    listItemCreated?: (data: ListItemCreatedData) => unknown;
    listItemUpdated?: (data: ListItemUpdatedData) => unknown;
    listItemDeleted?: (data: ListItemDeletedData) => unknown;
    listItemCompleted?: (data: ListItemCompletedData) => unknown;
    listItemUncompleted?: (data: ListItemUncompletedData) => unknown;
};
