/* eslint-disable no-unused-vars */
const {
  Client,
  Message,
  MessageEmbed
} = require('discord.js');
/**
 * JSDOC
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */
module.exports.run = async (client, message, args) => {
  if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.reply('I don\'t have permission to ban members!', {
    allowedMentions: {
      repliedUser: false
    }
  });
  if (message.member.hasPermission("KICK_MEMBERS")) {
    let member = message.mentions.members.first()
    if (!member) message.channel.send("oi oi oi mention someone rn or i kick ya out")
    else {
      member.kick().then(mem => {
        message.channel.send(`Kicked ${mem.user.username} outta this universe lmao`)
      })
    }
  } else {
    message.reply("Stop bitchin around when u know u dont have da perms bru")
  }
};

module.exports.config = {
  name: 'kick',
  aliases: ['kick members'],
  description: 'Bans a member! Do it if you think someone is bannable!!',
};