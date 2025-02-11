const fs = require('node:fs');
const Job = require('../src/jobsManager.js');
const { parse } = require('csv/sync');
const {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	SlashCommandBuilder,
	PermissionFlagsBits,
} = require('discord.js');

const DATAFILE = 'jobs.v0.csv';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('givejob')
		.setDescription('Assigns the chosen job to the chosen user.')
		.addStringOption((option) => option.setName('scene_id').setDescription('Scene ID').setRequired(true))
		.addUserOption((option) =>
			option.setName('target').setDescription('User to assign job to').setRequired(true)
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
		const pipe_job = new Job(interaction.options.getString('scene_id'));
		const jobs = parse(fs.readFileSync(DATAFILE));
		const member = interaction.options.getMember('target');

		const stop = new ButtonBuilder().setCustomId('stop').setLabel('STOP').setStyle(ButtonStyle.Danger);

		const row = new ActionRowBuilder().addComponents(stop);

		for (const i of jobs) {
			if (pipe_job.getSceneId() === i[0]) {
				const message = await member.send({
					content: `
You have been assigned the following job:

**Scene ID:** ${pipe_job.getSceneId()}

**Description:** ${pipe_job.getDescription()}

**Attachments:** ${pipe_job.getAttachments()}

**Attributes:** ${pipe_job.getAttributes()}

Your deadline is **${pipe_job.getDeadlineFormatted()}**.

If you find yourself unable to meet the deadline, or want to rescind working on this job for any other reason, click the red "STOP" button below.`,

					components: [row],
					withResponse: true,
				});

				interaction.reply(
					`The job for scene ${pipe_job.getSceneId()} has been assigned to ${member}.`
				);

				const rescission = await message.awaitMessageComponent();

				if (rescission.customId === 'stop') {
					await message.edit({
						content: `**You are no longer working on the job for scene ${pipe_job.getSceneId()}.**`,
						components: [],
						withResponse: false,
					});
				}
			}
		}
	},
};
