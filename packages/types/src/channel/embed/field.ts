/** Type definition of an embed field. */
export type EmbedField = {
    /**
     * Header of the table-like cell.
     *
     * @maximum 256
     */
    name: string;
    /**
     * Subtext of the table-like cell.
     *
     * @maximum 1024
     */
    value: string;
    /**
     * Whether the field should wrap or not.
     *
     * @default false
     */
    inline?: boolean;
};
