const fs = require('node:fs');
const { Collection, MessageFlags, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Gets a list of commands and what they do.'),

	async execute(interaction) {
		const commandFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.js'));

		const commands = new Collection();

		for (const file of commandFiles) {
			const command = require(`./${file}`);
			commands.set(command.data.name, command.data.description);
			console.log(commands);
		}

		await interaction.reply({ content: 'List of commands:', flags: MessageFlags.Ephemeral });

		for (const command of commands) {
			await interaction.followUp({
				content: `# /${command[0]}\n${command[1]}`,
				flags: MessageFlags.Ephemeral,
			});
		}
	},
};