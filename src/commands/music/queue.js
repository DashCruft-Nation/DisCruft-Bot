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

	const embed = new Discord.MessageEmbed()
		.setTitle(`🎶 **Current Queue** | ${queue.songs.length - 1} entries`)
		.setDescription(`Playing songs in ${queue.voicechannel} linked to ${queue.textchannel}!`)
		.addFields(
			{ name: 'Queued songs', value: `${(queue.songs.slice(1, 11).map((song, i) => {
				return `${`\`${i + 1}\``} | **${song.title}** - ${song.requestedBy.toString()} \`${song.duration}\``;
			}).join('\n'))}` },
			{ name: 'Now playing', value: `Title: **${queue.songs[0].title}** \nRequested By: *${queue.songs[0].requestedBy.toString()}*` },
		)
		.setColor(require('../../config.json').mainColor);
	message.reply({
		embed: embed,
		allowedMentions: {
			repliedUser: false,
		},
	});
};

module.exports.config = {
	name: 'queue',
	aliases: ['q', 'list'],
	description: 'Shows the music queue of your server if any!',
};