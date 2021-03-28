/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed } = require('discord.js');
const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
/**
 * JSDOC
 * @param {Client} client
 * @param {Message} message
 */
module.exports = async (client, message) => {
	if (message.author.bot || message.channel.type === 'dm') return;

	const mentionembed = new MessageEmbed()
		.setTitle('DisCruft bot info!')
		.setDescription(`My prefix for ${message.guild.name} is \`?\`! Use \`?help\` for info about my commands! You can also use mention as my prefix now!`)
		.setColor(require('../config.json').mainColor)
		.setThumbnail(client.user.displayAvatarURL())
		.setFooter(client.user.tag, client.user.displayAvatarURL())
		.setAuthor(message.author.tag, message.author.displayAvatarURL());
	if (message.content === `<@!${client.user.id}>`) message.reply({ embed: mentionembed, allowedMentions: { repliedUser: false } });

	const messageArray = message.content.split(' ');
	let cmd = messageArray[0];
	let args = messageArray.slice(1);

	const prefix = '?';

	const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
	if (!prefixRegex.test(messageArray)) return;
	const [, matchedPrefix] = message.content.match(prefixRegex);

	if(cmd.slice(matchedPrefix.length) != prefix && matchedPrefix.includes(client.user.id)) {
		cmd = args[0];
		args = args.slice(1);
		commandfile = client.commands.get(cmd.toLowerCase()) || client.commands.get(client.aliases.get(cmd.toLowerCase()));
	}
	else {
		commandfile = client.commands.get(cmd.slice(matchedPrefix.length).toString().toLowerCase()) || client.commands.get(client.aliases.get(cmd.slice(matchedPrefix.length).toString().toLowerCase()));
	}
	if (commandfile) {
		try{
			await commandfile.run(client, message, args);
		}
		catch(err) {
			message.reply(`An error occured!\nError: ${err}`, {
				allowedMentions: {
					repliedUser: false,
				},
			});
		}
	}
};
