/** Type definition of how a get create doc request should look like. */
export type CreateDoc = {
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
