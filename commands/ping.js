const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const cardMap = new Map();
cardMap.set('correct', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvrrU9hRt6mtgUqYoYpm2jv5NUAI5J6OEEJFkhe6rWk_Wo6XzEFSeHmeCcFg1nGAMTIl4&usqp=CAU');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!')
		.addStringOption(option =>
			option.setName('card_name')
				.setDescription('The card to fetch')
				.setRequired(true)),
	async execute(interaction) {
		const exampleEmbed = buildResponse(interaction.options.getString('card_name'));

		await interaction.reply({ embeds: [exampleEmbed] });
	},
};

function buildResponse(name) {
	if (cardMap.has(name)) {
		const url = cardMap.get(name);
		return new EmbedBuilder()
			.setTitle(name)
			.setImage(url);
	}
	else {
		return new EmbedBuilder()
			.setDescription('A card by this name does not exist');
	}
}