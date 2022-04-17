import { GetMessages, GetDocs, SocialLinkType } from "@guildeno/types";

/**
 * Create URL construction functions.
 *
 * The purpose of those constructors is to make it generally easier to make requests to Guilded.
 *
 * NOTE: Normally you do not need to use this.
 * All available handlers are available under `rest.handlers`.
 * AKA a lib internal function
 */
export const routes = {
    /**
     * ----------
     * CHANNELS
     * ----------
     */

    /**
     * Create a channel message.
     *
     * @method POST
     */
    createChannelMessage: (channelId: string) => {
        return `/channels/${channelId}/messages`;
    },
    /**
     * Get messages from a channel.
     *
     * @method GET
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
     */
    getChannelMessage: (channelId: string, messageId: string) => {
        return `/channels/${channelId}/messages/${messageId}`;
    },
    /**
     * Update a message in a channel.
     *
     * @method PUT
     */
    updateChannelMessage: (channelId: string, messageId: string) => {
        return `/channels/${channelId}/messages/${messageId}`;
    },
    /**
     * Delete a message from a channel.
     *
     * @method DELETE
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
     */
    changeMemberNickname: (serverId: string, userId: string) => {
        return `/servers/${serverId}/members/${userId}/nickname`;
    },
    /**
     * Remove a member's nickname.
     *
     * @method DELETE
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
     */
    createBan: (serverId: string, userId: string) => {
        return `/servers/${serverId}/bans/${userId}`;
    },
    /**
     * Get a ban from a server.
     *
     * @method GET
     */
    getBan: (serverId: string, userId: string) => {
        return `/servers/${serverId}/bans/${userId}`;
    },
    /**
     * Revoke a server ban.
     *
     * @method DELETE
     */
    removeBan: (serverId: string, userId: string) => {
        return `/servers/${serverId}/bans/${userId}`;
    },
    /**
     * Get all the bans of a server.
     *
     * @method GET
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
     */
    createListItem: (channelId: string) => {
        return `/channels/${channelId}/items`;
    },
    /**
     * Get all items from a list.
     *
     * @method GET
     */
    getListItems: (channelId: string) => {
        return `/channels/${channelId}/items`;
    },
    /**
     * Get an item from a list.
     *
     * @method GET
     */
    getListItem: (channelId: string, listItemId: string) => {
        return `/channels/${channelId}/items${listItemId}`;
    },
    /**
     * Update an item of a list.
     *
     * @method PUT
     */
    updateListItem: (channelId: string, listItemId: string) => {
        return `/channels/${channelId}/items/${listItemId}`;
    },
    /**
     * Remove an item from a list.
     *
     * @method DELETE
     */
    removeListItem: (channelId: string, listItemId: string) => {
        return `/channels/${channelId}/items/${listItemId}`;
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
     */
    createDoc: (channelId: string) => {
        return `/channels/${channelId}/docs`;
    },
    /**
     * Get the docs from a channel.
     *
     * @method GET
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
     */
    getDoc: (channelId: string, docId: number) => {
        return `/channels/${channelId}/docs/${docId}`;
    },
    /**
     * Update a doc of a channel.
     *
     * @method PUT
     */
    updateDoc: (channelId: string, docId: number) => {
        return `/channels/${channelId}/docs/${docId}`;
    },
    /**
     * Remove a doc from a channel.
     *
     * @method DELETE
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
     */
    addMemberToGroup: (groupId: string, userId: string) => {
        return `/groups/${groupId}/members/${userId}`;
    },
    /**
     * Revoke a member's access from a group.
     *
     * @method DELETE
     */
    removeMemberFromGroup: (groupId: string, userId: string) => {
        return `/groups/${groupId}/members/${userId}`;
    },
    /**
     * Assign a role to a member.
     *
     * @method PUT
     */
    addRoleToMember: (serverId: string, userId: string, roleId: number) => {
        return `/servers/${serverId}/members/${userId}/roles/${roleId}`;
    },
    /**
     * Remove a role from a member.
     *
     * @method DELETE
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
     */
    createWebhook: (serverId: string) => {
        return `/servers/${serverId}/webhooks`;
    },
    /**
     * Get the webhooks of a channel.
     *
     * @method GET
     */
    getWebhooks: (serverId: string, channelId: string) => {
        return `/servers/${serverId}/webhooks?channelId=${channelId}`;
    },
    /**
     * Get a specific webhook.
     *
     * @method GET
     */
    getWebhook: (serverId: string, webhookId: string) => {
        return `/servers/${serverId}/webhooks/${webhookId}`;
    },
    /**
     * Update a webhook.
     *
     * @method PUT
     */
    updateWebhook: (serverId: string, webhookId: string) => {
        return `/servers/${serverId}/webhooks/${webhookId}`;
    },
    /**
     * Delete a webhook.
     *
     * @method DELETE
     */
    deleteWebhook: (serverId: string, webhookId: string) => {
        return `/servers/${serverId}/webhooks/${webhookId}`;
    },
};

export type Routes = typeof routes;
