/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const axios = require('axios');
const { Client, Message } = require("discord.js");
/**
 * JSDOC
 * @param {Client} client 
 * @param {Message} message 
 * @param {String[]} args
 */
module.exports.run = async (client, message, args) => {
	// nuggetapi pog :LMFAO:
	axios.get('https://api.nuggetdev.com/api/meme')
		.then(function(response) {
			const embed = new Discord.MessageEmbed()
				.setTitle(`${response.data.title}`)
				.setURL(`${response.data.url}`)
				.setImage(response.data.image)
				.setColor('RANDOM')
				.setFooter(`👍 ${response.data.upvotes} 👎 ${response.data.downvotes} 💬 ${response.data.comments}`);
			message.channel.send(embed);
		});
};

module.exports.config = {
	name: 'meme',
	aliases: [],
};
