const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { cards } = require('../hero-cards.json');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('card')
		.setDescription('Find a card/equipment by name')
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
	const card = cards.find(element => element.name == name);
	if (typeof card !== 'undefined') {
		const cardName = card.name;
		const baseDescription = descriptionReturn(card.versions.base.description);
		const blueDescription = descriptionReturn(card.versions.blue.description);
		const yellowDescription = descriptionReturn(card.versions.yellow.description);
		const corruptedDescription = descriptionReturn(card.versions.corrupted.description);

		const url = card.url ?? 'https://st.depositphotos.com/1106005/3146/i/450/depositphotos_31468817-stock-photo-coming-soon-sign.jpg';
		return new EmbedBuilder()
			.setTitle(cardName)
			.addFields(
				{ name: 'Base Information', value: ' ' },
			)
			.addFields(
				{ name: 'Description', value: baseDescription, inline: true },
				{ name: 'Target', value: card.versions.base.target, inline: true },
				{ name: 'Cost', value: String(card.versions.base.cost), inline: true },
			)
			.setImage(url);
	}
	else {
		return new EmbedBuilder()
			.setDescription('A card by this name could not be found :slight_frown:');
	}
}

function descriptionReturn(description) {
	if (description == '') {
		return 'Description missing, coming soon!';
	}
	else {
		return description;
	}
}