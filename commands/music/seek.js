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

    client.distube.seek(message, Number(args[0]));




}
module.exports.config = {
    name: 'seek',
    aliases: [],
    description: 'seek music',
};