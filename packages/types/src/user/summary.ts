import { User } from "./user";

/** Type definition of a user summary. */
export type UserSummary = Pick<User, "id" | "type" | "name" | "avatar">;
