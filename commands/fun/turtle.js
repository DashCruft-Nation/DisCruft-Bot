/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const Canvas = require('canvas');
module.exports.run = async (client, message, args) => {
	const member = message.mentions.members.first() || message.member;
	const canvas = Canvas.createCanvas(867, 892);
	const ctx = canvas.getContext('2d');
	const background = await Canvas.loadImage('https://cdn.discordapp.com/avatars/235148962103951360/cececd50fdc87b29929e65c768f24ad6.png');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 60, 320, 225, 225);
	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `turtle_${member.user.username}.jpg`);
	message.reply({ files: [attachment], allowedMentions: { repliedUser: false } });
};

module.exports.config = {
	name: 'turtle',
	aliases: ['carl'],
	description: 'Makes you a turtle, as simple as that',
};
