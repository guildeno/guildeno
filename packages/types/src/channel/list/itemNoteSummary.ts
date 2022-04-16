import { ListItemNote } from "./itemNote";

/** Type definition of a list item summary note. */
export type ListItemSummaryNote = Omit<ListItemNote, "content">;
