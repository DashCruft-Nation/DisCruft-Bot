/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
	const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;

	const embed = new Discord.MessageEmbed()
		.setTitle(`${target.user.username}'s avatar!`)
		.setColor('RANDOM')
		.setImage(target.user.displayAvatarURL({ size: 1024, dynamic: true }));
	message.reply({ embed: embed, allowedMentions: { repliedUser: false } });
};
module.exports.config = {
	name: 'avatar',
	aliases: ['av'],
	description: 'Sends the avatar of the user mentioned!',
};
