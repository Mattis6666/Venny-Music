import { Command, VenMessage } from '../../struct/Client';
import { Embed } from '../../struct/Embed';

const callback = async (msg: VenMessage) => {
	const embed = new Embed(msg).setColor().setTitle('Ping').setDescription('Pinging...');
	const message = await msg.channel.createMessage({ embed: embed.json });
	return message.edit({ embed: embed.setDescription(`Pong! \`${message.createdAt - msg.createdAt}ms\``) });
};

export const command: Command = {
	aliases: ['p'],
	description: '',
	usage: '',
	devOnly: false,
	guildOnly: false,
	clientPermissions: [],
	userPermissions: [],
	callback
};
