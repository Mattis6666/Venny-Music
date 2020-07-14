import { VenClient } from './struct/Client';
import { join } from 'path';

const client = new VenClient({
	commandPath: join(__dirname, 'commands'),
	listenerPath: join(__dirname, 'events'),
	configPath: join(__dirname, './config')
});

client.start();
