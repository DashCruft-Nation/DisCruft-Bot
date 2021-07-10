/* eslint-disable no-unused-vars */
const { Client, Message, MessageAttachment } = require('discord.js');
const fetch = require('node-fetch').default;
/**
 * JSDOC
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */
module.exports.run = async (client, message, args) => {
	const msg = await message.reply('<a:loading:705952835476521073>', { allowedMentions: { repliedUser: false } });
	fetch('https://source.unsplash.com/collection/139386/200x200/?sig=')
		.then(res => res.buffer())
		.then(data => {
			msg.delete();
			const img = new MessageAttachment(data, 'cat.png');
			message.reply({ files: [img], allowedMentions: { repliedUser: false } });
		})
		.catch(e => console.error(e));
};

module.exports.config = {
	name: 'cat',
	aliases: [],
	description: 'Cat images',
};
