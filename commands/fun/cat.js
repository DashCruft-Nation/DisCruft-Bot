/* eslint-disable comma-dangle */
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
			'Authorization': 'YOUR_API_KEY' // Change this API key if you have premium
		}
	})
		.then(response => response.json())
		.then(data => {
			console.log(data); // Debug
			message.reply(data); // TODO: Reply with image (API returns image binary)
		});
};

module.exports.config = {
	name: 'cat',
	aliases: [],
	description: 'Cat images',
};
