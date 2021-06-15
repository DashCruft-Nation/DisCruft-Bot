const Discord = require('discord.js');
const fetch = require('node-fetch').default;
module.exports.run = async (client, message, args) => {
	const member = message.mentions.users.first() || message.author;
const picture = member.user.displayAvatarURL({ size: 1024, format: 'jpg' })
	const buffer = await (await fetch('https://api.monkedev.com/canvas/petpet?imgUrl=' + encodeURIComponent(picture))).buffer();
	const attachment = new Discord.MessageAttachment(buffer, 'rainbow.gif');
	message.reply({ files: [attachment], allowedMentions: { repliedUser: false } });
};
module.exports.config = {
	name: 'pat',
	aliases: [],
	description: 'generates a pet pet gif',
};
