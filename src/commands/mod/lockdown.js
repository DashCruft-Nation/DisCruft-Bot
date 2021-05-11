/* eslint-disable no-inline-comments */
/* eslint-disable no-unused-vars */

/* Any database expert can check this code I cannot complete the database part sadly */

const Discord = require('discord.js');
const schema = require('../../database/models/Guilds');
/**
 *
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {String[]} args
 * @returns
 */

module.exports.run = async (client, message, args) => {
	if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('You do not have permissions to use this command!');
	if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send('Unable to lock the channels! Missing permissions');
	if (!args[0]) return message.reply('There is two options `true` to lockdown the server, `false` to remove the lockdown', { allowedMentions: { repliedUser: false } });
	if (!['true', 'false'].includes(args[0].toLowerCase())) return message.reply('Please provide a valid option! Either `true` or `false`.', { allowedMentions: { repliedUser: false } });
	let data = await schema.findOne({
		id: message.guild.id,
	});
	if(!data) {
		data = await new schema({
			id: message.guild.id,
			prefix: '?',
			locked: {
				enabled: false,
				lockChannels: [],
			},
		}).save();
		return message.reply('You have not setup lockdown! Use `lockdown-setup` command to setup lockdown.', { allowedMentions: { repliedUser: false } });
	}

	if(!data.locked) return message.reply('You have not setup lockdown! Use `lockdown-setup` command to setup lockdown.', { allowedMentions: { repliedUser: false } });
	if(!data.locked.lockChannels) return message.reply('You have not setup lockdown! Use `lockdown-setup` command to setup lockdown.', { allowedMentions: { repliedUser: false } });
	if(!data.locked.lockChannels[0]) return message.reply('You have not setup lockdown! Use `lockdown-setup` command to setup lockdown.', { allowedMentions: { repliedUser: false } });

	if (args[0].toLowerCase() === 'true') {
		if(data.locked.enabled) return message.reply('The server is already locked!', { allowedMentions: { repliedUser: false } });
		data.locked.enabled = true;
		const channels = message.guild.channels.cache.filter(x => data.locked.lockChannels.includes(x.id));
		channels.forEach((channel) => {
			if(!channel.manageable) return;
			channel.updateOverwrite(message.guild.id, {
				SEND_MESSAGES: false,
			});
		});
		message.channel.send('Locked the server!');
		data.save();
	}
	else if(args[0].toLowerCase() === 'false') {
		if(!data.locked.enabled) return message.reply('The server is already unlocked!', { allowedMentions: { repliedUser: false } });
		data.locked.enabled = false;
		const channels = message.guild.channels.cache.filter(x => data.locked.lockChannels.includes(x.id));
		channels.forEach((channel) => {
			if(!channel.manageable) return;
			channel.updateOverwrite(message.guild.id, {
				SEND_MESSAGES: true,
			});
		});
		message.channel.send('Unlocked the server!');
		data.save();
	}
};
module.exports.config = {
	name: 'lockdown',
	desc: 'Locks the whole server!',
	aliases: [],
};