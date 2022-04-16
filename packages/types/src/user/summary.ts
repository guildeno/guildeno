import { User } from "./user";

/** Type definition of a user summary. */
export type UserSummary = Omit<User, "createdAt">;
