import { SocialLinkType } from "./type";

/**
 * Type definition of how a get member social links request should look like.
 *
 * NOTE: Only public social links will be returned.
 */
export type GetMemberSocialLinks = {
    /** Id of the server. */
    serverId: string;
    /** Id of the user. */
    userId: string;
    /** Type of social link to get. */
    type: SocialLinkType;
};
