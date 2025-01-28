const fs = require('node:fs');
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addjob')
		.setDescription('Adds job to CSV file with the chosen values. Make sure to put the description in quotes!')
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
				.addChoices(
					// Should this be in separate file for easy lookup?
					{ name: 'Completed', value: 'completed' },
					{ name: 'In Progress', value: 'inProgress' },
					{ name: 'Unassigned', value: 'unassigned' },
				))
		.setDefaultMemberPermissions(PermissionFlagsBits.SendMessages |
			PermissionFlagsBits.AttachFiles |
			PermissionFlagsBits.ReadMessageHistory |
			PermissionFlagsBits.AddReactions |
			PermissionFlagsBits.UseApplicationCommands |
			PermissionFlagsBits.SendPolls |
			PermissionFlagsBits.ViewChannel),

	async execute(interaction) {
		// how would scene ID work? shouldn't it be automatic?
		const scene_id = interaction.options.getString('scene_id');
		// sanitize input. There shouldn't be any commas in the fields.
		const description = interaction.options.getString('description');
		const attachments = interaction.options.getString('attachments');
		const attributes = interaction.options.getString('attributes');
		const required_roles = interaction.options.getString('required_roles');
		// deadline would need to be checked for valid date
		const deadline = interaction.options.getString('deadline');
		const status = interaction.options.getString('status');

		if (fs.existsSync('jobs.csv')) {
			fs.appendFileSync('jobs.csv', `${scene_id}, ${description}, ${attachments}, ${attributes}, ${required_roles}, ${deadline}, ${status}\n`);
		}
		else {
			fs.appendFileSync('jobs.csv', 'SceneId, Description, Attachments, Attributes, RequiredRoles, Deadline, Status\n');
			fs.appendFileSync('jobs.csv', `${scene_id}, ${description}, ${attachments}, ${attributes}, ${required_roles}, ${deadline}, ${status}\n`);
		}

		interaction.reply(`
## The following job has been created.\n
* Scene ID: ${scene_id}
* Description: ${description}
* Attachments: ${attachments}
* Attributes: ${attributes}
* Required roles: ${required_roles}
* Deadline: ${deadline}
* Status: ${status}`);
	},
};