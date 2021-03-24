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

	if(queue) {
		client.distube.skip(message);
		await message.react('👍');
	}
};

module.exports.config = {
	name: 'skip',
	aliases: [],
	description: 'skips to the next music in queue if any!',
};