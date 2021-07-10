/* eslint-disable no-useless-escape */
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
	return message.reply('Disabled command');
	if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply('You need `MANAGE_GUILD` permission!', { allowedMentions: { repliedUser: false } });
	let data = await schema.findOne({
		id: message.guild.id,
	});
	if (!data) {
		data = await new schema({
			id: message.guild.id,
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
		});
	}
	if (!args[0]) return message.reply('You can use `disable` to disable ticket, `enable` to enable ticket, `list` to list your ticket and `create` to create a ticket!', { allowedMentions: { repliedUser: false } });
	if (!['enable', 'disable', 'create'].includes(args[0].toLowerCase())) return message.reply('There is only `enable`, `disable`, `create`');
	if (args[0].toLowerCase() === 'enable') {
		if (data.tickets.enabled === true) return message.reply('Ticket system is already enabled!');
		data.tickets.enabled = true;
		message.reply('Successfully enabled ticket! Make sure to put a channel!');
		await data.save();
	}
	else if (args[0].toLowerCase() === 'disable') {
		if (data.tickets.enabled === false) return message.reply('Ticket system is already disabled!');
		data.tickets.enabled = false;
		message.reply('Successfully disabled ticket! Make sure to put a channel!');
		await data.save();
	}
	else if (args[0].toLowerCase() === 'create') {
		if (!data.tickets.enabled) return message.reply('You did not enable ticket! Enable it and then try running this command');

		const ticketembed = new Discord.MessageEmbed();
		if (!args[1]) return message.reply('You can use `new` to create a new ticket message OR `existing` to use any existing message, it can even be a message sent by you!', { allowedMentions: { repliedUser: false } });

		if (args[1].toLowerCase() === 'new') {
			let step = 0;
			const filter = msg => msg.author.id === message.author.id;
			const collector = message.channel.createMessageCollector(filter, { max: 4, time: 60000 });
			message.channel.send('What will be the title of the embed?');
			collector.on('collect', async (msg) => {
				if (msg.content.toLowerCase() === 'stop') return cancel(msg, collector);
				step++;
				if (step == 1) {
					if (!msg.content) return cancel(msg, collector);
					ticketembed.setTitle(msg.content);
					message.channel.send(`Set the title of the embed to \`${msg.content.replace('`', '\`')}\``);
				}
				else if (step == 2) {
					if (!msg.content) return cancel(msg, collector);
					ticketembed.setDescription(msg.content);
					message.channel.send(`Set the description of the embed to \`${msg.content.replace('`', '\`')}\``);
				}
				else if (step == 3) {
					if (!msg.content) return cancel(msg, collector);
					if (!Discord.Util.resolveColor(msg.content)) return cancel(msg, collector, ' Not a valid color!');
					ticketembed.setColor(Discord.Util.resolveColor(msg.content));
					message.channel.send(`Set the color of the embed to \`${msg.content.replace('`', '\`')}\``);
				}
				else if (step == 4) {
					if (!msg.content) return cancel(msg, collector);
					if (!msg.mentions.channels.first()) return cancel(msg, collector);
					const channel = message.mentions.channels.first() || message.guild.channels.cache.get(msg.content);
					data.tickets.channelID = channel.id;
				}
			});
			collector.on('end', async (msgs) => {
				client.channels.cache.get(data.tickets.channelID).send(ticketembed).then(async embed => {
					await embed.react('🎟️');
					data.tickets.messageID = embed.id;
					await data.save();
				});
			});
		}
		else if (args[1].toLowerCase() === 'existing') {
			message.reply('Provide channel and message ID of the message. Example: `123456789012345678 #ticket-channel`', { allowedMentions: { repliedUser: false } });
			const filter = msg => msg.author.id === message.author.id;
			message.channel.awaitMessages(filter, { time: 30000, max: 1 })
				.then(async (msgs) => {
					const m = msgs.first();
					if(!m.mentions.channels.filter(x => x.type === 'text').first()) return message.reply('Please mention a channel!', { allowedMentions: { repliedUser: false } });
					const arg = m.content.split(' ');
					if(isNaN(arg[0])) return message.reply('Please provide a message ID!', { allowedMentions: { repliedUser: false } });
					const c = m.guild.channels.cache.get(m.mentions.channels.filter(x => x.type === 'text').first().id);
					const messag = await c.messages.fetch(arg[0]).catch(() => {return message.reply('Unable to find the message!', { allowedMentions: { repliedUser: false } });});
					data.tickets.messageID = messag.id;
					data.tickets.channelID = c.id;
					data.save();
					message.channel.send('Successfully added the message ID to database');
				});
		}
	}
};
module.exports.config = {
	name: 'ticket',
	description: 'Ticket system to make your applications, etc. cleaner!',
	aliases: [],
};
/**
 * @param {Discord.Message} message
 * @param {Discord.MessageCollector} collector
 * @param {String} reason
 */
async function cancel(message, collector, reason = ' Invalid value or no value provided!') {
	message.reply('Cancelled ticket creation!' + reason, { allowedMentions: { repliedUser: false } });
	return collector.stop();
}