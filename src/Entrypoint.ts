import '@sapphire/plugin-logger/register';

import { PrismaClient } from '@prisma/client';
import { SapphireClient } from '@sapphire/framework';
import { container } from '@sapphire/pieces';
import { GatewayIntentBits, Partials } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new PrismaClient();

declare module '@sapphire/framework' {
	interface Container {
		database: PrismaClient;
		process: NodeJS.Process;
	}
}

container.database = client;

container.client = new SapphireClient({
	intents: [GatewayIntentBits.Guilds],
	partials: [Partials.GuildMember, Partials.User, Partials.Channel],
});

container.process.on('SIGTERM', () => {
	container.logger.info('SIGTERM signal received.');
	container.database.$disconnect();
});

container.process.on('SIGINT', () => {
	container.logger.info('SIGINT signal received.');
	container.database.$disconnect();
});

await container.client.login(process.env.GATEWAY_TOKEN).then(() => {
	container.logger.info('Gateway: Login Connected, beginning bot startup process.');
});
