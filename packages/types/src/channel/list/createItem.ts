import { CreateListItemNote } from "./createItemNote";

/** Type definition of how a create list item request should look like. */
export type CreateListItem = {
    /**
     * Message of the list item.
     * In markdown format.
     */
    message: string;
    /** Note of this list item. */
    note?: CreateListItemNote;
};
