import { VenMessage, VenClient } from '../struct/Client';
import { GuildChannel } from 'eris';
import { stripIndents } from 'common-tags';

export default async (client: VenClient, msg: VenMessage) => {
	if (msg.author.bot) return;

	if (msg.channel instanceof GuildChannel && !msg.channel.permissionsOf(client.user.id).has('readMessages')) return;

	const prefixRegex = new RegExp(
		`^(<@!?${client.user.id}>|${client.config.defaultPrefixes.map(p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\s*`,
		'i'
	);

	const matched = prefixRegex.exec(msg.content);
	const prefix = matched?.[0];
	if ((!prefix && msg.guildID) || (prefix && !msg.content.startsWith(prefix))) return;

	if (!msg.content.replace(new RegExp(`<@!?${client.user.id}>`), '').length) {
		return msg.channel.createMessage(
			stripIndents`
				My prefix is \`${client.config.defaultPrefixes[0]}\`
				For a list of commands, type \`${client.config.defaultPrefixes[0]}help\`
			`
		);
	}

	let args = msg.content
		.slice(prefix?.length ?? 0)
		.trim()
		.split(/ +/);

	let commandName = args.shift();
	if (!commandName) return;

	if (args.length === 1 && args[0].toLowerCase() === 'help') {
		args = [commandName];
		commandName = 'help';
	}

	const command = client.getCommand(commandName);
	if (!command) return;

	const force = client.config.owners.includes(msg.author.id) && args[args.length - 1] === '--force';
	if (force) args.pop();

	return command.callback(msg, args);
};
