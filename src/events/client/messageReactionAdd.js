const Discord = require('discord.js');
const schema = require('../../database/models/Guilds');

/**
 * @param {Discord.Client} client
 * @param {Discord.MessageReaction} reaction
 * @param {Discord.User} user
 */
module.exports = async (client, reaction, user) => {
	if(user.bot) return;
	if(reaction.partial) reaction.fetch();

	const data = await schema.findOne({
		id: reaction.message.guild.id,
	});
	if (!data) {
		return await new schema({
			id: reaction.message.guild.id,
			prefix: '?',
			locked: {
				enabled: false,
			},
			welcome: {
				enabled: false,
			},
			tickets: {
				enabled: false,
			},
		}).save();
	}
	else if(data) {
		if(!data.tickets.enabled) return;
		if(!data.tickets.channelID) return;
		if(!data.tickets.messageID) return;
		if(reaction.emoji.name !== 'tickets' && reaction.message.id === data.tickets.messageID) return;
		if(reaction.message.guild.channels.cache.find(channel => channel.name == `ticket-${user.id}`)) return;
		reaction.message.guild.channels.create(`ticket-${user.id}`, {
			type: 'text',
			permissionOverwrites: [
				{
					id: user.id,
					allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS', 'READ_MESSAGE_HISTORY', 'USE_EXTERNAL_EMOJIS'],
				},
				{
					id: reaction.message.guild.roles.everyone.id,
					deny: ['VIEW_CHANNEL'],
				},
			],
		})
			.then((channel) => {
				const ticketCreated = new Discord.MessageEmbed()
					.setTitle('Ticket 🎟️')
					.setDescription(`${user.toString()} has created a ticket! Be sure to provide your reason to create this ticket, details about your issue etc.`)
					.setColor('RANDOM')
					.setAuthor(user.tag, user.displayAvatarURL())
					.setTimestamp();
				channel.send(user, ticketCreated);
			});
	}
};