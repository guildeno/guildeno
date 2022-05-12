import { RequireAtLeastOne } from "../../utils";

/** Type definition of how an update channel request should look like. */
export type UpdateChannel = RequireAtLeastOne<{
    /**
     * Name of the channel.
     *
     * @minimum 1
     * @maximum 100
     */
    name?: string;
    /**
     * Topic of the channel.
     *
     * @minimum 1
     * @maximum 512
     */
    topic?: string;
    /**
     * Whether the channel can be accessed from users who are not member of the server.
     *
     * @default false
     */
    isPublic?: boolean;
}>;
