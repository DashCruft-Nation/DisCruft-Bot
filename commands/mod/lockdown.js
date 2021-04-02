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
	if(client !== message) return message.reply('This command is still in works!', { allowedMentions: { repliedUser: false } }); // ignore this lol
	if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('You do not have permissions to use this command!');
	if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send('Unable to lock the channels! Missing permissions');
	if (!args[0] || !['true', 'false'].includes(args[0].toLowerCase())) return message.reply('Please provide a valid option! Either `Yes` or `No`.', { allowedMentions: { repliedUser: false } });
	const data = await schema.findOne({
		id: message.guild.id,
	});

	if (args[0] === 'true') {
		const toLock = message.guild.channels.cache.filter(c =>
			(
				!c.permissionOverwrites.get(message.guild.roles.everyone.id)
				|| !c.permissionOverwrites.get(message.guild.roles.everyone.id).deny.toArray()[0]
				|| !c.permissionOverwrites.get(message.guild.roles.everyone.id).deny.toArray().includes('SEND_MESSAGES')
			)
			&& c.manageable
			&& c.permissionOverwrites.get(message.guild.roles.everyone.id).allow.toArray().includes('SEND_MESSAGES')
			&& c.type !== 'category'
			&& c.type !== 'voice'
			&& c.permissionOverwrites.get(message.guild.roles.everyone.id).deny.toArray().includes('VIEW_CHANNEL'),
		);
		if (data) {
			if (data.locked) return message.reply('The server is already locked!', { allowedMentions: { repliedUser: false } });
			data.lockedChannels = [];
			data.locked = true;
			const results = new Map();
			toLock.forEach((c) => {
				c.updateOverwrite(message.guild.roles.everyone, {
					'SEND_MESSAGES': false,
				});
				data.lockedChannels.push(c.id);

			});

			message.reply(`\`\`\`\n${toLock.map(res => `${res.name} | ${res.id} - ${(typeof results.get(res.id) == 'boolean') ? 'Successful' : 'Unsuccessful'}\n`)}\`\`\``, { allowedMentions: { repliedUser: false } });
			await data.save();
		}
		else {
			const lockedChannels = [];
			const results = new Map();
			toLock.forEach((c) => {
				c.updateOverwrite(message.guild.roles.everyone, {
					'SEND_MESSAGES': false,
				});
				lockedChannels.push(c.id);
			});

			message.reply(`\`\`\`\n${toLock.map(res => `${res.name} | ${res.id} - ${(typeof results.get(res.id) == 'boolean') ? 'Successful' : 'Unsuccessful'}\n`)}\`\`\``, { allowedMentions: { repliedUser: false } });

			await new schema({
				id: message.guild.id,
				locked: true,
				prefix: '?',
				lockedChannels: lockedChannels,
			}).save();
		}
	}
	else if (args[0] === 'false') {
		if (data) {
			if (!data.locked) return message.reply('The server is not locked!', { allowedMentions: { repliedUser: false } });
			const toUnlock = data.lockedChannels;
			const arr = [];
			await toUnlock.forEach((c, m) => {
				message.guild.channels.cache.get(c).updateOverwrite(message.guild.roles.everyone, { SEND_MESSAGES: true });
				arr.push(m);
			});
			message.channel.send(`\`\`\`\n${toUnlock.map((c, res) => `${c.name} | ${c.id} - ${'Successful'}\n`)}\n\`\`\``);
			for (let i = 0; i < arr.length; i++) {
				data.lockedChannels.splice(data.lockedChannels.indexOf(arr[i]), 1);
			}
			data.locked = false;
			await data.save();
		}
		else {
			return message.reply('The server is not locked!');
		}
	}
};
module.exports.config = {
	name: 'lockdown',
	desc: 'Locks the whole server!',
	aliases: [],
};