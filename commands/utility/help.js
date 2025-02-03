const fs = require('node:fs');
const { Collection, MessageFlags, SlashCommandBuilder } = require('discord.js');
const HORIZONTAL_SPACE = 15;

module.exports = {
	data: new SlashCommandBuilder().setName('help').setDescription('Gets a list of commands and what they do.'),

	async execute(interaction) {
		const commandFiles = fs.readdirSync(__dirname).filter((file) => file.endsWith('.js'));

		const commands = new Collection();

		for (const file of commandFiles) {
			const command = require(`./${file}`);
			commands.set(command.data.name, command.data.description);
		}

		let msg = '# List of commands: ';

		for (const command of commands) {
			// Make a spaces to pad the name so descriptions are aligned
			let tab = '';
			for (let i = 0; i < HORIZONTAL_SPACE - String(command[0]).length; i++) {
				tab = tab + ' ';
			}
			// Combine the messages
			msg = msg.concat(`\n \`/${command[0]}`);
			msg = msg.concat(tab);
			msg = msg.concat(`${command[1]}\``);
		}

		await interaction.reply({ content: msg, flags: MessageFlags.Ephemeral });
	},
};
