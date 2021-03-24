/* eslint-disable no-unused-vars */
const moment = require('moment');
const momentDur = require('moment-duration-format');
const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../config.json');
const momentDurationFormatSetup = require('moment-duration-format');
/**
 * JSDOC
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {

	const targetMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
	if (!targetMember) return;

	momentDurationFormatSetup(moment);

	const embed = new MessageEmbed()
		.setColor(config.mainColor)
		.setTitle(targetMember.user.tag)
		.setThumbnail(targetMember.user.avatarURL())
		.setAuthor('DisCruft | User Info', client.user.avatarURL())

		.addFields(
			{ name: '#️⃣ Role Count', value: `\`\`\`${targetMember.roles.cache.size}\`\`\``, inline: true },
			{ name: '🔝 Highest Role', value: `\`\`\`${targetMember.roles.highest.name}\`\`\``, inline: true },
			{ name: '🌈 Role Color', value: `\`\`\`${targetMember.displayHexColor}\`\`\``, inline: true },
			{ name: '#️⃣ Badge Count', value: `\`\`\`${targetMember.user.flags.toArray().length}\`\`\``, inline: true },
			{ name: 'Is Booster?', value: `\`\`\`${targetMember.premiumSince ? 'Yes' : 'No'}\`\`\``, inline: true },
			{ name: '——————————————————————————————', value: '_ _' },
		)

		.addFields(
			{ name: '🧍 Display Name', value: `\`\`\`${targetMember.displayName}\`\`\``, inline: true },
			{ name: '🆔 User ID', value: `\`\`\`${targetMember.user.id}\`\`\``, inline: true },
			{ name: '📅 Server Join Date', value: `\`\`\`${moment(targetMember.joinedAt).utc().format('MM/DD/YYYY | h:mm A')}\`\`\``, inline: false },
			{ name: '📅 Account Age', value: `\`\`\`${moment.duration(moment().diff(targetMember.user.createdAt.getTime())).format('Y [Year(s)], D [Day(s)], H [Hour(s)], m [Min(s)]')}\`\`\``, inline: false },
		);

	message.reply({ embed: embed, allowedMentions: { repliedUser: false } });

};

module.exports.config = {
	name: 'userinfo',
	aliases: ['uinfo', 'whois'],
	description: 'Shows info of a user!',
};