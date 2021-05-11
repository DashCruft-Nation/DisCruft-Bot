/* eslint-disable no-inline-comments */
/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const fs = require('fs');
/**
 *
 * @param {Discord.Client} client
 * @param {Object[]} args
 */
module.exports.run = async (client, interaction, args) => {
	interaction.author = new Discord.User(client, interaction.member.user);
	if (!args) {
		const embed = new Discord.MessageEmbed()
			.setTitle('DisCruft\'s Help!')
			.setDescription(`My prefix is \`?\` in ${client.guilds.cache.get(interaction.guild_id).name}! We are getting more slash commands soon!`)
			.setColor('RANDOM')
			.setFooter(interaction.author.tag, interaction.author.displayAvatarURL());
		fs.readdir('slashcommands', (err, cmds) => {
			if (err) console.log(err);
			const cmdss = cmds.map(cmd => cmd.split('.js')[0]);
			embed.addField('Commands', `${'`' + cmdss.join('`, `') + '`'}`);
			client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					data: {
						embeds: [embed],
					},
					type: 4,
				},
			});
		});
	}
	else if (client.slashcommands.get(args[0].value)) {
		const cmd = client.slashcommands.get(args[0].value);
		if (!cmd) {
			return client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					data: {
						content: 'That\'s not a valid command!',
					},
					type: 4,
				},
			});
		}
		const embed = new Discord.MessageEmbed()
			.setTitle(`${cmd.config.name.slice(0, 1).toUpperCase() + cmd.config.name.slice(1).toLowerCase()} Command!`)
			.setDescription(`${cmd.config.description}`)
			.setFooter(interaction.author.tag, interaction.author.displayAvatarURL())
			.setColor('RANDOM')
			.addField('Info', 'More info about the command soon!');
		client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				data: {
					embeds: [embed],
				},
				type: 4,
			},
		});
	}
};
module.exports.config = {
	name: 'help',
	aliases: [],
	description: 'The help command to help you with the bot!',
	registerData: {
		data: {
			name: 'help',
			description: 'The help command to help you with the bot!',
			options: [
				{
					name: 'command',
					description: 'The command you want info about',
					required: false,
					type: 3,
				},
			],
		},
	},
};