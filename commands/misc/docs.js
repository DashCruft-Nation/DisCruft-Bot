/* eslint-disable prefer-const */
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

	if (!query) return message.reply('No results!', { allowedMentions: { repliedUser: false } });
	if (!branch) branch = 'master';

	fetch(`https://djsdocs.sorta.moe/v2/embed?src=${branch}&q=${encodeURIComponent(query)}`)
		.then(res => res.json())
		.then(json => {
			if (!json) return message.reply('Not found!', { allowedMentions: { repliedUser: false } });

			message.reply({ embed: json, allowedMentions: { repliedUser: false } });
		})
		.catch(() => {
			message.reply('Couldn\'t fetch docs!', { allowedMentions: { repliedUser: false } });
		});
};

module.exports.config = {
	name: 'docs',
	aliases: ['djsdocs'],
	description: 'Searches up discord.js documentation!',
};