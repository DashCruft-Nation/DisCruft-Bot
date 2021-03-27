/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const fetch = require('node-fetch').default;
/**
 * JSDOC
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {String[]} args
 */
module.exports.run = async (bot, message, args) => {
	fetch('https://api.monkedev.com/attachments/monkey?key=YiGNicedKYp9c15HbrKrUkMkG')
		.then(response => response.json())
		.then(data => {
			message.reply({
				embed: new Discord.MessageEmbed().setTitle('Here is your monkey image!').setImage(data.url).setFooter(message.author.tag, message.author.displayAvatarURL()).setColor('RANDOM'),
				allowedMentions: {
					repliedUser: false,
				},
			});
		})
		.catch(() => {
			message.reply('Couldn\'t fetch image!', { allowedMentions: { repliedUser: false } });
		});
};

module.exports.config = {
	name: 'monke',
	aliases: ['monkey'],
	description: 'Have a nice monkey picture!',
};