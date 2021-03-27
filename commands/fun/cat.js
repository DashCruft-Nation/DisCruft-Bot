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
	// Snowflake API for the cat images
	fetch('https://api.snowflakedev.xyz/api/cat', {
		headers: {
			// Change this API key pls
			'Authorization': '',
		},
	})
		.then(res => res.buffer())
		.then(data => {
			message.reply({ files: [new Discord.MessageAttachment(data, 'cat.png')], allowedMentions: { repliedUser: false } });
		})
		.catch(e => console.error(e));
};

module.exports.config = {
	name: 'cat',
	aliases: [],
	description: 'Cat images',
};