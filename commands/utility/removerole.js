const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('removerole')
		.setDescription('Removes the chosen role from the chosen user.')
		.addRoleOption(option =>
			option
				.setName('role')
				.setDescription('Role to remove from user')
				.setRequired(true))
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('User to remove role from')
				.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.SendMessages |
			PermissionFlagsBits.AttachFiles |
			PermissionFlagsBits.ReadMessageHistory |
			PermissionFlagsBits.AddReactions |
			PermissionFlagsBits.UseApplicationCommands |
			PermissionFlagsBits.SendPolls |
			PermissionFlagsBits.ViewChannel),

	async execute(interaction) {
		const role = interaction.options.getRole('role');
		const member = interaction.options.getMember('target');

		if (member.roles.cache.some(role_to_check => role_to_check.name === role.name)) {
			member.roles.remove(role);
			interaction.reply(`${member} no longer has the role ${role}.`);
		}
		else {
			interaction.reply(`${member} already doesn't have the role ${role}.`);
		}
	},
};