const fs = require('node:fs');
const { parse } = require('csv-parse/sync');
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

		const scene = parse(fs.readFileSync('jobs.csv'), { trim: true });

		for (let i = 0; i < scene.length; i++) {
			if (scene_id.toUpperCase() === scene[i][0]) {
				interaction.reply(`
* Scene ID: ${scene[i][0]}
* Description: ${scene[i][1]}
* Attachments: ${scene[i][2]}
* Attributes: ${scene[i][3]}
* Required roles: ${scene[i][4]}
* Deadline: ${scene[i][5]}
* Status: ${scene[i][6]}`);
			}
		}
	},
};