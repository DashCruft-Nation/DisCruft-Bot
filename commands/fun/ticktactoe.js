/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
const Discord = require('discord.js');
const reconlx = require('reconlx');
/**
 * JSDOC
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
	const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
	if(!user) return message.reply('Please provide a user!', { allowedMentions: { repliedUser: false } });
	const game = new reconlx.tictactoe({
		message: message,
		player_two: message.mentions.members.first(),
	});
};
module.exports.config = {
	name: 'ticktactoe',
	aliases: [],
	description: 'Play a game of tictctoe with your friends!',
};