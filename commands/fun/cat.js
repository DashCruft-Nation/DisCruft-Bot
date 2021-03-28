/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const { Client, Message } = require('discord.js');
const fetch = require('node-fetch').default;
/**
 * JSDOC
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */
module.exports.run = async (client, message, args) => {
    message.reply({ files: [new Discord.MessageAttachment('https://source.unsplash.com/collection/139386/200x200/?sig=')], allowedMentions: { repliedUser: false } });
};

module.exports.config = {
	name: 'cat',
	aliases: [],
	description: 'Cat images',
};