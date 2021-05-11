/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const fs = require('fs');
/**
 * JSDOC
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {String[]} args
 */
module.exports.run = async (client, message, args) => {
	if(!message.member.hasPermission('MANAGE_GUILD')) return message.reply('You do not have permissions to use this command!', { allowedMentions: { repliedUser: false } });
	if (args[0] !== 'force') {
		const registerData = client.slashcommands.map((cmd) => cmd.config.registerData);
		const guildCmds = (await client.api.applications(client.user.id).guilds(message.guild.id).commands.get()).map(x => x.name);
		try {
			registerData.filter(x => !guildCmds.includes(x.name)).forEach(data => {
				client.api.applications(client.user.id).guilds(message.guild.id).commands.post(data);
			});
		}
		catch (err) {
			console.log(err);
			return message.reply('Unable to register all commands! Make sure I am invited with the `applications.commands` scope!');
		}
		message.reply('Added slash commands! If there is any issues try using `<prefix>register force` if that does not work contact the developers!', { allowedMentions: { repliedUser: false } });
	}
	else if(args[0] === 'force') {
		const registerData = client.slashcommands.map((cmd) => cmd.config.registerData);
		try {
			registerData.forEach(data => {
				client.api.applications(client.user.id).guilds(message.guild.id).commands.post(data);
			});
		}
		catch (err) {
			return message.reply('Unable to register all commands! Make sure I am invited with the `applications.commands` scope!');
		}
		message.reply('Added slash commands! If there is still any issues try using `<prefix>register force` if that does not work contact the developers!', { allowedMentions: { repliedUser: false } });
	}
};
module.exports.config = {
	name: 'register',
	desc: 'Registers slash commands in your server!',
	aliases: [],
};