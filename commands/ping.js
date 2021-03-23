module.exports.run = async (client, message, args) => {
    const latency = message.createdTimestamp - Date.now();
    const apilatency = Math.round(client.ws.ping)

    message.channel.send({
        embed: {
            title: 'Pong 🏓',
            description: `latency: ${latency}\nAPI: ${apilatency}`,
            color: Number(client.config.mainColor)
        }
    });
}

module.exports.config = {
    name: "ping",
    aliases: ['latency', 'ping']
}