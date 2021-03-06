import {
    ChatMessage,
    CreateMessage,
    GetMessages,
    ServerMember,
    UpdateMessage,
    UpdateNickname,
    ServerMemberSummary,
    CreateBan,
    Ban,
    CreateForumThread,
    ForumThread,
    CreateListItem,
    ListItem,
    ListItemSummary,
    UpdateListItem,
    CreateDoc,
    Doc,
    GetDocs,
    UpdateDoc,
    AwardXp,
    SocialLinkType,
    SocialLink,
    CreateWebhook,
    Webhook,
    UpdateWebhook,
    CreateChannel,
    ServerChannel,
    UpdateChannel,
} from "@guildeno/types";
import { Routes } from "./routes";
import { HttpMethod } from "./types";

export function createHelpers(op: CreateHelpersOptions) {
    return {
        /**
         * ----------
         * CHANNELS
         * ----------
         */

        /**
         * Create a channel.
         *
         * @permissions `Manage channels`
         * @eventName `TeamChannelCreated`
         */
        createChannel: async (channel: CreateChannel) => {
            return await op
                .fetch<{ channel: ServerChannel }>("POST", op.routes.createChannel(), channel)
                .then((res) => res.channel);
        },

        /**
         * Get a channel.
         *
         * @permissions `Manage channels`
         */
        getChannel: async (channelId: string) => {
            return await op
                .fetch<{ channel: ServerChannel }>("GET", op.routes.getChannel(channelId))
                .then((res) => res.channel);
        },

        /**
         * Update a channel.
         *
         * @permissions `Manage channels`
         * @eventName `TeamChannelUpdated`
         */
        updateChannel: async (channelId: string, options: UpdateChannel) => {
            return await op
                .fetch<{ channel: ServerChannel }>("PATCH", op.routes.updateChannel(channelId), options)
                .then((res) => res.channel);
        },

        /**
         * Delete a channel.
         *
         * @permissions `Manage channels`
         * @eventName `TeamChannelDeleted`
         */
        deleteChannel: async (channelId: string) => {
            return await op.fetch("DELETE", op.routes.deleteChannel(channelId));
        },

        /**
         * Send a message to the specified channel.
         *
         * @permissions `Read messages`, `Send messages`
         * - `Send private messages` when `isPrivate` is set to `true`
         * - `Upload media` when the message contains media
         * - `Can mention @everyone and @here` when the message mentions \@everyone or \@here
         * @eventName `ChatMessageCreated`
         */
        createMessage: async (channelId: string, options: CreateMessage) => {
            return await op
                .fetch<{ message: ChatMessage }>("POST", op.routes.createChannelMessage(channelId), options)
                .then((res) => res.message);
        },

        /**
         * Get multiple messages at once from this channel.
         *
         * @permissions `Read messages`
         * - `Access moderator view` when `includePrivate` is set to true
         */
        getMessages: async (channelId: string, options?: GetMessages) => {
            return await op
                .fetch<{ messages: ChatMessage[] }>("GET", op.routes.getChannelMessages(channelId, options))
                .then((res) => res.messages);
        },

        /**
         * Get this specific message from this channel.
         *
         * @permissions `Read messages`
         * - `Access moderator view` when `includePrivate` is set to true
         */
        getMessage: async (channelId: string, messageId: string) => {
            return await op
                .fetch<{ message: ChatMessage }>("GET", op.routes.getChannelMessage(channelId, messageId))
                .then((res) => res.message);
        },

        /**
         * Update this message in this channel.
         *
         * @permissions `Read messages`, `Send messages`
         * - `Send private messages` when the message is private and you did not create this message
         * - `Upload media` when the message contains media
         * - `Can mention @everyone and @here` when the message mentions \@everyone or \@here
         * @eventName `ChatMessageUpdated`
         */
        updateMessage: async (channelId: string, messageId: string, options: UpdateMessage) => {
            return await op
                .fetch<{ message: ChatMessage }>("PUT", op.routes.updateChannelMessage(channelId, messageId), options)
                .then((res) => res.message);
        },

        /**
         * Delete this message from this channel.
         *
         * @permissions `Manage messages` if deleting a message which has not been created by you
         * @eventName `ChatMessageDeleted`
         */
        deleteMessage: async (channelId: string, messageId: string) => {
            return await op.fetch<undefined>("DELETE", op.routes.deleteChannelMessage(channelId, messageId));
        },

        /**
         * ----------
         * MEMBERS
         * ----------
         */

        /**
         * Change the nickname of this member on this server.
         *
         * - `Change Nickname` if changing own nickname, unless the bot also has `Manage Nicknames`
         * - `Manage Nicknames` if changing the own nickname or the one of a different user. Note: You cannot change the nickname of a member with a higher role than you.
         * @eventName `TeamMemberUpdated`
         */
        changeNickname: async (serverId: string, userId: string, nickname: string) => {
            return await op
                .fetch<UpdateNickname>("PUT", op.routes.changeMemberNickname(serverId, userId), { nickname })
                .then((res) => res.nickname);
        },

        /**
         * Remove the nickname of this member on this server.
         *
         * - `Change Nickname` if changing own nickname, unless the bot also has `Manage Nicknames`
         * - `Manage Nicknames` if changing the own nickname or the one of a different user. Note: You cannot change the nickname of a member with a higher role than you.
         * @eventName `TeamMemberUpdated`
         */
        removeNickname: async (serverId: string, userId: string) => {
            return await op.fetch<undefined>("DELETE", op.routes.removeMemberNickname(serverId, userId));
        },

        /**
         * Get the member data for this user from this server.
         */
        getMember: async (serverId: string, userId: string) => {
            return await op
                .fetch<{ member: ServerMember }>("GET", op.routes.getMember(serverId, userId))
                .then((res) => res.member);
        },

        /**
         * Kick a member from this server.
         *
         * @permissions `Kick / Ban members` when you do not kick yourself
         * @eventName `TeamMemberRemoved`
         */
        kickMember: async (serverId: string, userId: string) => {
            return await op.fetch<undefined>("DELETE", op.routes.kickMember(serverId, userId));
        },

        /**
         * Get all members from a server.
         */
        getMembers: async (serverId: string) => {
            return await op
                .fetch<{ members: ServerMemberSummary[] }>("GET", op.routes.getMembers(serverId))
                .then((res) => res.members);
        },

        /**
         * ----------
         * BANS
         * ----------
         */

        /**
         * Ban a member from a server.
         *
         * @permissions `Kick / Ban members`
         * @eventName `TeamMemberBanned`
         */
        createBan: async (serverId: string, userId: string, options?: CreateBan) => {
            return await op
                .fetch<{ serverMemberBan: Ban }>("POST", op.routes.createBan(serverId, userId), options)
                .then((res) => res.serverMemberBan);
        },

        /**
         * Get the ban data of a member from a server.
         *
         * @permissions `Kick / Ban members`
         */
        getBan: async (serverId: string, userId: string) => {
            return await op
                .fetch<{ serverMemberBan: Ban }>("GET", op.routes.getBan(serverId, userId))
                .then((res) => res.serverMemberBan);
        },

        /**
         * Revoke ban from a member in a server.
         *
         * @permissions `Kick / Ban members`
         * @eventName `TeamMemberUnbanned`
         */
        removeBan: async (serverId: string, userId: string) => {
            return await op.fetch<undefined>("DELETE", op.routes.removeBan(serverId, userId));
        },

        /**
         * Get all the bans of a server.
         *
         * @permissions `Kick / Ban members`
         */
        getBans: async (serverId: string) => {
            return await op
                .fetch<{ serverMemberBans: Ban }>("GET", op.routes.getBans(serverId))
                .then((res) => res.serverMemberBans);
        },

        /**
         * ----------
         * FORUMS
         * ----------
         */

        /**
         * Create a new thread in this forum channel.
         *
         * @permissions `Read forums`, `Create forum topics`
         */
        createForumThread: async (channelId: string, options: CreateForumThread) => {
            return await op
                .fetch<{ forumThread: ForumThread }>("POST", op.routes.createForumThread(channelId), options)
                .then((res) => res.forumThread);
        },

        /**
         * ----------
         * LISTS
         * ----------
         */

        /**
         * Create a new item in this list channel.
         *
         * @permissions `View list items`, `Create list items`
         * @eventName `ListItemCreated`
         */
        createListItem: async (channelId: string, options: CreateListItem) => {
            return await op
                .fetch<{ listItem: ListItem }>("POST", op.routes.createListItem(channelId), options)
                .then((res) => res.listItem);
        },

        /**
         * Get all items from this list channel.
         *
         * @permissions `View list items`
         */
        getListItems: async (channelId: string) => {
            return await op
                .fetch<{ listItems: ListItemSummary[] }>("GET", op.routes.getListItems(channelId))
                .then((res) => res.listItems);
        },

        /**
         * Get this specific item from this list.
         *
         * @permissions `View list items`
         */
        getListItem: async (channelId: string, listItemId: string) => {
            return await op
                .fetch<{ listItem: ListItem }>("GET", op.routes.getListItem(channelId, listItemId))
                .then((res) => res.listItem);
        },

        /**
         * Update this item from this list.
         *
         * @permissions `View list items`
         * - `Manage list item messages` when the item was not created by you
         * @eventName `ListItemUpdated`
         */
        updateListItem: async (channelId: string, listItemId: string, options: UpdateListItem) => {
            return await op
                .fetch<{ listItem: ListItem }>("GET", op.routes.updateListItem(channelId, listItemId), options)
                .then((res) => res.listItem);
        },

        /**
         * Remove this item from this list.
         *
         * @permissions `View list items`
         * - `Manage list item messages` when the item was not created by you
         * @eventName `ListItemDeleted`
         */
        removeListItem: async (channelId: string, listItemId: string) => {
            return await op.fetch<undefined>("DELETE", op.routes.removeListItem(channelId, listItemId));
        },

        /**
         * Complete an item from this list.
         *
         * @method POST
         * @permissions `View list items`, `Complete list items`
         * @eventName `ListItemCompleted`
         */
        completeListItem: async (channelId: string, listItemId: string) => {
            return await op.fetch<undefined>("POST", op.routes.completeListItem(channelId, listItemId));
        },

        /**
         * Uncomplete an item from this list.
         *
         * @method DELETE
         * @permissions `View list items`, `Complete list items`
         * @eventName `ListItemUncompleted`
         */
        uncompleteListItem: async (channelId: string, listItemId: string) => {
            return await op.fetch<undefined>("DELETE", op.routes.uncompleteListItem(channelId, listItemId));
        },

        /**
         * ----------
         * DOC
         * ----------
         */

        /**
         * Create a new doc in this channel.
         *
         * @permissions `View docs`, `Create docs`
         * @eventName `DocCreated`
         */
        createDoc: async (channelId: string, options: CreateDoc) => {
            return await op.fetch<{ doc: Doc }>("POST", op.routes.createDoc(channelId), options).then((res) => res.doc);
        },

        /**
         * Get some docs from this channel.
         *
         * @permissions `View docs`
         */
        getDocs: async (channelId: string, options?: GetDocs) => {
            return await op
                .fetch<{ docs: Doc[] }>("GET", op.routes.getDocs(channelId, options))
                .then((res) => res.docs);
        },

        /**
         * Get this doc from this channel.
         *
         * @permissions `View docs`
         */
        getDoc: async (channelId: string, docId: number) => {
            return await op.fetch<{ doc: Doc }>("GET", op.routes.getDoc(channelId, docId)).then((res) => res.doc);
        },

        /**
         * Update this doc from this channel.
         *
         * @permissions `View docs`
         * - `Manage docs` when you did not create this doc
         * @eventName `DocUpdated`
         */
        updateDoc: async (channelId: string, docId: number, options: UpdateDoc) => {
            return await op
                .fetch<{ doc: Doc }>("PUT", op.routes.updateDoc(channelId, docId), options)
                .then((res) => res.doc);
        },

        /**
         * Remove this doc from this channel.
         *
         * @permissions `View docs`
         * - `Remove docs` when you did not create this doc
         * @eventName `DocDeleted`
         */
        removeDoc: async (channelId: string, docId: number) => {
            return await op.fetch<undefined>("DELETE", op.routes.removeDoc(channelId, docId));
        },

        /**
         * ----------
         * REACTIONS
         * ----------
         */

        /**
         * Add an emote to this content.
         */
        addReaction: async (channelId: string, contentId: string, emoteId: number) => {
            return await op.fetch<undefined>("PUT", op.routes.addReaction(channelId, contentId, emoteId));
        },

        /**
         * ----------
         * SERVER XP
         * ----------
         */

        /**
         * Award XP to this member.
         *
         * @returns {number} Amount of XP this user has after this operation.
         *
         */
        awardXpToMember: async (serverId: string, userId: string, options: AwardXp): Promise<number> => {
            return await op
                .fetch<{ total: number }>("POST", op.routes.awardXpToMember(serverId, userId), options)
                .then((res) => res.total);
        },

        /**
         * Award XP to all members of this role.
         */
        awardXpToRole: async (serverId: string, roleId: number, options: AwardXp) => {
            return await op.fetch<undefined>("POST", op.routes.awardXpToRole(serverId, roleId), options);
        },

        /**
         * ----------
         * SOCIALS
         * ----------
         */

        /**
         * Get the public social link of this member related to this type.
         */
        getSocialLinks: async (serverId: string, userId: string, type: SocialLinkType) => {
            return await op
                .fetch<{ socialLink: SocialLink }>("GET", op.routes.getSocialLinks(serverId, userId, type))
                .then((res) => res.socialLink);
        },

        /**
         * ----------
         * MEMBERSHIPS
         * ----------
         */

        /**
         * Grant a member access to a group.
         *
         * @permissions `Manage groups`
         */
        addMemberToGroup: async (groupId: string, userId: string) => {
            return await op.fetch<undefined>("PUT", op.routes.addMemberToGroup(groupId, userId));
        },

        /**
         * Revoke a member's access from a group.
         *
         * @permissions `Manage groups`
         */
        removeMemberFromGroup: async (groupId: string, userId: string) => {
            return await op.fetch<undefined>("DELETE", op.routes.removeMemberFromGroup(groupId, userId));
        },

        /**
         * Assign a role to a member.
         *
         * @permissions `Manage roles` when the role is not self-assignable or you do not add it to yourself
         * @eventName `teamRolesUpdated`
         */
        addRoleToMember: async (serverId: string, userId: string, roleId: number) => {
            return await op.fetch<undefined>("PUT", op.routes.addRoleToMember(serverId, userId, roleId));
        },

        /**
         * Remove a role from a member.
         *
         * @permissions `Manage roles` when the role is not self-assignable or you do not remove it from yourself
         * @eventName `teamRolesUpdated`
         */
        removeRoleFromMember: async (serverId: string, userId: string, roleId: number) => {
            return await op.fetch<undefined>("DELETE", op.routes.removeRoleFromMember(serverId, userId, roleId));
        },

        /**
         * Get the roles which are currently assigned to this member.
         *
         * @returns {number[]} Ids of the roles which are currently assigned to this member.
         *
         */
        getMemberRoles: async (serverId: string, userId: string): Promise<number[]> => {
            return await op
                .fetch<{ roleIds: number[] }>("GET", op.routes.getMemberRoles(serverId, userId))
                .then((res) => res.roleIds);
        },

        /**
         * ----------
         * WEBHOOKS
         * ----------
         */

        /**
         * Create a new webhook in this server for this channel.
         *
         * @permissions `Manage webhooks`
         * @eventName `TeamWebhookCreated`
         */
        createWebhook: async (serverId: string, options: CreateWebhook) => {
            return await op
                .fetch<{ webhook: Webhook }>("POST", op.routes.createWebhook(serverId), options)
                .then((res) => res.webhook);
        },

        /**
         * Get all webhooks which are currently posting to this channel.
         *
         * @permissions `Manage webhooks`
         */
        getWebhooks: async (serverId: string, channelId: string) => {
            return await op
                .fetch<{ webhooks: Webhook[] }>("GET", op.routes.getWebhooks(serverId, channelId))
                .then((res) => res.webhooks);
        },

        /**
         * Get this specific webhook from this server.
         *
         * @permissions `Manage webhooks`
         */
        getWebhook: async (serverId: string, webhookId: string) => {
            return await op
                .fetch<{ webhook: Webhook }>("GET", op.routes.getWebhook(serverId, webhookId))
                .then((res) => res.webhook);
        },

        /**
         * Update this webhook from this server.
         *
         * @permissions `Manage webhooks`
         * @eventName `TeamWebhookUpdated`
         */
        updateWebhook: async (serverId: string, webhookId: string, options: UpdateWebhook) => {
            return await op
                .fetch<{ webhook: Webhook }>("PUT", op.routes.updateWebhook(serverId, webhookId), options)
                .then((res) => res.webhook);
        },

        /**
         * Delete this webhook from this server.
         *
         * @permissions `Manage webhooks`
         * @eventName `TeamWebhookUpdated`
         */
        deleteWebhook: async (serverId: string, webhookId: string) => {
            return await op.fetch<undefined>("DELETE", op.routes.addMemberToGroup(serverId, webhookId));
        },

        // TODO: move this to a route if guilded adds one
        /**
         * Send a message through a webhook.
         *
         */
        sendWebhook: async (
            webhookId: string,
            webhookToken: string,
            options: Pick<CreateMessage, "content" | "embeds">,
        ) => {
            return await op.fetch("POST", `https://media.guilded.gg/webhooks/${webhookId}/${webhookToken}`, options, {
                noAuthorization: true,
            });
        },
    };
}

export type Helpers = ReturnType<typeof createHelpers>;

export type CreateHelpersOptions = {
    fetch<T>(
        method: HttpMethod,
        route: string,
        body?: object,
        options?: { noAuthorization?: boolean; tryCounts?: number },
    ): Promise<T>;
    routes: Routes;
};
