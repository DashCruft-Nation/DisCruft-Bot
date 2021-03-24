const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
module.exports.run = async (client, message, args) => {
    if (!message.member.voice.channel) {
        return message.channel.send('You must be in a voice channel to use this command.', {
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
    const filters = [
        "mcompand",

        "gate",

        "haas",

        "pulsator",

        "surrounding",

        "clear",

        "8d",

        "bassboost",

        "echo",

        "karaoke",

        "nightcore",

        "vaporwave",

        "flanger",

        "subboost",

        "phaser",

        "tremolo",

        "vibrato",

        "reverse",

        "purebass",

        "treble"
    ]
    if (!args[0]) {
        const embed = new Discord.MessageEmbed()
            .setTitle('filter Help!')
            .setDescription(`My filter commands is ${filters}`)
            .setColor('RANDOM')
            .setFooter(message.author.tag, message.author.displayAvatarURL());
        message.reply({ embed: embed, allowedMentions: { repliedUser: false } });
    }

    if (args[0]) {
        const command = args.shift();
        if (filters.includes(command)) {
            let filter = client.distube.setFilter(message, command);
            return message.channel.send(new MessageEmbed().setTitle("filter changed").setDescription(`${filter}`))
        }
    }
}
module.exports.config = {
    name: 'filter',
    aliases: [],
    description: 'set filter for music',
};