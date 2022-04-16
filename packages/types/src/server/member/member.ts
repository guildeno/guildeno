import { User } from "../../user";

/** Type definition of a server member. */
export type ServerMember = {
    /** User data of this member. */
    user: User;
    /** Ids of the roles which are assigned to this member. */
    roleIds: number[];
    /** Current Nickname of this member. */
    nickname?: string;
    /**
     * Timestamp in ISO 8601 format,
     * of when the member has joined the server.
     */
    joinedAt: string;
};
