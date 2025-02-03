const fs = require('node:fs');
const { parse } = require('csv/sync');
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('deletejob')
		.setDescription('Deletes the specified job.')
		.addStringOption((option) =>
			option.setName('scene_id').setDescription('Scene ID whose job to delete').setRequired(true)
		)
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
		const scene_id = interaction.options.getString('scene_id').toUpperCase();

		const jobs = parse(fs.readFileSync('jobs.v0.csv'));

		for (const i in jobs) {
			if (Object.prototype.hasOwnProperty.call(jobs, i)) {
				if (scene_id === jobs[i][0]) {
					const current_jobs = fs.readFileSync('jobs.v0.csv').toString().split('\n');
					current_jobs.splice(i, 1);
					const new_jobs = current_jobs.join('\n');

					fs.writeFileSync('jobs.v0.csv', new_jobs);
				}
			}
		}

		interaction.reply(`The job for scene ${scene_id} has been deleted.`);
	},
};
