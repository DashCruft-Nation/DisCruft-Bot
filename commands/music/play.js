/* eslint-disable no-undef */
const Discord = require('discord.js');
const yt = require('yt-search');
const ytdl = require('ytdl-core');
/**
 * JSDOC
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {String} args
 * @returns
 */
module.exports.run = async (client, message, args) => {
	if (!message.member.voice.channel) return message.reply('You need to be a voice channel!', { allowedMentions: { repliedUser: false } });
	if (!message.guild.me.hasPermission('CONNECT')) return message.reply(`I don't have \`CONNECT\` permission to connect to \`${message.member.voice.channel.name}\``, { allowedMentions: { repliedUser: false } });
	if (!message.guild.me.permissionsIn(message.member.voice.channel).has('CONNECT')) return message.channel.send(`I don't have \`CONNECT\` permission to connect to \`${message.member.voice.channel.name}\``, { allowedMentions: { repliedUser: true } });
	let joiningmsg = null;
	if (ytdl.validateURL(args[0])) {
		message.reply('Use search query instead for now!', { allowedMentions: { repliedUser: false } });
	}
	else {
		const queue = client.queue.get(message.guild.id);
		const query = args.join(' ');
		if (!query) return message.reply('Please provide a query!', { allowedMentions: { repliedUser: false } });
		let result = await yt.search(query);
		if (!result.videos) return message.reply('Couldn\'t find any results!', { allowedMentions: { repliedUser: false } });
		result = result.videos[0];
		if (!result) return message.reply('Couldn\'t find any results!', { allowedMentions: { repliedUser: false } });

		if (!message.guild.me.voice.channel) {
			joiningmsg = await message.reply(`Joining ${message.member.voice.channel.toString()}!`, { allowedMentions: { repliedUser: false } });
			connection = await message.member.voice.channel.join();
		}
		else if (!queue) {
			message.member.voice.channel.leave();
			connection = await message.member.voice.channel.join();
		}

		const songInfo = await ytdl.getInfo(result.url);
		const artist = !songInfo.videoDetails.media.artist ? songInfo.videoDetails.author.name : songInfo.videoDetails.media.artist;
		const album = !songInfo.videoDetails.media.album ? 'NONE' : songInfo.videoDetails.media.album;
		const song = {
			title: Discord.Util.escapeMarkdown(result.title),
			views: String(result.views).padStart(10, ' '),
			url: result.url,
			type: result.type,
			uploaded: result.ago,
			duration: result.duration.timestamp,
			rawDuration: result.duration.seconds,
			thumbnail: result.thumbnail,
			requestedBy: message.author,
			artist: artist,
			album: album,
			skippedSec: 0,
		};
		if (!queue) {
			const basequeue = {
				voicechannel: message.member.voice.channel,
				textchannel: message.channel,
				connection: connection,
				playing: true,
				loop: false,
				songs: [],
			};
			basequeue.songs.push(song);
			client.queue.set(message.guild.id, basequeue);
			play(song, basequeue.voicechannel);
		}
		else if (queue) {
			queue.songs.push(song);
			const playembed = new Discord.MessageEmbed()
				.setTitle('Song added to queue!')
				.setDescription(result.title)
				.addFields(
					{ name: 'URL', value: `[${result.title}](${result.url})`, inline: true },
					{ name: 'Type', value: result.type, inline: true },
					{ name: 'Video duration', value: `${result.duration.timestamp}`, inline: true },
					{ name: 'Song added by', value: `${message.author.username}`, inline: true },
					{ name: 'Song By', value: `${result.author.name}`, inline: true },
					{ name: 'Album', value: `${album}`, inline: true },
				)
				.setColor('RANDOM')
				.setFooter(`Uploaded ${result.ago} | ${result.views.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')} Views`, client.emojis.cache.get('820228323555803146').url)
				.setThumbnail(result.thumbnail);
			message.reply({ embed: playembed, allowedMentions: { repliedUser: false } });
		}
		if (joiningmsg) joiningmsg.delete();
	}
};

module.exports.config = {
	name: 'play',
	aliases: ['p'],
	description: 'Plays music in your server!',
};
/**
 *
 * @param {Object} song
 * @param {Discord.VoiceChannel} voicechannel
 */
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