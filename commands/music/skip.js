/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
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

	if (queue) {
		if(!queue.songs[0]) return message.reply('There isnt any queue!', { allowedMentions: { repliedUser: false } });
		const skipped = queue.songs.shift();
		play(queue.songs[0], message.guild.me.voice.channel);
		message.reply(`Skipped **\`${skipped.title}\`** requested by **${skipped.requestedBy.tag}**!`, { allowedMentions: { repliedUser: false } });
	}
	else {
		return message.reply('There isnt any queue!', {
			allowedMentions: {
				repliedUser: false,
			},
		});
	}
};

module.exports.config = {
	name: 'skip',
	aliases: [],
	description: 'skips to the next music in queue if any!',
};

async function play(song, voicechannel) {
	const queue = voicechannel.client.queue.get(voicechannel.guild.id);
	if (voicechannel.members.size === 0) {
		queue.textchannel.send('Stopped the music due to empty voice channel! The queue is not deleted');
	}
	if (!voicechannel.guild.me.voice.channel) {
		await queue.voicechannel.join();
	}
	if (!song) {
		voicechannel.client.queue.delete(voicechannel.guild.id);
		return voicechannel.leave();
	}
	const stream = ytdl(song.url, { filter: 'audioonly' });
	queue.connection.play(stream, { seek: 0, volume: 0.5 })
		.on('finish', () => {
			const played = queue.songs.shift();
			if (queue.loop) queue.songs.push(played);
			play(queue.songs[0], voicechannel);
		});
	const playembed = new Discord.MessageEmbed()
		.setTitle('Started playing!')
		.setDescription(queue.songs[0].title)
		.addFields(
			{ name: 'URL', value: `[${queue.songs[0].title}](${queue.songs[0].url})`, inline: true },
			{ name: 'Type', value: queue.songs[0].type, inline: true },
			{ name: 'Video duration', value: `${queue.songs[0].duration}`, inline: true },
			{ name: 'Song added by', value: `${song.requestedBy.toString()}`, inline: true },
			{ name: 'Song By', value: `${queue.songs[0].artist}`, inline: true },
			{ name: 'Album', value: `${queue.songs[0].album}`, inline: true },
		)
		.setColor('RANDOM')
		.setFooter(`Uploaded ${queue.songs[0].uploaded} | ${queue.songs[0].views.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')} Views`, voicechannel.client.emojis.cache.get('820228323555803146').url)
		.setThumbnail(queue.songs[0].thumbnail);
	queue.textchannel.send(playembed);
}
