/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const { Client, Message } = require('discord.js');
const fetch = require('node-fetch').default;
/**
 * JSDOC
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */
module.exports.run = async (client, message, args) => {
	// Monkedev api for the cat facts because cats are the best animal
	fetch('https://api.monkedev.com/facts/cat?key=kPESu2IOtzHFt3AsBOnRfTRZu')
		.then(response => response.json())
		.then(data => {
			message.reply(data.fact, { allowedMentions: { repliedUser: false } });
		});
};

module.exports.config = {
	name: 'catfact',
	aliases: [],
	description: 'Cat facts for you to know about!',
};
