/* eslint-disable no-unused-vars */
const schema = require('../../database/models/Guilds');
/**
 * JSDOC
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
	if(!message.member.hasPermission('MANAGE_GUILD')) return message.reply('You do not have the permissions to use this command!', { allowedMentions: { repliedUser: false } });
	if (!args[0]) return message.reply('Please provide some options!', { allowedMentions: { repliedUser: false } });
	let data = await schema.findOne({
		id: message.guild.id,
	});
	if (!data) {
		data = await new schema({
			id: message.guild.id,
			prefix: '?',
			locked: false,
			lockedChannels: [],
			welcome: true,
		}).save();
	}
	if (['enable', 'disable'].includes(args[0])) {
		data.welcome = args[0] == 'enable' ? true : false;
		await schema.findOneAndUpdate({
			id: message.guild.id,
		}, data);
		return message.reply(`The welcome message is now ${!data.welcome ? 'disabled' : 'enabled'}!`, { allowedMentions: { repliedUser: false } });
	}
	else if (!['channel', 'message'].includes(args[0])) {return message.reply('That is not a valid option!', { allowedMentions: { repliedUser: false } });}
	if (args[0] === 'channel') {
		const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
		if (!channel) return message.reply('Please provide a valid channel!');
		try{
			await channel.send('Welcome message enabled in this channel!');
		}
		catch(err) {
			return message.reply('Unable to send messages in the channel!');
		}
		data.welcomeChannel = channel.id;
		data.welcome = true;
		await schema.findOneAndUpdate({
			id: message.guild.id,
		}, data);
		message.reply(`Welcome message is now going to be sent in ${channel}!`, { allowedMentions: { repliedUser: false } });
	}
	else if (args[0] === 'message') {
		data.welcomemsg = args.slice(1).join(' ');
		data.welcome = true;
		await schema.findOneAndUpdate({
			id: message.guild.id,
		}, data);
		message.reply(`Welcome message is now set to **\`${data.welcomemsg}\`**!`);
	}
};
module.exports.config = {
	name: 'welcome',
	description: 'Welcome message configuration command!',
	aliases: ['wlcm'],
};