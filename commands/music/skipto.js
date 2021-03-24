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
        client.distube.jump(message, parseInt(args[0]))
            .catch(err => message.channel.send("Invalid song number.", err));
    }



}
module.exports.config = {
    name: 'skipto',
    aliases: ['skt', 'st'],
    description: 'skipto music',
};