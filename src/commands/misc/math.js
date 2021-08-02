const { MessageEmbed } = require('discord.js');
const math = require('mathjs');
/**
 * JSDOC
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
	try {
		const embed1 = new MessageEmbed()
			.setColor('RANDOM')
			.addField('Question', args.join(' '))
			.addField('Value', math.evaluate(args.join(' ')))
			.setTimestamp();
		return message.channel.send({ embed: embed1 });
	}
	catch (err) {
		const embed2 = new MessageEmbed()
			.setColor('RANDOM')
			.setTitle('Error!')
			.setDescription('Your question is not valid!')
			.setTimestamp();
		return message.channel.send({ embed: embed2 });
	}
};

module.exports.config = {
	name: 'math',
	aliases: ['calculate', 'calc'],
	description: 'This command can solve a user\'s mathematical problems',
};