const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
module.exports.run = async (client, message, args) => {
    if (!message.member.voice.channel) {
        return message.reply('You must be in a voice channel to use this command.', {
            allowedMentions: {
                repliedUser: true,
            },
        });
    }
    if (!message.guild.me.hasPermission('CONNECT')) {
        return message.channel.send(`I don't have \`CONNECT\` permission to connect to \`${message.member.voice.channel.name}\``, {
            allowedMentions: {
                repliedUser: true,
            },
        });
    }
    if (!message.guild.me.permissionsIn(message.member.voice.channel).has('CONNECT')) {
        return message.channel.send(`I don't have \`CONNECT\` permission to connect to \`${message.member.voice.channel.name}\``, {
            allowedMentions: {
                repliedUser: true,
            },
        });
    }
    if (!args[0]) {
        message.channel.send(new MessageEmbed().setTitle("You didn't specify number"))
    } else {
        await client.distube.setVolume(message, args[0]).then(message.channel.send(new MessageEmbed().setTitle("done").setDescription(`set volume to ${args[0]}`)))
    }



}
module.exports.config = {
    name: 'volume',
    aliases: ['vol'],
    description: 'set volume for music',
};