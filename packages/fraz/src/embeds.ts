import { ChatEmbed } from "@guildeno/types";

export class Embeds extends Array<ChatEmbed> {
    constructor() {
        super();

        return this;
    }

    setTitle(title: string) {
        this.#currentEmbed().title = title;

        return this;
    }

    setDescription(description: string | string[]) {
        if (Array.isArray(description)) description = description.join("\n");
        this.#currentEmbed().description = description;

        return this;
    }

    setUrl(url: string) {
        this.#currentEmbed().url = url;

        return this;
    }

    setColor(color: string | number) {
        if (typeof color === "string") {
            if (color.toUpperCase() === "RANDOM") {
                color = Math.floor(Math.random() * (0xffffff + 1));
            } else {
                color = parseInt(color.replace("#", ""), 16);
            }
        }

        this.#currentEmbed().color = color;

        return this;
    }

    setFooter(text: string, iconUrl?: string) {
        this.#currentEmbed().footer = {
            text,
            icon_url: iconUrl,
        };

        return this;
    }

    setTimestamp(time: number | string | Date = new Date()) {
        this.#currentEmbed().timestamp = time instanceof Date ? time.toISOString() : new Date(time).toISOString();

        return this;
    }

    setThumbnail(url: string) {
        this.#currentEmbed().thumbnail = { url };

        return this;
    }

    setImage(url: string) {
        this.#currentEmbed().image = { url };

        return this;
    }

    setAuthor(name: string, iconUrl?: string, url?: string) {
        const embed = this.#currentEmbed();

        embed.author = {
            name,
            url,
            icon_url: iconUrl,
        };

        return this;
    }

    addField(name: string, value: string, inline = false) {
        const embed = this.#currentEmbed();

        if (embed.fields && embed.fields.length >= 25) return this;

        if (embed.fields === undefined) {
            embed.fields = [];
        }

        embed.fields.push({
            name,
            value,
            inline,
        });

        return this;
    }

    addBlankField(inline = false) {
        return this.addField("\u200B", "\u200B", inline);
    }

    addEmbed(embed?: ChatEmbed) {
        if (this.length === 10) return this;

        this.push({ ...embed, fields: embed?.fields ?? [] });

        return this;
    }

    /** Get the last Embed, if there is no it will create one. */
    #currentEmbed() {
        if (this.length) return this[this.length - 1];

        this.push({
            fields: [],
        });

        return this[0];
    }
}
