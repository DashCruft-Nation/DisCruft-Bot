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

    let mode = client.distube.toggleAutoplay(message);
    message.channel.send(new MessageEmbed().setTitle("autoplay").setDescription("Set autoplay mode to `" + (mode ? "On" : "Off") + "`"));

};

module.exports.config = {
    name: 'autoplay',
    aliases: [],
    description: 'autoplay a music!',
};