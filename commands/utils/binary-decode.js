/* eslint-disable no-unused-vars */
const fetch = require('node-fetch').default;
const Discord = require('discord.js');
const {
	MessageEmbed
} = require('discord.js');
module.exports.run = async (client, message, args) => {
	if (!args[0]) return message.channel.send('Please give me some binary!');
	const {
		text
	} = await (await fetch(`https://some-random-api.ml/binary?decode=${encodeURI(args[0])}`)).json();

	return message.channel.send(new MessageEmbed()
		.setTitle('Here is your decoded binary!')
		.setDescription(`**Output:**\n${text}`)
	);
};

module.exports.config = {
	name: 'binary-decode',
	aliases: [],
	description: 'Decodes binary.',
};