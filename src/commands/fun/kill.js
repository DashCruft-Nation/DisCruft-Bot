const canvacord = require('canvacord');
const { MessageAttachment } = require('discord.js');

module.exports.run = async (client, message, args) => {
	const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
	const triggered = await canvacord.Canvas.wasted(user.displayAvatarURL({ format: 'png', dynamic: false }));
	const attachment = new MessageAttachment(triggered, 'wasted.gif');
	return message.channel.send(attachment);
};

module.exports.config = {
	name: 'kill',
	aliases: ['wasted'],
	description: 'try it out and see',
};