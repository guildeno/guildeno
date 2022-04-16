/** Type definition of how an update doc request should look like. */
export type UpdateDoc = {
    // TODO: figure out max length
    /**
     * Title of the doc.
     *
     * @minimum 1
     */
    title: string;
    /**
     * Content of the doc.
     * In markdown format.
     */
    content: string;
};
