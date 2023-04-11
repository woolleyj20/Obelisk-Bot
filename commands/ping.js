const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { cards } = require('../hero-cards.json');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('card')
		.setDescription('Find a card/equipment by name')
		.addStringOption(option =>
			option.setName('card_name')
				.setDescription('The card to fetch')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('version')
				.setDescription('The version of the card')
				.setRequired(true)
				.addChoices(
					{ name: 'Base', value: 'base' },
					{ name: 'Blue', value: 'blue' },
					{ name: 'Yellow', value: 'yellow' },
					{ name: 'Corrupted', value: 'corrupted' },
				)),
	async execute(interaction) {
		const exampleEmbed = buildResponse(interaction.options.getString('card_name'), interaction.options.getString('version'));

		await interaction.reply({ embeds: [exampleEmbed] });
	},
};

function buildResponse(name, type) {
	const card = cards.find(element => element.name == name);
	if (typeof card !== 'undefined') {
		const cardName = card.name;
		let vanish = false;
		if (typeof card.versions[type].vanish !== 'undefined') {
			vanish = true;
		}

		let innate = false;
		if (typeof card.versions[type].innate !== 'undefined') {
			innate = true;
		}

		// const url = card.url ?? 'https://st.depositphotos.com/1106005/3146/i/450/depositphotos_31468817-stock-photo-coming-soon-sign.jpg';

		return new EmbedBuilder()
			.setTitle(cardName)
			.addFields(
				{ name: `${capitalizeFirstLetter(type)} Information`, value: ' ' },
			)
			.addFields(
				{ name: 'Description', value: descriptionReturn(card['versions'][type]['description']), inline: true },
				{ name: 'Target', value: card.versions[type].target, inline: true },
				{ name: 'Cost', value: String(card.versions[type].cost), inline: true },
			)
			.addFields(
				{ name: 'Card Types', value: card.cardTypes.join('\n'), inline: true },
				{ name: 'Vanish', value: capitalizeFirstLetter(String(vanish)), inline: true },
				{ name: 'Innate', value: capitalizeFirstLetter(String(innate)), inline: true },
			);

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

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}