/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed } = require('discord.js');
/**
 * JSDOC
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */
module.exports.run = async (client, message, args) => {
	if(!args[0]) {
		const embed = new MessageEmbed()
			.setTitle('Your PP size!')
			.addField(`**${pepeSize()}**`, 'Pretty smol pp')
			.setThumbnail(message.author.displayAvatarURL())
			.setTimestamp()
			.setColor('RANDOM');
		message.channel.send(embed);
	}
	else {
		const target = message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find(m => m.user.username.toLowerCase() === args[0].toLowerCase()) ||
        message.guild.members.cache.find(m => m.nickname.toLowerCase() === args[0].toLowerCase()) ||
        message.guild.member(await client.users.fetch(args[0]));
		const embed = new MessageEmbed()
			.setTitle(`PP size for ${target.user.tag}`)
			.addField(`**${pepeSize()}**`, 'Pretty smol pp')
			.setThumbnail(target.user.displayAvatarURL())
			.setTimestamp()
			.setColor('RANDOM');
		message.channel.send(embed);
	}

};
module.exports.config = {
	name: 'ppsize',
	aliases: ['pp'],
};


function pepeSize() {
	const random = Math.floor(Math.random() * 13) + 1;
	const randomEqualSigns = '='.repeat(random);
	const pepesize = `8${randomEqualSigns}>`;

	return pepesize;
}
