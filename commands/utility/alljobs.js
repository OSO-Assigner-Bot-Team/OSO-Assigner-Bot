const fs = require('node:fs');
const { parse } = require('csv/sync');
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

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

			// Create row
			table = table.concat(
				`${i[0]}, "${i[1]}", ${i[2]}, ${i[3]}, ${i[4]}, ${i[5]}, ${i[6]}, ${i[7]}, ${i[8]}\n`
			);
		}

		interaction.reply(table);
	},
};
