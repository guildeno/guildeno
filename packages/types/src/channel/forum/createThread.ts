/** Type definition of how a create forum thread request should look like. */
export type CreateForumThread = {
    // TODO: figure out the max length
    /**
     * Title of the forum thread.
     *
     * @minimum 1
     */
    title: string;
    /**
     * Content of the forum thread.
     * In markdown format.
     */
    content: string;
};
