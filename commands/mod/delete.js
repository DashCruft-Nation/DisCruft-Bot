/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed } = require('discord.js');
/**
 * JSDOC
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */
module.exports.run = async (client, message, args) => {
	if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.reply('I don\'t have permission to delete channels to gimme right now', { allowedMentions: { repliedUser: false } });
	if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('You do not have permissions to use this command!');
	message.reply('Are you sure you want to delete this channel? Confirm by typing `Yes`!', { allowedMentions: { repliedUser: false } });
	const collector = message.channel.awaitMessages(user => user.author.id === message.author.id, { max: 1 }).then((msgs) => {
		if (msgs.first().content.toLowerCase() === 'yes') {
			message.channel.delete();
		}
		else {
			return msgs.first().reply('Cancelled!', { allowedMentions: { repliedUser: false } });
		}
	});
};

module.exports.config = {
	name: 'delete',
	aliases: [],
	description: 'Use the command to delete channels go to the channel you want to delete and sinply type ***?delete***',
};
