import { Client } from 'eris';

export default (client: Client) => {
	console.log(`Successfully connected as ${client.user.username}`);
};
