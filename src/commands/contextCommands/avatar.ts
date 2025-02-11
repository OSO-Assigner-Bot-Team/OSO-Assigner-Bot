import { Command, ContextMenuCommand } from '@sapphire/framework';
import { ApplicationCommandType, EmbedBuilder, UserContextMenuCommandInteraction } from 'discord.js';

export class SlashCommand extends Command {
	public override registerApplicationCommands(registry: ContextMenuCommand.Registry) {
		registry.registerContextMenuCommand((builder) =>
			builder.setName('Get Avatar').setType(ApplicationCommandType.User)
		);
	}

	public override async contextMenuRun(interaction: UserContextMenuCommandInteraction) {
		const Target = interaction.targetUser;
		const Avatar = Target.displayAvatarURL({ size: 4096 });
		const Embed = new EmbedBuilder().setImage(Avatar).setTitle(`${Target.tag}'s Avatar`);
		return interaction.reply({ embeds: [Embed], ephemeral: true });
	}
}
