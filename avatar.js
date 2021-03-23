const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
const user = message.mentions.users.first() || message.author;
var embed = new Discord.MessageEmbed()
.setTitle(`${user.tag}'s avatar!`)
.setColor("#e4101f")
.setImage(user.displayAvatarURL({size: 4096, dynamic: true}))
         message.channel.send(embed) 
module.exports.config = {
	name: 'avatar',
	aliases: ["av"],
};
