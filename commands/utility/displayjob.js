const fs = require('node:fs');
const { parse } = require('csv/sync');
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const Job = require('../../src/jobsManager');

const DATAFILE = 'jobs.v0.csv';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('displayjob')
		.setDescription('Displays the specified job.')
		.addStringOption((option) => option.setName('scene_id').setDescription('Scene ID').setRequired(true))
		.setDefaultMemberPermissions(
			PermissionFlagsBits.SendMessages |
				PermissionFlagsBits.AttachFiles |
				PermissionFlagsBits.ReadMessageHistory |
				PermissionFlagsBits.AddReactions |
				PermissionFlagsBits.UseApplicationCommands |
				PermissionFlagsBits.SendPolls |
				PermissionFlagsBits.ViewChannel,
		),

	async execute(interaction) {
		const pipe_job = new Job(interaction.options.getString('scene_id'));

		const scene = parse(fs.readFileSync(DATAFILE));

		for (const i of scene) {
			if (pipe_job.getSceneId() === i[0]) {
				interaction.reply(`
* Scene ID: ${pipe_job.getSceneId()}
* Description: ${pipe_job.getDescription()}
* Attachments: ${pipe_job.getAttachments()}
* Attributes: ${pipe_job.getAttributes()}
* Deadline: ${pipe_job.getDeadlineFormatted()}
* Status: ${pipe_job.getStatus()}
* Assignee: ${pipe_job.getAssignee()}
* Work: ${pipe_job.getWork()}`);
			}
		}
	},
};
