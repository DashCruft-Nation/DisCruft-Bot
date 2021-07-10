const Discord = require('discord.js');

module.exports.run = async (client, interaction, args) => {
	const embed = new Discord.MessageEmbed()
		.setDescription(args[0].value)
		.setAuthor(`${interaction.member.user.username}`, new Discord.User(client, interaction.member.user).displayAvatarURL())
		.setTimestamp()
		.setColor('RANDOM');
	client.api.interactions(interaction.id, interaction.token).callback.post({
		data: {
			type: 4,
			data: {
				embeds: [embed],
			},
		},
	});
};
module.exports.config = {
	name: 'say',
	description: 'Says your message content!',
	aliases: [],
	registerData: {
		data: {
			name: 'say',
			description: 'Says your message content!',
			options: [
				{
					name: 'content',
					description: 'The content of the message!',
					required: true,
					type: 3,
				},
			],
		},
	},
};