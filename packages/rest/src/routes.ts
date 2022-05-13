import { GetMessages, GetDocs, SocialLinkType } from "@guildeno/types";

/**
 * URL route construction functions.
 *
 * The purpose of those constructors is to make it generally easier to make requests to Guilded.
 *
 * NOTE: Normally you do not need to use this.
 * All available handlers are available under `rest.handlers`.
 * AKA a lib internal object.
 */
export const routes = {
    /**
     * ----------
     * CHANNELS
     * ----------
     */

    /**
     * Create a channel.
     *
     * @method POST
     * @permissions `Manage channels`
     * @eventName `TeamChannelCreated`
     */
    createChannel: () => {
        return "/channels";
    },

    /**
     * Get a channel.
     *
     * @method GET
     * @permissions `Manage channels`
     */
    getChannel: (channelId: string) => {
        return `/channels/${channelId}`;
    },

    /**
     * Update a channel.
     *
     * @method PATCH
     * @permissions `Manage channels`
     * @eventName `TeamChannelUpdated`
     */
    updateChannel: (channelId: string) => {
        return `/channels/${channelId}`;
    },

    /**
     * Delete a channel.
     *
     * @method DELETE
     * @permissions `Manage channels`
     * @eventName `TeamChannelDeleted`
     */
    deleteChannel: (channelId: string) => {
        return `/channels/${channelId}`;
    },

    /**
     * Create a channel message.
     *
     * @method POST
     * @permissions `Read messages`, `Send messages`
     * - `Send private messages` when `isPrivate` is set to `true`
     * - `Upload media` when the message contains media
     * - `Can mention @everyone and @here` when the message mentions \@everyone or \@here
     * @eventName `ChatMessageCreated`
     */
    createChannelMessage: (channelId: string) => {
        return `/channels/${channelId}/messages`;
    },

    /**
     * Get messages from a channel.
     *
     * @method GET
     * @permissions `Read messages`
     * - `Access moderator view` when `includePrivate` is set to true
     */
    getChannelMessages: (channelId: string, options?: GetMessages) => {
        let base = `/channels/${channelId}/messages?`;

        if (options?.before) {
            base += `before=${options?.before}`;
        }

        if (options?.after) {
            base += `&after=${options?.after}`;
        }

        if (options?.limit) {
            base += `&limit=${options?.limit}`;
        }

        if (options?.includePrivate !== undefined) {
            base += `&includePrivate=${options?.includePrivate}`;
        }

        return base;
    },

    /**
     * Get a message from a channel.
     *
     * @method GET
     * @permissions `Read messages`
     * - `Access moderator view` when `includePrivate` is set to true
     */
    getChannelMessage: (channelId: string, messageId: string) => {
        return `/channels/${channelId}/messages/${messageId}`;
    },

    /**
     * Update a message in a channel.
     *
     * @method PUT
     * @permissions `Read messages`, `Send messages`
     * - `Send private messages` when the message is private and you did not create this message
     * - `Upload media` when the message contains media
     * - `Can mention @everyone and @here` when the message mentions \@everyone or \@here
     * @eventName `ChatMessageUpdated`
     */
    updateChannelMessage: (channelId: string, messageId: string) => {
        return `/channels/${channelId}/messages/${messageId}`;
    },

    /**
     * Delete a message from a channel.
     *
     * @method DELETE
     * @permissions `Manage messages` if deleting a message which has not been created by you
     * @eventName `ChatMessageDeleted`
     */
    deleteChannelMessage: (channelId: string, messageId: string) => {
        return `/channels/${channelId}/messages/${messageId}`;
    },

    /**
     * ----------
     * MEMBERS
     * ----------
     */

    /**
     * Change a member's nickname.
     *
     * @method PUT
     * @permissions
     * - `Change Nickname` if changing own nickname, unless the bot also has `Manage Nicknames`
     * - `Manage Nicknames` if changing the own nickname or the one of a different user. Note: You cannot change the nickname of a member with a higher role than you.
     * @eventName `TeamMemberUpdated`
     */
    changeMemberNickname: (serverId: string, userId: string) => {
        return `/servers/${serverId}/members/${userId}/nickname`;
    },

    /**
     * Remove a member's nickname.
     *
     * @method DELETE
     * @permissions
     * - `Change Nickname` if changing own nickname, unless the bot also has `Manage Nicknames`
     * - `Manage Nicknames` if changing the own nickname or the one of a different user. Note: You cannot change the nickname of a member with a higher role than you.
     * @eventName `TeamMemberUpdated`
     */
    removeMemberNickname: (serverId: string, userId: string) => {
        return `/servers/${serverId}/members/${userId}/nickname`;
    },

    /**
     * Get a member from a server.
     *
     * @method GET
     */
    getMember: (serverId: string, userId: string) => {
        return `/servers/${serverId}/members/${userId}`;
    },

    /**
     * Kick a member from a server.
     *
     * @method DELETE
     * @permissions `Kick / Ban members` when you do not kick yourself
     * @eventName `TeamMemberRemoved`
     */
    kickMember: (serverId: string, userId: string) => {
        return `/servers/${serverId}/members/${userId}`;
    },

    /**
     * Get all members from a server.
     *
     * @method GET
     */
    getMembers: (serverId: string) => {
        return `/servers/${serverId}/members`;
    },

    /**
     * ----------
     * BANS
     * ----------
     */

    /**
     * Ban a member from a server.
     *
     * @method POST
     * @permissions `Kick / Ban members`
     * @eventName `TeamMemberBanned`
     */
    createBan: (serverId: string, userId: string) => {
        return `/servers/${serverId}/bans/${userId}`;
    },

    /**
     * Get a ban from a server.
     *
     * @method GET
     * @permissions `Kick / Ban members`
     */
    getBan: (serverId: string, userId: string) => {
        return `/servers/${serverId}/bans/${userId}`;
    },

    /**
     * Revoke a server ban.
     *
     * @method DELETE
     * @permissions `Kick / Ban members`
     * @eventName `TeamMemberUnbanned`
     */
    removeBan: (serverId: string, userId: string) => {
        return `/servers/${serverId}/bans/${userId}`;
    },

    /**
     * Get all the bans of a server.
     *
     * @method GET
     * @permissions `Kick / Ban members`
     */
    getBans: (serverId: string) => {
        return `/servers/${serverId}/bans`;
    },

    /**
     * ----------
     * FORUMS
     * ----------
     */

    /**
     * Create a thread in a forum channel.
     *
     * @method POST
     * @permissions `Read forums`, `Create forum topics`
     */
    createForumThread: (channelId: string) => {
        return `/channels/${channelId}/forum`;
    },

    /**
     * ----------
     * LISTS
     * ----------
     */

    /**
     * Create a new list item.
     *
     * @method POST
     * @permissions `View list items`, `Create list items`
     * @eventName `ListItemCreated`
     */
    createListItem: (channelId: string) => {
        return `/channels/${channelId}/items`;
    },

    /**
     * Get all items from a list.
     *
     * @method GET
     * @permissions `View list items`
     */
    getListItems: (channelId: string) => {
        return `/channels/${channelId}/items`;
    },

    /**
     * Get an item from a list.
     *
     * @method GET
     * @permissions `View list items`
     */
    getListItem: (channelId: string, listItemId: string) => {
        return `/channels/${channelId}/items${listItemId}`;
    },

    /**
     * Update an item of a list.
     *
     * @method PUT
     * @permissions `View list items`
     * - `Manage list item messages` when the item was not created by you
     * @eventName `ListItemUpdated`
     */
    updateListItem: (channelId: string, listItemId: string) => {
        return `/channels/${channelId}/items/${listItemId}`;
    },

    /**
     * Remove an item from a list.
     *
     * @method DELETE
     * @permissions `View list items`
     * - `Manage list item messages` when the item was not created by you
     * @eventName `ListItemDeleted`
     */
    removeListItem: (channelId: string, listItemId: string) => {
        return `/channels/${channelId}/items/${listItemId}`;
    },

    /**
     * Complete an item from a list.
     *
     * @method POST
     * @permissions `View list items`, `Complete list items`
     * @eventName `ListItemCompleted`
     */
    completeListItem: (channelId: string, listItemId: string) => {
        return `/channels/${channelId}/items/${listItemId}/complete`;
    },

    /**
     * Uncomplete an item from a list.
     *
     * @method DELETE
     * @permissions `View list items`, `Complete list items`
     * @eventName `ListItemUncompleted`
     */
    uncompleteListItem: (channelId: string, listItemId: string) => {
        return `/channels/${channelId}/items/${listItemId}/complete`;
    },

    /**
     * ----------
     * DOC
     * ----------
     */

    /**
     * Create a new doc in a channel.
     *
     * @method POST
     * @permissions `View docs`, `Create docs`
     * @eventName `DocCreated`
     */
    createDoc: (channelId: string) => {
        return `/channels/${channelId}/docs`;
    },

    /**
     * Get the docs from a channel.
     *
     * @method GET
     * @permissions `View docs`
     */
    getDocs: (channelId: string, options?: GetDocs) => {
        let base = `/channels${channelId}/docs?`;

        if (options?.before) {
            base += `before=${options?.before}`;
        }

        if (options?.limit) {
            base += `&limit=${options?.limit}`;
        }

        return base;
    },

    /**
     * Get a doc from a channel.
     *
     * @method GET
     * @permissions `View docs`
     */
    getDoc: (channelId: string, docId: number) => {
        return `/channels/${channelId}/docs/${docId}`;
    },

    /**
     * Update a doc of a channel.
     *
     * @method PUT
     * @permissions `View docs`
     * - `Manage docs` when you did not create this doc
     * @eventName `DocUpdated`
     */
    updateDoc: (channelId: string, docId: number) => {
        return `/channels/${channelId}/docs/${docId}`;
    },

    /**
     * Remove a doc from a channel.
     *
     * @method DELETE
     * @permissions `View docs`
     * - `Remove docs` when you did not create this doc
     * @eventName `DocDeleted`
     */
    removeDoc: (channelId: string, docId: number) => {
        return `/channels/${channelId}/docs/${docId}`;
    },

    /**
     * ----------
     * REACTIONS
     * ----------
     */

    /**
     * Add an emote to a channels content.
     *
     * @method PUT
     */
    addReaction: (channelId: string, contentId: string, emoteId: number) => {
        return `/channels/${channelId}/content/${contentId}/emotes/${emoteId}`;
    },

    /**
     * ----------
     * SERVER XP
     * ----------
     */

    /**
     * Award XP to a member.
     *
     * @method POST
     */
    awardXpToMember: (serverId: string, userId: string) => {
        return `/servers/${serverId}/members/${userId}/xp`;
    },

    /**
     * Award XP to all members of a role.
     *
     * @method POST
     */
    awardXpToRole: (serverId: string, roleId: number) => {
        return `/servers/${serverId}/roles/${roleId}/xp`;
    },

    /**
     * ----------
     * SOCIALS
     * ----------
     */

    /**
     * Get the public social links of a member.
     *
     * @method GET
     */
    getSocialLinks: (serverId: string, userId: string, type: SocialLinkType) => {
        return `/servers/${serverId}/members/${userId}/social-links/${type}`;
    },

    /**
     * ----------
     * MEMBERSHIPS
     * ----------
     */

    /**
     * Grant a member access to a group.
     *
     * @method PUT
     * @permissions `Manage groups`
     */
    addMemberToGroup: (groupId: string, userId: string) => {
        return `/groups/${groupId}/members/${userId}`;
    },

    /**
     * Revoke a member's access from a group.
     *
     * @method DELETE
     * @permissions `Manage groups`
     */
    removeMemberFromGroup: (groupId: string, userId: string) => {
        return `/groups/${groupId}/members/${userId}`;
    },

    /**
     * Assign a role to a member.
     *
     * @method PUT
     * @permissions `Manage roles` when the role is not self-assignable or you do not add it to yourself
     * @eventName `teamRolesUpdated`
     */
    addRoleToMember: (serverId: string, userId: string, roleId: number) => {
        return `/servers/${serverId}/members/${userId}/roles/${roleId}`;
    },

    /**
     * Remove a role from a member.
     *
     * @method DELETE
     * @permissions `Manage roles` when the role is not self-assignable or you do not remove it from yourself
     * @eventName `teamRolesUpdated`
     */
    removeRoleFromMember: (serverId: string, userId: string, roleId: number) => {
        return `/servers/${serverId}/members/${userId}/roles/${roleId}`;
    },

    /**
     * Get a member's roles.
     *
     * @method GET
     */
    getMemberRoles: (serverId: string, userId: string) => {
        return `/servers/${serverId}/members/${userId}/roles`;
    },

    /**
     * ----------
     * WEBHOOKS
     * ----------
     */

    /**
     * Create a new webhook.
     *
     * @method POST
     * @permissions `Manage webhooks`
     * @eventName `TeamWebhookCreated`
     */
    createWebhook: (serverId: string) => {
        return `/servers/${serverId}/webhooks`;
    },

    /**
     * Get the webhooks of a channel.
     *
     * @method GET
     * @permissions `Manage webhooks`
     */
    getWebhooks: (serverId: string, channelId: string) => {
        return `/servers/${serverId}/webhooks?channelId=${channelId}`;
    },

    /**
     * Get a specific webhook.
     *
     * @method GET
     * @permissions `Manage webhooks`
     */
    getWebhook: (serverId: string, webhookId: string) => {
        return `/servers/${serverId}/webhooks/${webhookId}`;
    },

    /**
     * Update a webhook.
     *
     * @method PUT
     * @permissions `Manage webhooks`
     * @eventName `TeamWebhookUpdated`
     */
    updateWebhook: (serverId: string, webhookId: string) => {
        return `/servers/${serverId}/webhooks/${webhookId}`;
    },

    /**
     * Delete a webhook.
     *
     * @method DELETE
     * @permissions `Manage webhooks`
     * @eventName `TeamWebhookUpdated`
     */
    deleteWebhook: (serverId: string, webhookId: string) => {
        return `/servers/${serverId}/webhooks/${webhookId}`;
    },
};

export type Routes = typeof routes;
