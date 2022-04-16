/** Type definition of how a update message object should look like. */
export type UpdateMessage = {
    /**
     * Content of the message.
     * In markdown format.
     *
     * @minimum 1
     * @maximum 4000
     */
    content: string;
};
