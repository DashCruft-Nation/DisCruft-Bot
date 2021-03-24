const Discord = require('discord.js');
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

	const queue = await client.distube.getQueue(message);

	if (!queue) {
		await message.member.voice.channel.leave();
		client.distube.stop(message);
		await message.reply('🛑 **Stopped the music!**', {
			allowedMentions: {
				repliedUser: false,
			},
		});
	}
	else if (queue) {
		client.distube.stop(message);
		await message.reply('🛑 **Stopped the music!**', {
			allowedMentions: {
				repliedUser: false,
			},
		});
	}
};

module.exports.config = {
	name: 'stop',
	aliases: ['leave'],
	description: 'stops a current playing music!',
};