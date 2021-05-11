/* eslint-disable no-unused-vars */
const {
	Client,
	Message,
	MessageEmbed,
} = require('discord.js');
/**
 * JSDOC
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */
module.exports.run = async (client, message, args) => {
	if (!message.guild.me.hasPermission('KICK_MEMBERS')) {
		return message.reply('I don\'t have permission to kick members!', {
			allowedMentions: {
				repliedUser: false,
			},
		});
	}
	if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply('You do not have permission to kick members!', { allowedMentions: { repliedUser: false } });
	const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
	const reason = args.slice(1).join(' ') || 'No reason provided!';
	if (!member) return message.reply('Please provide a member to kick!', { allowedMentions: { repliedUser: false } });
	if(member.id === message.author.id) return message.reply('You can\'t kick yourself!', { allowedMentions: { repliedUser: false } });
	if(!member.bannable) return message.reply('Cannot kick that user!', { allowedMentions: { repliedUser: false } });
	member.kick(reason + `\nKicked by: ${message.author.tag} | ${message.author.id}`).then(mem => {
		message.reply(`Kicked **${mem.user.tag}** from the server successfully!\nAction done by ${message.author.toString()}`, { allowedMentions: { repliedUser: false } });
	});
};

module.exports.config = {
	name: 'kick',
	aliases: [],
	description: 'Kicks a member! Do it if you think someone is kickable!!',
};
