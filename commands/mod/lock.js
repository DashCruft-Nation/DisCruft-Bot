/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
/**
 * JSDOC
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {String[]} args
 * @returns
 */

module.exports.run = async (client, message, args) => {
	if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('You do not have permissions to use this command!');
	if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send('Unable to lock the channel! Missing permissions');
	if (!message.channel.permissionOverwrites.get(client.user.id)) {
		await message.channel.createOverwrite(client.user, {
			SEND_MESSAGES: true,
		});
	}
	if (!message.channel.permissionOverwrites.get(client.user.id).allow.toArray().includes('SEND_MESSAGES')) {
		await message.channel.updateOverwrite(client.user, {
			SEND_MESSAGES: true,
		});
	}
	if(!message.channel.permissionOverwrites.get(message.guild.roles.everyone.id)) {
		await message.channel.updateOverwrite(message.guild.roles.everyone, {
			SEND_MESSAGES: false,
		});
		return message.channel.send('Locked down the channel!');
	}
	if (!message.channel.permissionOverwrites.get(message.guild.roles.everyone.id).allow.toArray().includes('SEND_MESSAGES')) {
		if(message.channel.permissionOverwrites.get(message.guild.roles.everyone.id).deny.toArray().includes('SEND_MESSAGES')) return message.channel.send('The channel is locked!');
	}
	await message.channel.updateOverwrite(message.guild.roles.everyone, {
		SEND_MESSAGES: false,
	});
	await message.channel.send('Locked down the channel!');
};
module.exports.config = {
	name: 'lock',
	desc: 'Locks a channel!',
	aliases: [],
};