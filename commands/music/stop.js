/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
/**
 * JSDOC
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {String[]} args
 * @returns
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

	if (!queue) {
		message.member.voice.channel.leave();
		message.reply('A queue was not found! But bot was in voice channel, I have left the voice channel successfully!', { allowedMentions: { repliedUser: false } });
	}
	else if (queue) {
		const mes = await message.reply('Do you want to keep the queue?', { allowedMentions: { repliedUser: false } });
		await mes.react('✔️');
		await mes.react('✖️');
		const filter = (reaction, user) => {
			return (reaction.emoji.name === '✔️' || reaction.emoji.name === '✖️') && user.id === message.author.id;
		};
		mes.createReactionCollector(filter, { max: 1 }).on('end', collceted => {
			if (collceted.first().emoji.name === '✔️') {
				message.member.voice.channel.leave();
				message.reply('Stopped the music and saved the queue!', { allowedMentions: { repliedUser: false } });
			}
			else {
				client.queue.delete(message.guild.id);
				message.member.voice.channel.leave();
				message.reply('Stopped the music and deleted the queue!', { allowedMentions: { repliedUser: false } });
			}
		});
	}
};

module.exports.config = {
	name: 'stop',
	aliases: ['leave'],
	description: 'stops a current playing music!',
};
