const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('giverole')
		.setDescription('Gives you the chosen role.')
		.addRoleOption(option =>
			option.setName('role')
				.setDescription('The role to give you.')
				.setRequired(true)),

	async execute(interaction) {
		const role = interaction.options.getRole('role');
		const member = interaction.member;

		member.roles.add(role);
		await interaction.reply(`${member.user.globalName} now has the role ${role}.`);
	},
};