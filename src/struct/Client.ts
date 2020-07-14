import { Client } from 'eris';
import config from '../config';
import { join } from 'path';
import { readdirSync } from 'fs';

interface ClientOptions {
	listenerPath: string;
	commandPath: string;
	configPath: string;
}

export class VenClient extends Client {
	private readonly paths: ClientOptions;
	public readonly config = config;
	public readonly queue: Map<string, Array<any>> = new Map();
	public readonly commands: Map<string, any> = new Map();

	public constructor(options: ClientOptions) {
		super(config.token, {
			allowedMentions: { everyone: false, roles: false, users: true },
			defaultImageFormat: 'webp',
			defaultImageSize: 512,
			disableEvents: {}
		});
		this.paths = options;
	}

	public start() {
		console.log(`Loaded ${this.initListeners()} listeners.`);
		// console.log(`Loaded ${this.initCommands()} commands.`);

		void super.connect();
	}

	public initListeners() {
		let listenerCount = 0;
		readdirSync(this.paths.listenerPath).forEach(file => {
			const path = join(this.paths.listenerPath, file);
			// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
			const listener = require(path).default;
			if (!listener) return;

			this.on(file.replace('.js', ''), listener.bind(null, this));
			// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
			delete require.cache[path];

			listenerCount++;
		});

		return listenerCount;
	}

	public initCommands() {
		let commandCount = 0;
		readdirSync(this.paths.commandPath).forEach(file => {
			const path = join(this.paths.commandPath, file);
			// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
			const command = require(path).default;
			if (!command) return;

			command.name = file.replace('.js', '');

			this.commands.set(command.name, command);
			// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
			delete require.cache[path];

			commandCount++;
		});

		return commandCount;
	}
}
