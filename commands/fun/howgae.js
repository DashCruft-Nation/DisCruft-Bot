/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed } = require('discord.js');
/**
 * JSDOC
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */
module.exports.run = async (client, message, args) => {
  let replies = ["50 percent :rainbow_flag: ", "20 percent :rainbow_flag: ", "1 percent :rainbow_flag: ", "5 percent :rainbow_flag: ", "10 percent :rainbow_flag: ", "100 percent if you know it or not  YOU ARE GAE :rainbow_flag: ", "90 percent :rainbow_flag: ", "35 percent :rainbow_flag: ", "80 peercent :rainbow_flag: ", "85 percent :rainbow_flag: ", "6 percent :rainbow_flag: ", "GREAT YOU ARE NOT GAE!!! THANK GOD", "99 PERCENT :rainbow_flag: ", "idk"] //you can continue it like this , "another reply", "one more reply"]
    message.channel.send(replies[Math.floor(Math.random() * replies.length)])
};

module.exports.config = {
	name: 'howgae',
	aliases: ['gayrate'],
	description: 'check how gay you are',
};
