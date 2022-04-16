import { UpdateListItemNote } from "./updateItemNote";

/** Type definition of how an update list item request should look like. */
export type UpdateListItem = {
    /**
     * Message of the list item.
     * In markdown format.
     */
    message: string;
    /** Note of this list item. */
    note?: UpdateListItemNote;
};
