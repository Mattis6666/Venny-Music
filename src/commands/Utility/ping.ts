import { Command, VenMessage } from '../../struct/Client';

export const command: Command = {
	aliases: ['p'],
	description: '',
	usage: '',
	devOnly: false,
	guildOnly: false,
	clientPermissions: [],
	userPermissions: [],
	async callback(msg: VenMessage) {
		const message = await msg.channel.createMessage('Pinging...');
		return message.edit(`Pong! \`${message.createdAt - msg.createdAt}ms\``);
	}
};
