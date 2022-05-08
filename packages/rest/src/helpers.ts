/* eslint-disable */

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

        /** Create a channel. */
        createChannel: async (channel: CreateChannel) => {
            return await op
                .fetch<{ channel: ServerChannel }>("POST", op.routes.createChannel(), channel)
                .then((res) => res.channel);
        },

        /** Get a channel. */
        getChannel: async (channelId: string) => {
            return await op
                .fetch<{ channel: ServerChannel }>("GET", op.routes.getChannel(channelId))
                .then((res) => res.channel);
        },

        /** Delete a channel. */
        deleteChannel: async (channelId: string) => {
            return await op.fetch("DELETE", op.routes.deleteChannel(channelId));
        },

        /** Send a message to the specified channel. */
        createMessage: async (channelId: string, options: CreateMessage) => {
            return await op
                .fetch<{ message: ChatMessage }>("POST", op.routes.createChannelMessage(channelId), options)
                .then((res) => res.message);
        },
        /** Get multiple messages at once from this channel. */
        getMessages: async (channelId: string, options?: GetMessages) => {
            return await op
                .fetch<{ messages: ChatMessage[] }>("GET", op.routes.getChannelMessages(channelId, options))
                .then((res) => res.messages);
        },
        /** Get this specific message from this channel. */
        getMessage: async (channelId: string, messageId: string) => {
            return await op
                .fetch<{ message: ChatMessage }>("GET", op.routes.getChannelMessage(channelId, messageId))
                .then((res) => res.message);
        },
        /**
         * Update this message in this channel.
         *
         * NOTE: Only messages send by the same user can be edited.
         */
        updateMessage: async (channelId: string, messageId: string, options: UpdateMessage) => {
            return await op
                .fetch<{ message: ChatMessage }>("PUT", op.routes.updateChannelMessage(channelId, messageId), options)
                .then((res) => res.message);
        },
        /** Delete this message from this channel. */
        deleteMessage: async (channelId: string, messageId: string) => {
            return await op.fetch<undefined>("DELETE", op.routes.deleteChannelMessage(channelId, messageId));
        },

        /**
         * ----------
         * MEMBERS
         * ----------
         */

        /** Change the nickname of this member on this server. */
        changeNickname: async (serverId: string, userId: string, nickname: string) => {
            return await op
                .fetch<UpdateNickname>("PUT", op.routes.changeMemberNickname(serverId, userId), { nickname })
                .then((res) => res.nickname);
        },
        /** Remove the nickname of this member on this server. */
        removeNickname: async (serverId: string, userId: string) => {
            return await op.fetch<undefined>("DELETE", op.routes.removeMemberNickname(serverId, userId));
        },
        /** Get the member data for this user from this server. */
        getMember: async (serverId: string, userId: string) => {
            return await op
                .fetch<{ member: ServerMember }>("GET", op.routes.getMember(serverId, userId))
                .then((res) => res.member);
        },
        /** Kick a member from this server. */
        kickMember: async (serverId: string, userId: string) => {
            return await op.fetch<undefined>("DELETE", op.routes.kickMember(serverId, userId));
        },
        /** Get all members from a server. */
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
        /** Ban a member from a server. */
        createBan: async (serverId: string, userId: string, options?: CreateBan) => {
            return await op
                .fetch<{ serverMemberBan: Ban }>("POST", op.routes.createBan(serverId, userId), options)
                .then((res) => res.serverMemberBan);
        },
        /** Get the ban data of a member from a server. */
        getBan: async (serverId: string, userId: string) => {
            return await op
                .fetch<{ serverMemberBan: Ban }>("GET", op.routes.getBan(serverId, userId))
                .then((res) => res.serverMemberBan);
        },
        /** Revoke ban from a member in a server. */
        removeBan: async (serverId: string, userId: string) => {
            return await op.fetch<undefined>("DELETE", op.routes.removeBan(serverId, userId));
        },
        /** Get all the bans of a server. */
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

        /** Create a new thread in this forum channel. */
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

        /** Create a new item in this list channel. */
        createListItem: async (channelId: string, options: CreateListItem) => {
            return await op
                .fetch<{ listItem: ListItem }>("POST", op.routes.createListItem(channelId), options)
                .then((res) => res.listItem);
        },
        /** Get all items from this list channel. */
        getListItems: async (channelId: string) => {
            return await op
                .fetch<{ listItems: ListItemSummary[] }>("GET", op.routes.getListItems(channelId))
                .then((res) => res.listItems);
        },
        /** Get this specific item from this list. */
        getListItem: async (channelId: string, listItemId: string) => {
            return await op
                .fetch<{ listItem: ListItem }>("GET", op.routes.getListItem(channelId, listItemId))
                .then((res) => res.listItem);
        },
        /** Update this item from this list. */
        updateListItem: async (channelId: string, listItemId: string, options: UpdateListItem) => {
            return await op
                .fetch<{ listItem: ListItem }>("GET", op.routes.updateListItem(channelId, listItemId), options)
                .then((res) => res.listItem);
        },
        /** Remove this item from this list. */
        removeListItem: async (channelId: string, listItemId: string) => {
            return await op.fetch<undefined>("DELETE", op.routes.removeListItem(channelId, listItemId));
        },

        /**
         * ----------
         * DOC
         * ----------
         */

        /** Create a new doc in this channel. */
        createDoc: async (channelId: string, options: CreateDoc) => {
            return await op.fetch<{ doc: Doc }>("POST", op.routes.createDoc(channelId), options).then((res) => res.doc);
        },
        /** Get some docs from this channel. */
        getDocs: async (channelId: string, options?: GetDocs) => {
            return await op
                .fetch<{ docs: Doc[] }>("GET", op.routes.getDocs(channelId, options))
                .then((res) => res.docs);
        },
        /** Get this doc from this channel. */
        getDoc: async (channelId: string, docId: number) => {
            return await op.fetch<{ doc: Doc }>("GET", op.routes.getDoc(channelId, docId)).then((res) => res.doc);
        },
        /** Update this doc from this channel. */
        updateDoc: async (channelId: string, docId: number, options: UpdateDoc) => {
            return await op
                .fetch<{ doc: Doc }>("PUT", op.routes.updateDoc(channelId, docId), options)
                .then((res) => res.doc);
        },
        /** Remove this doc from this channel. */
        removeDoc: async (channelId: string, docId: number) => {
            return await op.fetch<undefined>("DELETE", op.routes.removeDoc(channelId, docId));
        },

        /**
         * ----------
         * REACTIONS
         * ----------
         */

        /** Add an emote to this content. */
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
         */
        awardXpToMember: async (serverId: string, userId: string, options: AwardXp): Promise<number> => {
            return await op
                .fetch<{ total: number }>("POST", op.routes.awardXpToMember(serverId, userId), options)
                .then((res) => res.total);
        },
        /** Award XP to all members of this role. */
        awardXpToRole: async (serverId: string, roleId: number, options: AwardXp) => {
            return await op.fetch<undefined>("POST", op.routes.awardXpToRole(serverId, roleId));
        },

        /**
         * ----------
         * SOCIALS
         * ----------
         */

        /** Get the public social link of this member related to this type. */
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

        /** Grant a member access to a group. */
        addMemberToGroup: async (groupId: string, userId: string) => {
            return await op.fetch<undefined>("PUT", op.routes.addMemberToGroup(groupId, userId));
        },
        /** Revoke a member's access from a group. */
        removeMemberFromGroup: async (groupId: string, userId: string) => {
            return await op.fetch<undefined>("DELETE", op.routes.removeMemberFromGroup(groupId, userId));
        },
        /** Assign a role to a member. */
        addRoleToMember: async (serverId: string, userId: string, roleId: number) => {
            return await op.fetch<undefined>("PUT", op.routes.addRoleToMember(serverId, userId, roleId));
        },
        /** Remove a role from a member. */
        removeRoleFromMember: async (serverId: string, userId: string, roleId: number) => {
            return await op.fetch<undefined>("DELETE", op.routes.removeRoleFromMember(serverId, userId, roleId));
        },
        /**
         * Get the roles which are currently assigned to this member.
         *
         * @returns {number[]} Ids of the roles which are currently assigned to this member.
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

        /** Create a new webhook in this server for this channel. */
        createWebhook: async (serverId: string, options: CreateWebhook) => {
            return op
                .fetch<{ webhook: Webhook }>("POST", op.routes.createWebhook(serverId), options)
                .then((res) => res.webhook);
        },
        /** Get all webhooks which are currently posting to this channel. */
        getWebhooks: async (serverId: string, channelId: string) => {
            return await op
                .fetch<{ webhooks: Webhook[] }>("GET", op.routes.getWebhooks(serverId, channelId))
                .then((res) => res.webhooks);
        },
        /** Get this specific webhook from this server. */
        getWebhook: async (serverId: string, webhookId: string) => {
            return await op
                .fetch<{ webhook: Webhook }>("GET", op.routes.getWebhook(serverId, webhookId))
                .then((res) => res.webhook);
        },
        /** Update this webhook from this server. */
        updateWebhook: async (serverId: string, webhookId: string, options: UpdateWebhook) => {
            return op
                .fetch<{ webhook: Webhook }>("PUT", op.routes.updateWebhook(serverId, webhookId), options)
                .then((res) => res.webhook);
        },
        /** Delete this webhook from this server. */
        deleteWebhook: async (serverId: string, webhookId: string) => {
            return op.fetch<undefined>("DELETE", op.routes.addMemberToGroup(serverId, webhookId));
        },
    };
}

export type Helpers = ReturnType<typeof createHelpers>;

export type CreateHelpersOptions = {
    fetch<T>(method: HttpMethod, route: string, body?: object): Promise<T>;
    routes: Routes;
};
