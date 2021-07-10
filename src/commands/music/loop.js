/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
/**
 * JSDOC
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {String[]} args
 */
module.exports.run = async (client, message, args) => {
	if (!message.guild.me.voice.channel) {
		return message.reply('There isn\'t any music being played right now!', {
			allowedMentions: {
				repliedUser: false,
			},
		});
	}
	if (!message.member.voice.channel) {
		return message.reply('You must be in a voice channel to use this command.', {
			allowedMentions: {
				repliedUser: false,
			},
		});
	}
	if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
		return message.reply(`You must be in \`${message.guild.me.voice.channel.name}\` to use this command`, {
			allowedMentions: {
				repliedUser: false,
			},
		});
	}

	const queue = client.queue.get(message.guild.id);

	if(!queue.songs) return message.reply('There isnt any queue!', { allowedMentions: { repliedUser: false } });
	if(!queue.songs[0]) return message.reply('There isnt any queue!', { allowedMentions: { repliedUser: false } });

	queue.loop = true;
	message.reply(`${queue.loop ? 'Started' : 'Stopped'} looping the current song!`, { allowedMentions: { repliedUser: false } });
};
module.exports.config = {
	name: 'loop',
	desc: 'Loops the current song!',
	aliases: [],
};