/* eslint-disable no-unused-vars */
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
	const dice = Math.floor(Math.random() * 6) + 1
		- 1 + 1;

	const diceembed = new Discord.MessageEmbed()
		.setAuthor(message.member.user.tag)
		.setColor('RANDOM')
		.setTimestamp()
		.setDescription(`You got a **${dice}**`);
	message.reply({ embed: diceembed });
};

module.exports.config = {
	name: 'dice',
	aliases: ['diceroll'],
	description: 'Rolls dice',
};
