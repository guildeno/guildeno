import { EmbedAuthor } from "./author";
import { EmbedField } from "./field";
import { EmbedFooter } from "./footer";
import { EmbedImage } from "./image";
import { EmbedThumbnail } from "./thumbnail";

/** Type definition of a chat embed. */
export type ChatEmbed = {
    /**
     * Main header of the embed.
     *
     * @maximum 265
     */
    title?: string;
    /**
     * Subtext of the embed.
     *
     * @maximum 2048
     */
    description?: string;
    /**
     * URL to linkify the `title` field.
     *
     * @maximum 1024
     *
     * Needs to match the regex `^(?!attachment)`
     */
    url?: string;
    /**
     * Integer value of the color that the border should be.
     *
     * @minimum 0
     * @maximum 16777215
     */
    color?: number;
    /** A small section at the bottom of the embed. */
    footer?: EmbedFooter;
    /** Timestamp to put in the footer. */
    timestamp?: string;
    /** An image to the right of the embed's content. */
    thumbnail?: EmbedThumbnail;
    /** The main picturer to associate with the embed. */
    image?: EmbedImage;
    /** A small section above the title of the embed. */
    author?: EmbedAuthor;
    /**
     * Table-like cells to add to the embed.
     *
     * @maximum 25
     */
    fields?: EmbedField[];
};
