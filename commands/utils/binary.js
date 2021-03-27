const Discord = require('discord.js');
const fetch = require('node-fetch').default;

/**
 * JSDOC
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {String} args
 * @returns
 */

module.exports.run = async (bot, message, args) => {
	if(!args[0]) return message.reply('Please provide a function to do with the binary!');
	if (!args[1]) return message.reply('Please give me some binary!', { allowedMentions: { repliedUser: false } });

	if (args[0] === 'decode') {
		const {
			text,
		} = await (await fetch(`https://some-random-api.ml/binary?decode=${encodeURI(args[1])}`)).json();
		const embed = new Discord.MessageEmbed()
			.setTitle('Here is your decoded binary!')
			.setDescription(`**Output:**\n${text}`);
		return message.reply({ embed: embed, allowedMentions: { repliedUser: false } });
	}
	else if(args[0] === 'encode') {
		const { binary } = await (
			await fetch(
				`https://some-random-api.ml/binary?text=${encodeURI(args.slice(1).join(' '))}`,
			)
		).json();
		const embed = new Discord.MessageEmbed()
			.setTitle('Here is your encoded binary!')
			.setDescription(`**Output:**\n${binary}`)
			.setColor('RANDOM');
		return message.reply({ embed: embed, allowedMentions: { repliedUser: false } });
	}
};
module.exports.config = {
	name: 'binary',
	desc: 'Decodes/Encodes binary numbers!',
	aliases: [],
};