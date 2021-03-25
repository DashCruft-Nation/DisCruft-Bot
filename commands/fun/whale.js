/* eslint-disable no-unused-vars */
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
	message.react('🐋');
	message.react('💦');
	message.channel.send(':whale: :sweat_drops:');

};

module.exports.config = {
	name: 'whale',
	aliases: [],
	description: ':whale:',
};
