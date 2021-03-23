/* eslint-disable no-unused-vars */
const fetch = require('node-fetch').default;
const { Client, Message } = require('discord.js');
/**
 * JSDOC
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */
module.exports.run = async (client, message, args) => {
	let [query, branch] = args;

	if (!query) return message.reply('No results!');
	if (!branch) branch = 'master';

	fetch(`https://djsdocs.sorta.moe/v2/embed?src=${branch}&q=${encodeURIComponent(query)}`)
		.then(res => res.json())
		.then(json => {
			if (!json) return message.channel.send('Not found!');

			message.channel.send({ embed: json });
		})
		.catch(() => {
			message.channel.send('Couldn\'t fetch docs!');
		});
};

module.exports.config = {
	name: 'docs',
	aliases: ['djs'],
};