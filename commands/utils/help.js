/* eslint-disable no-inline-comments */
/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const fs = require('fs');
/**
 *
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {String} args
 */

module.exports.run = async (client, message, args) => {
	if (!args[0]) {
		const embed = new Discord.MessageEmbed()
			.setTitle('DisCruft\'s Help!')
			.setDescription(`My prefix is \`?\` in ${message.guild.name}! We are getting more commands soon!`)
			.setColor('RANDOM')
			.setFooter(message.author.tag, message.author.displayAvatarURL());
		fs.readdir('commands', (err, cmdfolders) => {
			if (err) console.log(err);
			for (let i = 0; i < cmdfolders.length; i++) {
				embed.addField(`${require(`../${cmdfolders[i]}/config`).title}`, `\`?help ${cmdfolders[i]}\``);
			}
			message.reply({ embed: embed, allowedMentions: { repliedUser: false } });
		});
	}
	else if (fs.readdirSync('commands').includes(args[0])) {
		let cmds = fs.readdirSync(`commands/${args[0]}`);
		cmds = cmds.filter(z => z.split('.')[1] === 'js');
		const embed = new Discord.MessageEmbed()
			.setTitle(`${args[0].slice(0, 1).toUpperCase() + args[0].slice(1).toLowerCase()} Commands!`)
			.setDescription(require(`../${args[0]}/config`).description)
			.setColor('RANDOM')
			.setFooter(message.author.tag, message.author.displayAvatarURL());
		embed.addField('Commands', '`' + cmds.join('`, `').split('.js').join('') + '`');
		message.reply({ embed: embed, allowedMentions: { repliedUser: false } });
	}
	else if (client.commands.get(args[0]) || client.aliases.get(args[0])) {
		const cmd = client.commands.get(args[0]);
		if(!cmd) return message.reply('That\'s not a valid command!', { allowedMentions: { repliedUser: false } });
		const embed = new Discord.MessageEmbed()
			.setTitle(`${cmd.config.name.slice(0, 1).toUpperCase() + cmd.config.name.slice(1).toLowerCase()} Command!`)
			.setDescription(`${cmd.config.description}`)
			.setFooter(message.author.tag, message.author.displayAvatarURL())
			.setColor('RANDOM')
			.addField('Info', 'More info about the command soon!'); // Just something so it isnt empty
		/* We can add fields according to the info we add in module.exports.config :ye: */
		message.reply({ embed: embed, allowedMentions: { repliedUser: false } });
	}
};
module.exports.config = {
	name: 'help',
	aliases: [],
	description: 'The help command to help you with the bot!',
};