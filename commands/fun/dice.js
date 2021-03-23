const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
  let dice = Math.floor(Math.random() * 6) + 1
    - 1 + 1;

  let diceembed = new Discord.MessageEmbed()
    .setAuthor(message.member.user.tag)
    .setColor("RANDOM")
    .setTimestamp()
    .setDescription(`You got a **${dice}**`);
  message.channel.send(diceembed);
}

module.exports.config = {
  name: 'dice',
  aliases: ['diceroll'],
  description: "Rolls dice",
};
