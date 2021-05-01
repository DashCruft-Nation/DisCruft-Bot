const Discord = require('discord.js')

module.exports = {
    name: 'nuke',
    execute(message) {
        if (!message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.send('missing permissions')
        }

        message.channel.clone().then(channel => {
            channel.setPosition(message.channel.position)
            channel.send('nuked')
        })
        message.channel.delete()

    },
};
