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

	if(!queue) return message.reply('There isnt any queue!', { allowedMentions: { repliedUser: false } });
	if(!queue.songs[0]) return message.reply('There isnt any queue!', { allowedMentions: { repliedUser: false } });

	const songplaying = queue.songs[0];

	const embed = new Discord.MessageEmbed()
		.setTitle('Now playing!')
		.setDescription(songplaying.title)
		.addFields(
			{ name: 'URL', value: `[${songplaying.title}](${songplaying.url})`, inline: true },
			{ name: 'Type', value: songplaying.type, inline: true },
			{ name: 'Video duration', value: `${songplaying.duration}`, inline: true },
			{ name: 'Song added by', value: `${songplaying.requestedBy.toString()}`, inline: true },
			{ name: 'Song By', value: `${songplaying.artist}`, inline: true },
			{ name: 'Album', value: `${songplaying.album}`, inline: true },
		)
		.setThumbnail(songplaying.thumbnail)
		.setColor(require('../../config.json').mainColor)
		.setFooter(message.author.tag, message.author.displayAvatarURL());
	message.reply({
		embed: embed,
		allowedMentions: {
			repliedUser: false,
		},
	});
};
module.exports.config = {
	name: 'nowplaying',
	desc: 'Shows info about the current playing song',
	aliases: ['np'],
};