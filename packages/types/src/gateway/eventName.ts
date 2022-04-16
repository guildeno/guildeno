/** Names of events which Guilded sends us sometimes with a gateway payload. */
export type EventName =
    | "ChatMessageCreated"
    | "ChatMessageUpdated"
    | "ChatMessageDeleted"
    | "TeamMemberJoined"
    | "TeamMemberRemoved"
    | "TeamMemberBanned"
    | "TeamMemberUnbanned"
    | "TeamMemberUpdated"
    | "teamRolesUpdated"
    | "TeamWebhookCreated"
    | "TeamWebhookUpdated";
