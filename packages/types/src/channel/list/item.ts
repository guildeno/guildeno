import { ListItemNote } from "./itemNote";

/** Type definition of a list item. */
export type ListItem = {
    /** Id of the list item. */
    id: string;
    /** Id of the server. */
    serverId: string;
    /** Id of the channel. */
    channelId: string;
    /**
     * Message of the list item.
     * In markdown format.
     */
    message: string;
    /**
     * Timestamp in ISO 8601 format,
     * of when the item was created at.
     */
    createdAt: string;
    /**
     * Id of the user who created this list item.
     *
     * NOTE: If this list item includes a `createdByWebhookId`,
     * then this field can be ignored
     * since the value of this field will then always be `Ann6LewA`
     */
    createdBy: string;
    /**
     * Id of the webhook which created this list item,
     * if this message has been created by a webhook.
     */
    createdByWebhookId?: string;
    /**
     * Timestamp in ISO 8601 format,
     * of when this list item was updated at,
     * if relevant.
     */
    updatedAt?: string;
    /** Id of the user who updated this item. */
    updatedBy?: string;
    /** Id of the parent list item if this list item is nested. */
    parentListItemId?: string;
    /**
     * Timestamp in ISO 8601 format,
     * of when this list item was completed at.
     */
    completedAt?: string;
    /** Id of the user who completed this list item. */
    completedBy?: string;
    /** Note of this list item. */
    note?: ListItemNote;
};
