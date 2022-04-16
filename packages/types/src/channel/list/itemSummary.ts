import { ListItem } from "./item";
import { ListItemSummaryNote } from "./itemNoteSummary";

/** Type definition of a list item summary. */
export type ListItemSummary = Omit<ListItem, "note"> & {
    /** Note of this list item. */
    note?: ListItemSummaryNote;
};
