/* eslint-disable @typescript-eslint/naming-convention */
import tinycolour from 'tinycolor2';
import { Message } from 'eris';

export class Embed {
	private readonly type = 'rich';
	public color?: number;
	public timestamp?: Date;
	public title?: string;
	public url?: string;
	public description?: string;
	public thumbnail?: { url: string };
	public image?: { url: string };
	public author?: author;
	public footer?: footer;
	public fields: Array<field> = [];

	public constructor(msg?: Message, template = true) {
		if (template) {
			this.setColor();
			this.setTimestamp();
			if (msg) this.setFooter(msg.author.username, msg.author.avatarURL);
		}
	}

	public setTitle(title: string) {
		this.title = title;
		return this;
	}

	public setUrl(url: string) {
		this.url = url;
		return this;
	}

	public setDescription(description: string) {
		this.description = description;
		return this;
	}

	public setThumbnail(thumbnail: string | { url: string }) {
		if (typeof thumbnail === 'string') {
			this.thumbnail = { url: thumbnail };
		} else {
			this.thumbnail = thumbnail;
		}

		return this;
	}

	public setImage(image: string | { url: string }) {
		if (typeof image === 'string') {
			this.image = { url: image };
		} else {
			this.image = image;
		}

		return this;
	}

	public setAuthor(name: string, icon_url?: string, url?: string): this;
	public setAuthor(name: author): this;
	public setAuthor(name: string | author, icon_url?: string, url?: string) {
		if (typeof name === 'object') {
			this.author = name;
		} else {
			this.author = { name, icon_url, url };
		}

		return this;
	}

	public setFooter(text: string, icon_url?: string, url?: string): this;
	public setFooter(text: footer): this;
	public setFooter(text: string | footer, icon_url?: string, url?: string) {
		if (typeof text === 'object') {
			this.footer = text;
		} else {
			this.footer = { text, icon_url, url };
		}

		return this;
	}

	public setTimestamp(timestamp?: Date | number | string) {
		this.timestamp = timestamp ? new Date(timestamp) : new Date();

		return this;
	}

	public setColor(color?: string) {
		const colorInstance = tinycolour(color);

		this.color = parseInt(colorInstance.toHex(), 16);

		return this;
	}

	public addField(name: string, value: string, inline = false) {
		this.fields.push({ name, value, inline });
		return this;
	}

	public addFields(fields: Array<field>) {
		fields.forEach(field => this.addField(field.name, field.value, field.inline));

		return this;
	}

	public get json() {
		return {
			type: this.type,
			title: this.title,
			url: this.url,
			author: this.author,
			footer: this.footer,
			color: this.color,
			timestamp: this.timestamp,
			image: this.image,
			thumbnail: this.thumbnail,
			fields: this.fields
		};
	}
}

interface author {
	name: string;
	icon_url?: string;
	url?: string;
}

interface footer {
	text: string;
	icon_url?: string;
	url?: string;
}

interface field {
	name: string;
	value: string;
	inline?: boolean;
}
