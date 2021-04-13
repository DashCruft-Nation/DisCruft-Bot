/* eslint-disable no-unused-vars */
const schema = require('../database/models/Guilds');
const Discord = require('discord.js');
/**
 *
 * @param {Discord.GuildMember} member
 * @returns
 */
module.exports = async (client, member) => {
	let data = await schema.findOne({
		id: member.guild.id,
	});
	if(!data) {
		data = await new schema({
			id: member.guild.id,
			prefix: '?',
			locked: false,
			lockedChannels: [],
			welcome: false,
		}).save();
	}
	if (data.welcome === true && data.welcomeChannel) {
		const msg = data.welcomemsg || `Welcome to the server <@!${member.id}>, we are at ${member.guild.memberCount} members!`;
		member.guild.channels.cache.get(data.welcomeChannel).send(msg);
	}
};