/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const schema = require('../../database/models/Guilds');
/**
 * JSDOC
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {String[]} args
 */
module.exports.run = async (client, message, args) => {
	if(!message.member.hasPermission('MANAGE_GUILD')) return message.reply('You do not have the `MANAGE_GUILD` permission!', { allowedMentions: { repliedUser: false } });
	message.channel.send('Specify all the channels you want to lock at the time of lockdown!');
	message.channel.awaitMessages(m => m.author.id === message.author.id, { time: 30000, max: 1 }).then(async msgs => {
		const msg = msgs.first();
		if(!msg) return message.reply('You did not respond in time!', { allowedMentions: { repliedUser: false } });
		if(!msg.mentions.channels.first()) return message.reply('Make sure to provide channel!', { allowedMentions: { repliedUser: false } });
		const channelIDs = msg.mentions.channels.filter(x => x.type === 'text').map(e => e.id);
		if(!channelIDs[0]) return message.reply('Unable to find any valid channels!');
		const data = await schema.findOne({
			id: message.guild.id,
		});
		if(!data) {
			await new schema({
				id: message.guild.id,
				prefix: '?',
				locked: {
					enabled: false,
					lockChannels: channelIDs,
				},
			}).save();
			message.channel.send(`Successfully saved all channels to lock when lockdown command is run! There are ${channelIDs.length} channels.`);
		}
		else if(data) {
			if(!data.locked) data.locked = {};
			data.locked.lockChannels = channelIDs;
			await data.save();
			message.channel.send(`Successfully saved all channels to lock when lockdown command is run! There are ${channelIDs.length} channels.`);
		}
	});
};
module.exports.config = {
	name: 'lockdown-setup',
	description: 'Setup lockdown command for your server!',
	aliases: [],
};