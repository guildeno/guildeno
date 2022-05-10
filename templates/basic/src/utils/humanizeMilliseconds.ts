export function humanizeMilliseconds(milliseconds: number) {
    // Gets ms into seconds
    const time = milliseconds / 1000;
    if (time < 1) return "1 second";

    const days = Math.floor(time / 86400);
    const hours = Math.floor((time % 86400) / 3600);
    const minutes = Math.floor(((time % 86400) % 3600) / 60);
    const seconds = Math.floor(((time % 86400) % 3600) % 60);

    const dayString = days ? `${days} day(s) ` : "";
    const hourString = hours ? `${hours} hour(s) ` : "";
    const minuteString = minutes ? `${minutes} minute(s) ` : "";
    const secondString = seconds ? `${seconds} seconds ` : "";

    return `${dayString}${hourString}${minuteString}${secondString}`;
}
