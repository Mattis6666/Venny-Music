import { VenClient } from './struct/Client';
import { join } from 'path';
import { readdirSync } from 'fs';

const client = new VenClient({ dev: process.env.DEV === 'true' });

let listenerCount = 0;
let commandCount = 0;
const listenerPath = join(__dirname, 'events');
const commandPath = join(__dirname, 'commands');

readdirSync(listenerPath).forEach(file => {
	const path = join(listenerPath, file);
	// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
	const listener = require(path).default;
	if (!listener) return;

	client.on(file.replace('.js', ''), listener.bind(null, client));
	// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
	delete require.cache[path];

	listenerCount++;
});

console.log(`Successfully loaded ${listenerCount} listeners.`);

readdirSync(commandPath).forEach(folder => {
	readdirSync(join(commandPath, folder)).forEach(file => {
		const path = join(commandPath, folder, file);
		// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
		const command = require(path).command;
		if (!command) return;

		command.name = file.replace('.js', '');
		command.category = folder;

		client.commands.set(command.name, command);
		// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
		delete require.cache[path];

		commandCount++;
	});
});
console.log(`Loaded ${commandCount} commands.`);

void client.connect();
