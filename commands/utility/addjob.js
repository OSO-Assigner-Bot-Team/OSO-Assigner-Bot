const fs = require('node:fs');
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const Job = require('../../src/jobsManager.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addjob')
		.setDescription('Adds job to CSV file with the chosen values.')
		.addStringOption(option =>
			option
				.setName('scene_id')
				.setDescription('Scene ID')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('description')
				.setDescription('Description')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('attachments')
				.setDescription('Attached files')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('attributes')
				.setDescription('Attributes')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('required_roles')
				.setDescription('Required roles')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('deadline')
				.setDescription('Deadline')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('status')
				.setDescription('Status')
				.setRequired(true)
				.addChoices(Job.getAvailableStatuses()))
		.setDefaultMemberPermissions(PermissionFlagsBits.SendMessages |
			PermissionFlagsBits.AttachFiles |
			PermissionFlagsBits.ReadMessageHistory |
			PermissionFlagsBits.AddReactions |
			PermissionFlagsBits.UseApplicationCommands |
			PermissionFlagsBits.SendPolls |
			PermissionFlagsBits.ViewChannel),

	async execute(interaction) {

		// Pipe all inputs through Job class so the setters can validate the input
		const pipe_job = new Job(
			interaction.options.getString('scene_id'),
			interaction.options.getString('description'),
			interaction.options.getString('attachments'),
			interaction.options.getString('attributes'),
			interaction.options.getString('required_roles'),
			interaction.options.getString('deadline'),
			interaction.options.getString('status'));

		if (fs.existsSync('jobs.v0.csv')) {
			fs.appendFileSync('jobs.v0.csv', pipe_job.getCSVString().concat(',N/A,N/A\n'));
		}
		else {

			fs.appendFileSync('jobs.v0.csv', 'SceneId,Description,Attachments,Attributes,RequiredRoles,Deadline,Status,Assignee,Work\n');
			fs.appendFileSync('jobs.v0.csv', pipe_job.getCSVString().concat(',N/A,N/A\n'));
		}

		interaction.reply(`
## The following job has been created. First person with the required roles to use /getjob gets it!\n
* Scene ID: ${pipe_job.getSceneId()}
* Description: ${pipe_job.getDescription()}
* Attachments: ${pipe_job.getAttachments()}
* Attributes: ${pipe_job.getAttributes()}
* Required roles: ${pipe_job.getAttachments()}
* Deadline: ${pipe_job.getDeadline()}
* Status: ${pipe_job.getStatus()}`);
	},
};