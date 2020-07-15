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

interface ClientOptions {
	dev: boolean;
}

export class VenClient extends Client {
	public readonly config = config;
	public readonly clientOptions: ClientOptions;
	public readonly queue: Map<string, Array<any>> = new Map();
	public readonly commands: Map<string, Command & Record<'name' | 'category', string>> = new Map();

	public constructor(opts: ClientOptions) {
		super(config.token, {
			allowedMentions: { everyone: false, roles: false, users: true },
			defaultImageFormat: 'webp',
			defaultImageSize: 512,
			disableEvents: {
				/* eslint-disable @typescript-eslint/naming-convention */
				CHANNEL_CREATE: true, // channel created
				CHANNEL_DELETE: true, // channel deleted
				CHANNEL_UPDATE: true, // channel properties (name, topic, bitrate, etc.) were changed
				GUILD_BAN_ADD: true, // user was banned
				GUILD_BAN_REMOVE: true, // user was unbanned
				GUILD_CREATE: false, // bot joined a guild
				GUILD_DELETE: false, // bot left a guild
				GUILD_MEMBER_ADD: true, // user joined a guild
				GUILD_MEMBER_REMOVE: true, // user left a guild
				GUILD_MEMBER_UPDATE: true, // guild member properties (roles, nick) were changed
				GUILD_ROLE_CREATE: true, // role was created
				GUILD_ROLE_DELETE: true, // role was deleted
				GUILD_ROLE_UPDATE: true, // role properties (name, permissions, color, etc.) were updated
				GUILD_UPDATE: true, // guild properties (name, icon, region, etc.) were updated
				MESSAGE_CREATE: false, // message was created
				MESSAGE_DELETE: true, // message was deleted
				MESSAGE_DELETE_BULK: true, // many messages were deleted at once
				MESSAGE_UPDATE: false, // message properties (content, editedTimestamp, embeds, etc.) were changed
				PRESENCE_UPDATE: true, // user presence (status, game) was changed, or user was updated (avatar, discriminator, username)
				TYPING_START: true, // user started typing
				USER_UPDATE: false, // bot user was updated
				VOICE_STATE_UPDATE: false // user voice state (current voice channel, mute, selfDeaf, etc.) was changed
				/* eslint-enable @typescript-eslint/naming-convention */
			},
			compress: true
		});
		this.clientOptions = opts;
	}

	public getCommand(name: string) {
		return this.commands.get(name) ?? [...this.commands.values()].find(c => c.name === 'name');
	}
}
