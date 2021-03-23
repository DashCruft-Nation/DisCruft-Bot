const Discord = require("discord.js")
const Commando = require('discord.js-commando')

module.exports.run = ({ message, args, text, client, prefix, instance, channel }) => {
  if (!message.member.hasPermission('MANAGE_NICKNAMES', 'CHANGE_NICKNAME')) return message.channel.send("You don't have permission to do this command!")
    const target = message.mentions.users.first()
    const member = message.guild.members.cache.get(target.id)

    args.shift()
    const nickname = args.join(' ')

    member.setNickname(nickname)

    message.reply('You changed the nickname!')
}

module.exports.config = {
	name: 'nickname',
	aliases: ['nick'],
  description: "Changes the name of someone.",
};
