import { Listener } from '@sapphire/framework';
import { Interaction, InteractionType } from 'discord.js';

export class InteractionListener extends Listener {
	public async run(interaction: Interaction) {
		switch (interaction.type) {
			case InteractionType.ApplicationCommand:
				if (interaction.inGuild())
					return this.container.logger.info(
						`Gateway: ${interaction.user.tag} ran /${interaction.commandName} in ${
							this.container.client.guilds.cache.get(interaction.guildId!)
								?.name
						}.`
					);
				else
					return this.container.logger.info(
						`Gateway: ${interaction.user.tag} ran /${interaction.commandName}.`
					);
			case InteractionType.ModalSubmit:
				if (interaction.inGuild())
					return this.container.logger.info(
						`Gateway: ${interaction.user.tag} submitted modal "${
							interaction.customId
						}" in ${
							this.container.client.guilds.cache.get(interaction.guildId!)
								?.name
						}.`
					);
				else
					return this.container.logger.info(
						`Gateway: ${interaction.user.tag} submitted modal "${interaction.customId}".`
					);

			case InteractionType.MessageComponent:
				if (interaction.inGuild())
					return this.container.logger.info(
						`Gateway: ${interaction.user.tag} used component "${
							interaction.customId
						}" in ${
							this.container.client.guilds.cache.get(interaction.guildId!)
								?.name
						}.`
					);
				else
					return this.container.logger.info(
						`Gateway: ${interaction.user.tag} used component "${interaction.customId}".`
					);

			default:
				if (interaction.inGuild())
					return this.container.logger.info(
						`Gateway: ${interaction.user.tag} used an unidentified interaction in ${
							this.container.client.guilds.cache.get(interaction.guildId!)
								?.name
						}.`
					);
				else
					return this.container.logger.info(
						`Gateway: ${interaction.user.tag} used an unidentified component.`
					);
		}
	}
}
