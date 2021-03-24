/* eslint-disable no-unused-vars */
const Canvas = require('canvas');
const { Client, Message, MessageAttachment } = require('discord.js');
/**
 * JSDOC
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */
module.exports.run = async (client, message, args) => {

    const member = message.mentions.members.first() || message.member;
    const canvas = Canvas.createCanvas(867, 892);
    const ctx = canvas.getContext('2d');
    const background = await Canvas.loadImage('https://i.redd.it/ybb2xn4hs6a61.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));

    ctx.drawImage(avatar, 329, 140, 220, 220);
    const attachment = new MessageAttachment(canvas.toBuffer(), `Drip${member.user.username}.jpg`);
    message.channel.send(attachment);
};
module.exports.config = {
    name: 'drip',
    aliases: [],
};
