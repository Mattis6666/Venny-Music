import { Client, Message } from 'eris';

export default async (client: Client, msg: Message) => {
	if (msg.content === 'ping') {
		const message = await msg.channel.createMessage('Pinging...');
		void message.edit(`Pong! ${message.createdAt - msg.createdAt}ms`);
	}
};
