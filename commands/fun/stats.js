/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const prettyMs = require('pretty-ms');
module.exports.run = async (client, message, args) => {
	const msg = await message.reply('Loading...').then(m => m.delete(), 1000);
	const embed = new Discord.MessageEmbed()
		.setAuthor('DisCruft bot stats')
		.addField('__Cache__\n', `**Guilds**: ${client.guilds.cache.size} \n\n`, true)
		.addField('__Uptime__\n', `**Process**: ${prettyMs(process.uptime() * 1000)}`, true)
		.addField('__Movement__\n', `**API Latency**: ${Math.round(client.ws.ping)}\n**Bot Latency**: ${msg.createdTimestamp - message.createdTimestamp}ms`, true);
	message.reply({ embed: embed, allowedMentions: { repliedUser: false } });
};
module.exports.config = {
	name: 'stats',
	aliases: [],
	description: 'Shows the stats of the bot!',
};
