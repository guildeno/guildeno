import { SocialLinkType } from "./type";

/** Type definition of a social link. */
export type SocialLink = {
    /** Handle of the user within the external service. */
    handle?: string;
    /** Unique id that represents this members social link within the external service. */
    serviceId?: string;
    /** Type of social link. */
    type: SocialLinkType;
};
