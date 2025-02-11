import { Listener, container } from '@sapphire/framework';
import type { Guild } from 'discord.js';

export class GuildListener extends Listener {
	public async run(Guild: Guild) {
		container.logger.info(`Gateway: Joined ${Guild.name}.`);
	}
}
