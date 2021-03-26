export const USER_AGENT = "GuildedBot (https://github.com/itohatweb/guildeno, 0.0.0)";

export const BASE_GATEWAY_URL = "wss://api.guilded.gg/socket.io";

export const BASE_URL = "https://www.guilded.gg/api";

export const IMAGE_BASE_URL = "https://s3-us-west-2.amazonaws.com/www.guilded.gg";

export const baseEndpoints = {
  BASE_GATEWAY_URL,
  BASE_URL,
  CDN_URL: IMAGE_BASE_URL,
};

const CHANNEL_BASE = (channelId: string) => `${baseEndpoints.BASE_URL}/channels/${channelId}`;

export const endpoints = {
  CHANNEL_BASE,
};
