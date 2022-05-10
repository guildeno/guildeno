import { cache } from "../cache";

cache.eventHandlers.welcome = (greeting) => {
    console.log("[LOGGED IN]", greeting);
};
