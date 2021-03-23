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
	const toUnBan = client.users.cache.get(args[0].match(/[1234567890]{18}/igm)[0]) || await client.users.fetch(args[0], true, true);
	if (!toUnBan) return message.reply('You didnt provide a valid user!', { allowedMentions: { repliedUser: false } });
	try {
		(await message.guild.fetchBan(toUnBan));
	}
	catch (err) {
		return message.reply('The user isnt banned!', { allowedMentions: { repliedUser: false } });
	}
	message.guild.members.unban(toUnBan);
	message.reply(`${toUnBan.username} is now unbanned!`, { allowedMentions: { repliedUser: false } });
};
module.exports.config = {
	name: 'unban',
	desc: 'Unbans a user in your server!',
	aliases: [],
};
