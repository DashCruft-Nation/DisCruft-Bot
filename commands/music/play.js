const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
	if (!message.member.voice.channel) {
		return message.reply('You must be in a voice channel to use this command.', {
			allowedMentions: {
				repliedUser: true,
			},
		});
	}
	if (!message.guild.me.hasPermission('CONNECT')) {
		return message.channel.send(`I don't have \`CONNECT\` permission to connect to \`${message.member.voice.channel.name}\``, {
			allowedMentions: {
				repliedUser: true,
			},
		});
	}
	if (!message.guild.me.permissionsIn(message.member.voice.channel).has('CONNECT')) {
		return message.channel.send(`I don't have \`CONNECT\` permission to connect to \`${message.member.voice.channel.name}\``, {
			allowedMentions: {
				repliedUser: true,
			},
		});
	}

	const music = args.join(' ');

	if (!music) {
		return message.reply('I need a music to play!', {
			allowedMentions: {
				repliedUser: false,
			},
		});
	}

	await client.distube.play(message, music);
};

module.exports.config = {
	name: 'play',
	aliases: ['p'],
	description: 'plays a music!',
};