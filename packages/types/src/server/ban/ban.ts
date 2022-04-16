import { UserSummary } from "../../user";

/** Type definition of a member ban. */
export type Ban = {
    /** Summary of the user which is bound to this ban. */
    user: UserSummary;
    /** Reason for this ban. */
    reason?: string;
    /** Id of the moderator which baned this user. */
    createdBy: string;
    /**
     * Timestamp in ISO 8601 format,
     * of when the member has been banned.
     */
    createdAt: string;
};
