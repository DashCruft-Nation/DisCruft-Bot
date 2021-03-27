/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
/**
 * JSDOC
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {String} args
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
		message.reply('Do you want to keep the queue?');
		message.channel.awaitMessages(user => user.author.id === message.author.id, { max: 1 }).then((msg) => {
			if (msg.first().content.toLowerCase() === 'yes') {
				msg.first().member.voice.channel.leave();
				msg.first().reply('Stopped the music and left the channel!', {
					allowedMentions: {
						repliedUser: false,
					},
				});
			}
			else if (msg.first().content.toLowerCase() === 'no') {
				client.queue.delete(message.guild.id);
				msg.first().guild.me.voice.channel.leave();
				msg.first().reply('Stopped the music and deleted the queue!', {
					allowedMentions: {
						repliedUser: false,
					},
				});
			}
			else {
				msg.first().reply('Please provide a valid option! Either `yes` or `no`(in case-sensitive!)', {
					allowedMentions: {
						repliedUser: false,
					},
				});
			}
		});
	}
};

module.exports.config = {
	name: 'stop',
	aliases: ['leave'],
	description: 'stops a current playing music!',
};