/* eslint-disable no-unused-vars */
const { Client, Message } = require('discord.js');
/**
 * JSDOC
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */
module.exports.run = async (client, message, args) => {
	const latency = new Date().getTime() - message.createdTimestamp;
	const apilatency = Math.round(client.ws.ping);

	message.channel.send({
		embed: {
			title: 'Pong 🏓',
			description: `latency: \`${latency}ms\`\nAPI latency: \`${apilatency}ms\``,
		},
	});

};
module.exports.config = {
	name: 'ping',
	aliases: ['latency', 'ping'],
};
