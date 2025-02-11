import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework';
import type { ButtonInteraction } from 'discord.js';

export class ButtonHandler extends InteractionHandler {
	public constructor(ctx: InteractionHandler.LoaderContext, options: InteractionHandler.Options) {
		super(ctx, {
			...options,
			interactionHandlerType: InteractionHandlerTypes.Button,
		});
	}

	public override parse(interaction: ButtonInteraction) {
		if (interaction.customId !== 'button') return this.none();
		return this.some();
	}

	public async run(interaction: ButtonInteraction) {
		return await interaction.reply({
			content: 'Testing reply interaction!',
			ephemeral: true,
		});
	}
}
