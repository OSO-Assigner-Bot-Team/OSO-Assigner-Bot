const fs = require('node:fs');
const { parse } = require('csv-parse/sync');
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('readjob')
		.setDescription('Reads the specified job from the CSV file and displays it.')
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

		const scene = fs.readFileSync('jobs.csv');
		const parsed_scene = parse(scene, { trim: true });

		for (let i = 0; i < parsed_scene.length; i++) {
			if (scene_id.toUpperCase() === parsed_scene[i][0]) {
				interaction.reply(`
* Scene ID: ${parsed_scene[i][0]}
* Description: ${parsed_scene[i][1]}
* Attachments: ${parsed_scene[i][2]}
* Attributes: ${parsed_scene[i][3]}
* Required roles: ${parsed_scene[i][4]}
* Deadline: ${parsed_scene[i][5]}
* Status: ${parsed_scene[i][6]}`);
			}
		}
	},
};