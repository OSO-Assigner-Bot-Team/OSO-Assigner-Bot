import { ApplyOptions } from '@sapphire/decorators';
import { Listener, SapphireClient } from '@sapphire/framework';
import '@sapphire/plugin-logger/register';
import { ActivityType } from 'discord.js';

@ApplyOptions<Listener.Options>({ once: true })
export class ReadyListener extends Listener {
	public async run(c: SapphireClient) {
		this.container.logger.info('Gateway: Client Ready Event Stage initiated, starting...');

		try {
			this.container.database.$connect();
			this.container.logger.info('Database: Successfully connected to database!');
		} catch {
			this.container.logger.fatal('Database: Unable to connect to database, closing application.');
			process.exit(1);
		}

		c.user!.setActivity({
			name: 'around with the Discord Gateway!',
			type: ActivityType.Playing,
		});

		this.container.logger.info('Gateway: Activity set Stage completed, continuing...');
		this.container.logger.info(`Gateway: Now successfully started as ${c.user!.username}!`);
	}
}
