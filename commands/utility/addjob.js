const fs = require('node:fs');
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const Job = require('../../src/jobsManager.js');

const DATAFILE = 'jobs.v0.csv';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addjob')
		.setDescription('Adds job to CSV file with the chosen values.')
		.addStringOption((option) => option.setName('scene_id').setDescription('Scene ID').setRequired(true))
		.addStringOption((option) =>
			option.setName('description').setDescription('Description').setRequired(true),
		)
		.addStringOption((option) =>
			option.setName('attachments').setDescription('Attached files').setRequired(true),
		)
		.addStringOption((option) =>
			option.setName('attributes').setDescription('Attributes').setRequired(true),
		)
		.addStringOption((option) => option.setName('deadline').setDescription('Deadline').setRequired(true))
		.addStringOption((option) =>
			option
				.setName('status')
				.setDescription('Status')
				.setRequired(true)
				.addChoices(Job.getAvailableStatuses()),
		)
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
		// Pipe all inputs through Job class so the setters can validate the input
		const pipe_job = new Job();

		// Hacky way to check if there is job with the same ID
		// if (pipe_job.getDescription != 'N/A') {
		// 	console.log(pipe_job.getJob());
		// 	console.log(pipe_job.scene_id);

		// 	throw new TypeError(`Can't add a job: "${interaction.options.getString('scene_id')}" already exists`)
		// }


		pipe_job.addJob(
			interaction.options.getString('scene_id'),
			interaction.options.getString('description'),
			interaction.options.getString('attachments'),
			interaction.options.getString('attributes'),
			interaction.options.getString('deadline'),
			interaction.options.getString('status'),
		);

		if (fs.existsSync(DATAFILE)) {
			fs.appendFileSync(DATAFILE, pipe_job.getCSVString());
		}
		else {
			throw new TypeError(`${DATAFILE} doesn't exist`);
		}

		interaction.reply(`
## The following job has been created. First person to use /givejob gets it!\n
* Scene ID: ${pipe_job.getSceneId()}
* Description: ${pipe_job.getDescription()}
* Attachments: ${pipe_job.getAttachments()}
* Attributes: ${pipe_job.getAttributes()}
* Deadline: ${pipe_job.getDeadlineFormatted()}
* Status: ${pipe_job.getStatus()}`);
	},
};
