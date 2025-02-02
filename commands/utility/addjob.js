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

		const scene_id = pipe_job.getSceneId();
		const description = pipe_job.getDescription();
		const attachments = pipe_job.getAttachments();
		const attributes = pipe_job.getAttributes();
		const required_roles = pipe_job.getRequiredRoles();
		const deadline = pipe_job.getDeadline();
		const status = pipe_job.getStatus();

		if (fs.existsSync('jobs.v0.csv')) {
			fs.appendFileSync('jobs.v0.csv', `\n${scene_id},"${description}",${attachments},${attributes},"${required_roles}",${deadline},${status},N/A,N/A`);
		}
		else {
			fs.appendFileSync('jobs.v0.csv', 'SceneId,Description,Attachments,Attributes,RequiredRoles,Deadline,Status,Assignee,Work');
			fs.appendFileSync('jobs.v0.csv', `\n${scene_id},"${description}",${attachments},${attributes},"${required_roles}",${deadline},${status},N/A,N/A`);
		}

		interaction.reply(`
## The following job has been created. First person with the required roles to use /getjob gets it!\n
* Scene ID: ${scene_id}
* Description: ${description}
* Attachments: ${attachments}
* Attributes: ${attributes}
* Required roles: ${required_roles}
* Deadline: ${deadline}
* Status: ${status}`);
	},
};