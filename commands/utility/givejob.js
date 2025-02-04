const fs = require('node:fs');
const Job = require('../../src/jobsManager.js');
const { parse } = require('csv/sync');
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('givejob')
		.setDescription('Assigns the chosen job to the chosen user.')
		.addStringOption(option =>
			option
				.setName('scene_id')
				.setDescription('Scene ID')
				.setRequired(true))
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('User to assign job to')
				.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.SendMessages |
			PermissionFlagsBits.AttachFiles |
			PermissionFlagsBits.ReadMessageHistory |
			PermissionFlagsBits.AddReactions |
			PermissionFlagsBits.UseApplicationCommands |
			PermissionFlagsBits.SendPolls |
			PermissionFlagsBits.ViewChannel),

	async execute(interaction) {
		// const pipe_job = new Job(interaction.options.getString('scene_id'));
		const scene_id = interaction.options.getString('scene_id');
		const jobs = parse(fs.readFileSync('jobs.v0.csv'));
		const member = interaction.options.getMember('target');

		console.log(member.roles.cache);

		for (const i of jobs) {
			if (scene_id.toUpperCase() === i[0]) {
				member.send(`
You have been assigned the following job:

**Scene ID:** ${i[0]}

**Description:** ${i[1]}

**Attachments:** ${i[2]}

**Attributes:** ${i[3]}

Your deadline is **${i[5]}**.

If you find yourself unable to meet the deadline, send the following message: "I am unable to meet the deadline".`);

				interaction.reply(`The job for scene ${i[0]} has been assigned to ${member}.`);
			}
		}
	},
};
