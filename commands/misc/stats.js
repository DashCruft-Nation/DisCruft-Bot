/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const prettyMs = require('pretty-ms');
const _os = require('os-utils');
/**
 * JSDOC
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {String[]} args
 */
module.exports.run = async (client, message, args) => {
	const embed = new Discord.MessageEmbed()
		.addFields(
			{ name: 'Client Info 🤖', value: `\`\`\`yaml\nName: ${client.user.tag}\nDisplayName: ${message.guild.me.displayName}\nID: ${client.user.id}\nServers: ${client.guilds.cache.size}\nCachedChannels: ${client.channels.cache.size}\nCachedUsers: ${client.users.cache.size}\nUptime: ${prettyMs(client.uptime)}\`\`\`` },
			{ name: 'Vps Info 💻', value: `\`\`\`yaml\nPlatform: ${_os.platform()}\nCpuCores: ${_os.cpuCount()}\nCpuUsage: ${client.cpuusage}\nVpsRamUsage: ${Math.round(_os.totalmem() - _os.freemem())}/${Math.floor(_os.totalmem())} mb\`\`\`` },
		)
		.setColor(require('../../config.json').mainColor)
		.setDescription('DisCruft is an open-source discord bot capable of many things such as Moderation, Music, Fun commands and etc!! It\'s being developed by a very actively contributing community! You can check it\'s source-code on it\'s [GitHub](https://github.com/DashCruft-Nation/DisCruft-Bot) 😉')
		.setTitle('Bot Stats');
	message.reply({ embed: embed, allowedMentions: { repliedUser: false } });
};
module.exports.config = {
	name: 'stats',
	aliases: [],
	description: 'Shows the stats of the client!',
};
