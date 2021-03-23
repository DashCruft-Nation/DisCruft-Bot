module.exports.run = async (client, message, args) => {
//lockdown with options :)
 const { MessageEmbed } = require('discord.js');
      const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
      if(!message.member.hasPermission("ADMINISTRATOR") || !message.guild.owner) return message.channel.send("You dont have permission to use this command.");
      if(!args[0]) return message.reply(`Please use \`..lockdown on\` or \`..lockdown off\` `)
      if (args[0] === 'on') {
          channels.forEach(channel => {
              channel.updateOverwrite(message.guild.roles.everyone, {
                  SEND_MESSAGES: false
              }).then(() => {
                  channel.setName(channel.name += `🔒`)
              })
          })
          return message.channel.send('Locked all channels');
      } else if (args[0] === 'off') {
          channels.forEach(channel => {
              channel.updateOverwrite(message.guild.roles.everyone, {
                  SEND_MESSAGES: true
              }).then(() => {
                      channel.setName(channel.name.replace('🔒', ''))
                  }
              )
          })
          return message.channel.send('Unlocked all channels')
      }
};
module.exports.config = {
	name: 'lockdown',
	aliases: [],
};
