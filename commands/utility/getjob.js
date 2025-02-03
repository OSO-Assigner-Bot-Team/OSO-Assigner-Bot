const fs = require('node:fs');
const { parse } = require('csv/sync');
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getjob')
		.setDescription('Gets you the specified job.')
		.addStringOption((option) => option.setName('scene_id').setDescription('Scene ID').setRequired(true))
		.setDefaultMemberPermissions(
			PermissionFlagsBits.SendMessages |
				PermissionFlagsBits.AttachFiles |
				PermissionFlagsBits.ReadMessageHistory |
				PermissionFlagsBits.AddReactions |
				PermissionFlagsBits.UseApplicationCommands |
				PermissionFlagsBits.SendPolls |
				PermissionFlagsBits.ViewChannel
		),

	async execute(interaction) {
		const scene_id = interaction.options.getString('scene_id');

		const scene = parse(fs.readFileSync('jobs.v0.csv'));

		for (const i of scene) {
			if (scene_id.toUpperCase() === i[0]) {
				interaction.user.send(`
You have been assigned the following job:

**Scene ID:** ${i[0]}

**Description:** ${i[1]}

**Attachments:** ${i[2]}

**Attributes:** ${i[3]}

Your deadline is **${i[5]}**.

If you find yourself unable to meet the deadline, send the following message: "I am unable to meet the deadline".`);
			}
		}
	},
};
