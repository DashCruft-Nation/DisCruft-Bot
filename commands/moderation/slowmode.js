/* eslint-disable no-unused-vars */
const { Client, Message } = require('discord.js');
/**
 * JSDOC
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */
module.exports.run = async (client, message, args) => {
	// nuggetapi pog :LMFAO:
	if (message.member.hasPermission('MANAGE_CHANNELS')) {
		const arg = message.content.split(' ').slice(1);
		const cd = arg[0];
		if (!cd) {
			return message.channel.send(
				'Please Give an amount of **Second(s)** to set slowmode!',
			);
		}
		if (isNaN(cd)) {
			return message.channel.send(
				'Please give a valid amount of **Seconds** to set slowmode!',
			);
		}
		if (cd > 21600) {
			return message.channel.send(
				'You can\'t set the Slowmode higher than 21600 seconds.',
			);
		}
		if (cd < 0) {
			return message.channel.send(
				'You can\'t set the Slowmode Lower than 0 seconds',
			);
		}
		else {
			message.channel.setRateLimitPerUser(cd);
			message.channel.send(
				`Successfully set the Slowmode to ${cd} Seconds in this Channel!`,
			);
		}

	}
};

module.exports.config = {
	name: 'slowmode',
	aliases: [],
};
