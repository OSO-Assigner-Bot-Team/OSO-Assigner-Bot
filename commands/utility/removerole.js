const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('removerole')
		.setDescription('Removes the chosen role from you.')
		.addRoleOption(option =>
			option.setName('role')
				.setDescription('The role to remove from you.')
				.setRequired(true)),

	async execute(interaction) {
		const role = interaction.options.getRole('role');
		const member = interaction.member;

		member.roles.remove(role);
		await interaction.reply(`${member.user.globalName} no longer has the role ${role}.`);
	},
};