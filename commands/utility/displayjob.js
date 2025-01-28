const fs = require('node:fs');
const { parse } = require('csv/sync');
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('displayjob')
		.setDescription('Displays the specified job.')
		.addStringOption(option =>
			option
				.setName('scene_id')
				.setDescription('Scene ID')
				.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.SendMessages |
			PermissionFlagsBits.AttachFiles |
			PermissionFlagsBits.ReadMessageHistory |
			PermissionFlagsBits.AddReactions |
			PermissionFlagsBits.UseApplicationCommands |
			PermissionFlagsBits.SendPolls |
			PermissionFlagsBits.ViewChannel),

	async execute(interaction) {
		const scene_id = interaction.options.getString('scene_id');

		const scene = parse(fs.readFileSync('jobs.v0.csv'), { trim: true });

		for (const i of scene) {
			if (scene_id.toUpperCase() === i[0]) {
				interaction.reply(`
* Scene ID: ${i[0]}
* Description: ${i[1]}
* Attachments: ${i[2]}
* Attributes: ${i[3]}
* Required roles: ${i[4]}
* Deadline: ${i[5]}
* Status: ${i[6]}`);
			}
		}
	},
};