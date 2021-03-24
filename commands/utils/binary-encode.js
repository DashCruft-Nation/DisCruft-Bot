/* eslint-disable no-unused-vars */
const fetch = require('node-fetch').default;
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
module.exports.run = async (client, message, args) => {
	if (!args[0]) return message.channel.send('Please Give Content!');
	const { binary } = await (
		await fetch(
			`https://some-random-api.ml/binary?text=${encodeURI(args.join(' '))}`,
		)
	).json();
	const embed = new MessageEmbed()
		.setTitle('Here is your encoded binary!')
		.setDescription(`**Output:**\n${binary}`)
		.setColor('RANDOM');
	return message.reply({ embed: embed, allowedMentions: { repliedUser: false } });
};
module.exports.config = {
	name: 'binary-encode',
	aliases: [],
	description: 'Sends your text into binary',
};
