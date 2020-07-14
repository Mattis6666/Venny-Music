import { VenClient, VenMessage } from '../struct/Client';

export default async (client: VenClient, msg: VenMessage) => {
	if (msg.author.bot) return;

	msg.client = client;

	return client.getCommand('ping')?.callback(msg, []);
};
