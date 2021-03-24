const Discord = require('discord.js');
/**
 * JSDOC
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {String} args
 * @returns
 */
module.exports.run = async (client, message, args) => {
	if (!message.member.voice.channel) {
		return message.reply('You must be in a voice channel to use this command.', {
			allowedMentions: {
				repliedUser: true,
			},
		});
	}
	if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
		return message.reply(`You must be in \`${message.guild.me.voice.channel.name}\` to use this command`, {
			allowedMentions: {
				repliedUser: true,
			},
		});
	}

	const queue = client.queue.get(message.guild.id);

	if (!queue || queue.songs.length === 1) return message.channel.send('> :notes: **Nothing is in queue!**');

	const embed = new Discord.MessageEmbed()
		.setTitle(`🎶 **Current Queue** | ${queue.songs.length - 1} entries`)
		.setDescription(`${(queue.songs.slice(1, 11).map((song, i) => {
			return `${`\`${i + 1}\``} | \`(${i})\` **${song.title}** - ${song.requestedBy.toString()}`;
		}).join('\n'))}`);
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