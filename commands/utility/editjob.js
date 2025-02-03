const fs = require('node:fs');
const { parse } = require('csv/sync');
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const Job = require('../../src/jobsManager.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('editjob')
		.setDescription('Edits the specified job.')
		.addStringOption((option) =>
			option.setName('scene_id').setDescription('Scene ID whose job to edit').setRequired(true)
		)
		.addStringOption((option) => option.setName('description').setDescription('Description'))
		.addStringOption((option) => option.setName('attachments').setDescription('Attached files'))
		.addStringOption((option) => option.setName('attributes').setDescription('Attributes'))
		.addStringOption((option) => option.setName('required_roles').setDescription('Required roles'))
		.addStringOption((option) => option.setName('deadline').setDescription('Deadline'))
		.addStringOption((option) =>
			option.setName('status').setDescription('Status').addChoices(Job.getAvailableStatuses())
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
		const description = interaction.options.getString('description');
		const attachments = interaction.options.getString('attachments');
		const attributes = interaction.options.getString('attributes');
		const required_roles = interaction.options.getString('required_roles');
		const deadline = interaction.options.getString('deadline');
		const status = interaction.options.getString('status');

		const jobs = parse(fs.readFileSync('jobs.v0.csv'));

		function getCurrentScene(id) {
			for (const i in jobs) {
				if (Object.prototype.hasOwnProperty.call(jobs, i)) {
					if (id === jobs[i][0]) {
						return jobs[i];
					}
				}
			}
		}

		const current_scene = getCurrentScene(scene_id);
		console.log(current_scene);
		const new_scene = [scene_id, description, attachments, attributes, required_roles, deadline, status];

		const scene = [];

		for (let i = 0; i < current_scene.length; i++) {
			if (new_scene[i] === null || new_scene[i] === undefined) {
				scene.push(current_scene[i]);
			} else if (i === 0) {
				scene.push(scene_id);
			} else if (new_scene[i] !== current_scene[i]) {
				scene.push(new_scene[i]);
			}
		}

		for (const i in jobs) {
			if (Object.prototype.hasOwnProperty.call(jobs, i)) {
				if (scene_id === jobs[i][0]) {
					let current_jobs = fs.readFileSync('jobs.v0.csv').toString().split('\n');
					current_jobs.splice(i, 1);
					current_jobs = current_jobs.concat(
						`${scene[0]},"${scene[1]}",${scene[2]},${scene[3]},${scene[4]},${scene[5]},${scene[6]},${scene[7]},${scene[8]}`
					);
					const new_jobs = current_jobs.join('\n');

					fs.writeFileSync('jobs.v0.csv', new_jobs);
				}
			}
		}
	},
};
