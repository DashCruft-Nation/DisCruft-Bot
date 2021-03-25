/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
/**
 * JSDOC
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {String} args
 */
module.exports.run = async (client, message, args) => {
	if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('You are not allowed to unban members!');
	if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send('I am not allowed to unban members!');
	if (!args[0]) return message.reply('Please provide a user id to unban!', { allowedMentions: { repliedUser: false } });
	
	const matchRegex = /[0-9]{16,19}/i;
	if (!matchRegex.test(args[0])) {
		return message.reply("Invalid user ID.", { allowedMentions: { repliedUser: false } });
	}
	
	try {
		await message.guild.members.unban(args[0]);
	}
	catch (err) {
		return message.reply('Invalid user/isn\'t banned!', { allowedMentions: { repliedUser: false } });
	}
	
	const unbanned = client.users.cache.get(args[0]);
	message.reply(`${unbanned.username} is now unbanned!`, { allowedMentions: { repliedUser: false } });
};
module.exports.config = {
	name: 'unban',
	desc: 'Unbans a user in your server!',
	aliases: [],
};
