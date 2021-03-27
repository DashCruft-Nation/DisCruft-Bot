/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
/**
 * JSDOC
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {String} args
 * @returns
 */
module.exports.run = async (client, message, args) => {
	const cross = client.guilds.cache.get('804584266972659722').emojis.cache.get('804967275600805888') || client.guilds.cache.get('804584266972659722').emojis.fetch('804967275600805888', true, false);
	if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.reply('I do not have permissions to delete messages!', { allowedMentions: { repliedUser: false } });
	if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply(`${cross}, You Need The Permission \`MANAGE_MESSAGES\` to use This Command!`, { allowedMentions: { repliedUser: false } });

	const user = message.mentions.users.first();
	if (typeof user === 'undefined') {
		const number = parseInt(args[0]) + 1;
		if (isNaN(number)) return message.reply('Please provide a valid number!', { allowedMentions: { repliedUser: false } });
		if (number >= 100) return message.reply('You cannot delete more than 100 messages at once because of technical limitations!', { allowedMentions: { repliedUser: false } });
		if (number < 1) return message.reply('The amount should be more than 1!', { allowedMentions: { repliedUser: false } });

		message.channel.bulkDelete(number, true).then(msgs => {
			message.channel.send(`Successfully deleted **${msgs.size - 1}** messages`).then(m => {
				m.delete({ timeout: 1000 * 4 });
			});
		});
		return;
	}
	else {
		const number = parseInt(args[1]);
		if (isNaN(number)) return message.reply('Please provide a valid number!', { allowedMentions: { repliedUser: false } });
		if (number >= 100) return message.reply('You cannot delete more than 100 messages at once because of technical limitations!', { allowedMentions: { repliedUser: false } });
		if (number < 1) return message.reply('The amount should be more than 1!', { allowedMentions: { repliedUser: false } });

		message.channel.messages.fetch({ limit: 100 }).then(msgs => {
			const toDelete = new Discord.Collection();
			msgs.filter(m => m.author.id === user.id).array().slice(0, number).map(m => toDelete.set(m.id, m));
			toDelete.set(message.id, message);
			console.log(toDelete.size);
			message.channel.bulkDelete(toDelete).then(msg => {
				message.channel.send(`Successfully deleted **${msg.size - 1}** messages by **${user.tag}**`).then(m => {
					m.delete({ timeout: 1000 * 5 });
				});
			}).catch(error => {
				console.log(error);
				message.reply(`There was an error deleting the messages!\nError: ${error})`, { allowedMentions: { repliedUser: false } });
			});
		});
	}
};
module.exports.config = {
	name: 'purge',
	desc: 'Deletes messages in the channel!',
	aliases: ['clear'],
};