import { UserType } from "./type";

/** Type definition of a user. */
export type User = {
    /** Id of the user. */
    id: string;
    /**
     * Type of this user.
     *
     * If `undefined` it can be assumed that its a normal `user`.
     */
    type: UserType;
    /** Name of the user. */
    name: string;
    /** URL of the avatar image associated with this user. */
    avatar?: string;
    /** URL of the banner image associated with this user. */
    banner?: string;
    /**
     * Timestamp in ISO 8601 format,
     * of when the user was created at.
     */
    createdAt: string;
};
