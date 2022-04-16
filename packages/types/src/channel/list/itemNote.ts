/** Type definition of a list item note. */
export type ListItemNote = {
    /**
     * Timestamp in ISO 8601 format,
     * of when the note was created at.
     */
    createdAt: string;
    /** Id of the user who created this note. */
    createdBy: string;
    /**
     * Timestamp in ISO 8601 format,
     * of when the note was updated at,
     * if relevant.
     */
    updatedAt?: string;
    /** Id of the user who updated this note. */
    updatedBy?: string;
    /**
     * Content of this note.
     * In markdown format.
     */
    content: string;
};
