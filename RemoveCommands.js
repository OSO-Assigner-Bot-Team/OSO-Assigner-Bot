import { SapphireClient } from '@sapphire/framework';
import '@sapphire/plugin-logger/register';
import { GatewayIntentBits, REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
import ora from 'ora';
dotenv.config();

const OraSpinner1 = ora('Getting client info...');
OraSpinner1.start();

const Client = new SapphireClient({
	intents: [GatewayIntentBits.Guilds],
});

await Client.login(process.env.GATEWAY_TOKEN);
OraSpinner1.succeed('Logged into client and got info!');

const OraSpinner2 = ora('Removing Commands...');
OraSpinner2.start();

const rest = new REST().setToken(process.env.GATEWAY_TOKEN);

await rest
	.put(Routes.applicationCommands(Client.user.id), { body: [] })
	.then(() => {
		OraSpinner2.succeed(`Removed all commands from ${Client.user.username}`);
		process.exit(0);
	})
	.catch((err) => {
		OraSpinner2.fail('Commands were not removed due to a fault, please read below for more info.');
		console.error(err);
		process.exit(0);
	});

Client.guilds.cache.forEach(
	async (g) =>
		await rest
			.put(Routes.applicationGuildCommands(Client.user.id, g.id), { body: [] })
			.then(() => {
				OraSpinner2.succeed(
					`Removed all guild commands from ${Client.user.username} in ${g.name}`
				);
				process.exit(0);
			})
			.catch((err) => {
				OraSpinner2.fail(
					`Commands were not removed from a guild due to a fault, please read below for more info. [FAILED REMOVING FROM ${g.name.toUpperCase()}]`
				);
				console.error(err);
				process.exit(0);
			})
);
