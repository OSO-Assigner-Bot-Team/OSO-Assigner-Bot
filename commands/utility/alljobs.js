const fs = require('node:fs');
const { parse } = require('csv/sync');
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const Job = require('../../src/jobsManager');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('alljobs')
		.setDescription('Displays all jobs.')
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
		const jobs = parse(fs.readFileSync('jobs.v0.csv'));
		let scene = new Job();
		let table = '';

		for (const i of jobs) {
			// Are we at the header?
			if (i[0] == 'SceneId') {
				// Create formatted header
				table = table.concat(
					'__Scene ID, Description, Attachments, Attributes, Required roles, Deadline, Status, Assignee, Work__\n'
				);
				continue;
			}

			scene.setJob(i);
			// Create row
			table = table.concat(
				scene.getCSVString());
		}

		interaction.reply(table);
	},
};
