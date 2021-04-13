/* eslint-disable no-unused-vars */
const moment = require('moment');
const {
	Client,
	Message,
	MessageEmbed,
} = require('discord.js');
const config = require('../../config.json');
const region = {
	'brazil': ':flag_br: Brazil',
	'eu-central': ':flag_eu: Central Europe',
	'singapore': ':flag_sg: Singapore',
	'us-central': ':flag_us: U.S. Central',
	'sydney': ':flag_au: Sydney',
	'us-east': ':flag_us: U.S. East',
	'us-south': ':flag_us: U.S. South',
	'us-west': ':flag_us: U.S. West',
	'eu-west': ':flag_eu: Western Europe',
	'vip-us-east': ':flag_us: VIP U.S. East',
	'london': ':flag_gb: London',
	'amsterdam': ':flag_nl: Amsterdam',
	'hongkong': ':flag_hk: Hong Kong',
	'russia': ':flag_ru: Russia',
	'southafrica': ':flag_za:  South Africa',
};
/**
 * JSDOC
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {

	const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
	const voiceChannelCount = message.guild.channels.cache.filter(c => c.type === 'voice').size;
	const textChannelCount = message.guild.channels.cache.size;
	const memberCounts = message.guild.memberCount;

	const voicetext = '#️⃣ ' + ' ' + textChannelCount + ' ' + 'Text ' + ', ' + ' ' + ' ' + ' 🔊 ' + voiceChannelCount + ' ' + 'Voice';
	const serverMembers = `${memberCounts}` + ' ' + '**Total** Members' + ', ' + `${message.guild.members.cache.filter(member => member.user.bot).size}` + ' ' + '**Bot(s)**';

	const embed = new MessageEmbed()
		.setAuthor(message.guild.name, message.guild.iconURL({
			format: 'png',
			dynamic: true,
			size: 2048,
		}))
		.setColor(config.mainColor)
		.addField('Region', region[message.guild.region], true)
		.addField('Server ID', message.guild.id, false)
		.addField('Owner', `👑 ${message.guild.owner}`, true)
		.addField('Boosts', `${message.guild.premiumSubscriptionCount} (Tier ${message.guild.premiumTier})`, true)
		.addField('Total Server Members', `${serverMembers}`, false)
		.addField('Channels Count', voicetext, false)
		.addField('Emojis Count', `<:bored:823667560016379915> ${message.guild.emojis.cache.size} Emojis`, true)
		.addField('Roles Count', `${message.guild.roles.cache.size} Roles`, true)
		.addField('Server Creation Date', `:date: ${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, false)
		.setThumbnail(message.guild.iconURL())
		.setTimestamp()
		.setFooter(message.guild.name);

	message.reply({
		embed: embed,
		allowedMentions: {
			repliedUser: false,
		},
	});

};

module.exports.config = {
	name: 'serverinfo',
	aliases: ['server', 'sinfo'],
	description: 'Shows info of a guild/server!',
};

function checkDays(date) {
	const now = new Date();
	const diff = now.getTime() - date.getTime();
	const days = Math.floor(diff / 86400000);
	return days + (days == 1 ? ' day' : ' days') + ' ago';
}
