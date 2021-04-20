const canvacord = require("canvacord");
const { MessageAttachment } = require("discord.js");

module.exports.run = async (client, message, args) => {
    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    let triggered = await canvacord.Canvas.wasted(user.displayAvatarURL({ format: "png", dynamic: false }));
    let attachment = new MessageAttachment(triggered, "wasted.gif");
    return message.channel.send(attachment);
}

module.exports.config = {
	name: 'kill',
	aliases: [],
	description: 'try it out and see',
};