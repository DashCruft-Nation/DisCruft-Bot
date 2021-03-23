/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const axios = require('axios');
const { Client, Message } = require('discord.js');
/**
 * JSDOC
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */
module.exports.run = async (client, message, args) => {
	axios.get('https://api.nuggetdev.com/api/meme')
		.then((res) => {
			const embed = new Discord.MessageEmbed()
				.setTitle(`${res.data.title}`)
				.setURL(`${res.data.url}`)
				.setImage(res.data.image)
				.setColor('RANDOM')
				.setFooter(`👍 ${res.data.upvotes} 💬 ${res.data.comments}`);
			message.reply({
				embed,
				allowedMentions: { repliedUser: false },
			});
		});
};

module.exports.config = {
	name: 'meme',
	aliases: [],
};
