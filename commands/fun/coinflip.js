const Discord = require('discord.js');


module.exports.run = async (client, message) => {

	const n = Math.floor(Math.random() * 2);
	let result;
	if (n === 1) result = 'heads';
	else result = 'tails';
	const embed = new Discord.MessageEmbed()
		.setTitle('½  Coinflip  ½')
		.setDescription(`I flipped a coin for you, ${message.member}. It was **${result}**!`)
		.setColor('RANDOM');
	message.reply({ embed: embed, allowedMentions: { repliedUser: false } });
};

module.exports.config = {
	name: 'coinflip',
	aliases: ['coin', 'cf', 'flip'],
	description: 'Flip a coin and make decisions!',
};
