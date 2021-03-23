module.exports.run = async (client, message, args) => {
    var latency = new Date().getTime() - message.createdTimestamp;
    var apilatency = Math.round(bot.ws.ping)

    message.channel.send(`🏓 - 🏓 - 🏓\n\`\`\`js\nlatency: ${latency}ms\nAPI latency: ${apilatency}ms\`\`\``)
}

module.exports.config = {
    name: "ping",
    aliases: ['latency', 'ping']
}