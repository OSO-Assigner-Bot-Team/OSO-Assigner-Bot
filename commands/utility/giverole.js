const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('giverole')
		.setDescription('Gives the chosen user the chosen role.')
		.addRoleOption((option) =>
			option.setName('role').setDescription('Role to give to user').setRequired(true)
		)
		.addUserOption((option) =>
			option.setName('target').setDescription('User to give role to').setRequired(true)
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
		const role = interaction.options.getRole('role');
		const member = interaction.options.getMember('target');

		if (member.roles.cache.some((role_to_check) => role_to_check.name === role.name)) {
			interaction.reply(`${member} already has the role ${role}.`);
		} else {
			member.roles.add(role);
			interaction.reply(`${member} has been given the role ${role}.`);
		}
	},
};
