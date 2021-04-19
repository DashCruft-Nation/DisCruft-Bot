const Discord = require('discord.js');
const translate = require("@vitalets/google-translate-api");
module.exports.run = async (client, message, args) => {
    translate(`${args.slice(0).join( )}`, {from: `${args[1]}`, to: `${args[2]}`}).then(res => {
        const embed = new Discord.MessageEmbed()
        .setTitle('DisCruft')
        .setDescription(`Here is the translate result :- \n${res.text}`)
        .setColor('#2f3136')
        .setFooter("command by PIE IS LIVE")
        .setTimestamp();
    message.reply(embed);
})
}
module.exports.config = {
	name: 'translate',
	aliases: [],
	description: 'It will translate anything from any language to any language \n usage : ?translate (text) (from language) (to language)',
}; 