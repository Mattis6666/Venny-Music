import { Client, Message } from 'eris';
import config from '../config';

export interface VenMessage extends Message {
	client: VenClient;
}
export interface Command {
	aliases: Array<string>;
	guildOnly: boolean;
	devOnly: boolean;
	description: string;
	usage: string;
	userPermissions: Array<string>;
	clientPermissions: Array<string>;
	callback(msg: VenMessage, args: Array<string>): Promise<Message | void>;
}

export class VenClient extends Client {
	public readonly config = config;
	public readonly queue: Map<string, Array<any>> = new Map();
	public readonly commands: Map<string, Command & Record<'name' | 'category', string>> = new Map();

	public constructor() {
		super(config.token, {
			allowedMentions: { everyone: false, roles: false, users: true },
			defaultImageFormat: 'webp',
			defaultImageSize: 512,
			disableEvents: {},
			compress: true
		});
	}

	public getCommand(name: string) {
		return this.commands.get(name) ?? [...this.commands.values()].find(c => c.name === 'name');
	}
}
