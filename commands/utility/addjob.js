const fs = require('node:fs');
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const Job = require('../../src/jobsManager.js');

// Besides being the command to add jobs, this file also handles the reaction and DM functionality
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

		if (fs.existsSync('jobs.v0.csv')) {
			fs.appendFileSync('jobs.v0.csv', `\n${scene_id},"${description}",${attachments},${attributes},"${required_roles}",${deadline},${status},N/A,N/A`);
		}
		else {
			fs.appendFileSync('jobs.v0.csv', 'SceneId,Description,Attachments,Attributes,RequiredRoles,Deadline,Status,Assignee,Work');
			fs.appendFileSync('jobs.v0.csv', `\n${scene_id},"${description}",${attachments},${attributes},"${required_roles}",${deadline},${status},N/A,N/A`);
		}

		interaction.reply(`
## The following job has been created. First person to react with ✅ gets it!\n
* Scene ID: ${scene_id}
* Description: ${description}
* Attachments: ${attachments}
* Attributes: ${attributes}
* Required roles: ${required_roles}
* Deadline: ${deadline}
* Status: ${status}`);

		const message = await interaction.fetchReply();

		const collectorFilter = reaction => {
			return reaction.emoji.name === '✅';
		};

		const collector = message.createReactionCollector({ filter: collectorFilter });

		collector.on('collect', (reaction, user) => {
			console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
			interaction.client.users.send(user.id, `
You have been assigned the following job:
Scene ID: ${scene_id}

Description: ${description}

Attachments: ${attachments}

Attributes: ${attributes}

Your deadline is ${deadline}.

If you find yourself unable to meet the deadline, send the following message: "I am unable to meet the deadline".`);
		});
	},
};