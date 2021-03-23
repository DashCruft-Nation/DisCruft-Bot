const Discord = require('discord.js');
const fetch = require("node-fetch").default;

module.exports.run = async (bot, message, args) => {
    fetch(`https://api.monkedev.com/attachments/monkey?key=YiGNicedKYp9c15HbrKrUkMkG`)
        .then(response => response.json())
        .then(data => {
            message.reply(data.url)
        })
        .catch(() => {
            message.reply("Couldn't fetch image!");
        })
}

module.exports.config = {
    name: "monke",
    aliases: ['monkey']
}