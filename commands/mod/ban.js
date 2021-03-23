/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed } = require('discord.js');
/**
 * JSDOC
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */
module.exports.run = async (client, message, args) => {
	if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.reply('I don\'t have permission to ban members!', { allowedMentions: { repliedUser: false } });
	if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply('You don\'t have permission to ban members!', { allowedMentions: { repliedUser: false } });
	if (!args[0]) return message.reply('Provide someone to ban!', { allowedMentions: { repliedUser: false } });
	let check = false;
	const target = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(e => {
		check = true;
		return message.reply('Can\'t find specefied member! Provide a valid id', { allowedMentions: { repliedUser: false } });
	});
	if (check) return;
	const reason = args.slice(1).join(' ');
	if (!target.bannable) return message.reply('Can\'t ban specified member! Make sure I\'m above them in the heirarchy', { allowedMentions: { repliedUser: false } });
	const confirmationEmbed = new MessageEmbed()
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
		.setTitle(`Are you sure you want to ban ${target.user.tag} for reason - ${reason}?`);
	const mes = await message.reply({ embed: confirmationEmbed, allowedMentions: { repliedUser: false } });
	await mes.react('✔️');
	await mes.react('✖️');

	const filter = (reaction, user) => {
		return (reaction.emoji.name === '✔️' || reaction.emoji.name === '✖️') && user.id === message.author.id;
	};
	const collector = mes.createReactionCollector(filter, { max: 1, time: 1000 * 30 });
	collector.on('end', async collected => {
		if (collected.first().emoji.name === '✔️') {
			await target.ban({ reason: reason });
			const banEmbed = new MessageEmbed()
				.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
				.setTitle(`Banned ${target.user.tag}! Reason - ${reason}`);
			await mes.edit(banEmbed);
			await mes.reactions.removeAll();
		}
		else {
			const cancelEmbed = new MessageEmbed()
				.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
				.setTitle(`Cancelled banning ${target.user.tag}!`);
			await mes.edit(cancelEmbed);
			await mes.reactions.removeAll();
		}
	});
};

module.exports.config = {
	name: 'ban',
	aliases: ['bam'],
	description: 'Bans a member! Do it if you think someone is bannable!!',
};
