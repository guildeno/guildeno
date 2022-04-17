import { UserSummary } from "../../user";

/** Type definition of a server member summary. */
export type ServerMemberSummary = {
    /** User summary data of this member. */
    user: UserSummary;
    /** Ids of the roles which are assigned to this member. */
    roleIds: number[];
};
