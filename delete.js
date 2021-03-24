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
  	if (message.member.hasPermission("MANAGE_CHANNELS")) {
message.channel.delete();
	} else
	{
		messege.channel.send("Bruh no perrmission")
	}
};

module.exports.config = {
	name: 'delete',
	aliases: ['nukes channels'],
	description: 'Use the command to delete channels go to the channel you want to delete and sinply type ***?delete***',
};
