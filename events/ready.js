/* eslint-disable no-unused-vars */
const { Client, Message } = require('discord.js');
/**
 * JSDOC
 * @param {Client} client
 */
module.exports = client => {
	console.log(`${client.user.tag} is online!`);
	client.user.setActivity('?help', { type: 'WATCHING' });
};

