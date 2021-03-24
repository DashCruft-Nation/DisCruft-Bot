/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const fetch = require('node-fetch').default;
module.exports.run = async (client, message, args) => {
	const member = message.mentions.members.first() || message.member;
    const buffer = await (await fetch('https://api.monkedev.com/canvas/gay?imgUrl=' + encodeURIComponent(member.user.displayAvatarURL({ size: 1024, format: 'jpg' })))).buffer();
	const attachment = new Discord.MessageAttachment(buffer, `gay.jpg`);
	message.reply({ files: [attachment], allowedMentions: { repliedUser: false } });
};
module.exports.config = {
	name: 'gay',
	aliases: [],
	description: 'Description moment',
};