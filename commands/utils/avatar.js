/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
	const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;

	const embed = new Discord.MessageEmbed()
		.setTitle(`${user.tag}'s avatar!`)
		.setColor('#e4101f')
		.setImage(user.displayAvatarURL({ size: 4096, dynamic: true }));
	message.channel.send(embed);

};
module.exports.config = {
	name: 'avatar',
	aliases: ['av'],
};
