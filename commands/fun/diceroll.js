const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {

    let result = (Math.floor(Math.random() * Math.floor(6) + 1));

    let member = message.author
    
    const dicerollEmbed = new Discord.MessageEmbed()
        .setTitle(`I rolled a **${result}**`)
        .setColor("#ff7100")
        .setFooter(`${member.username}`)
        .setTimestamp();
    if (result === 1) {
        dicerollEmbed.setThumbnail("https://cdn.discordapp.com/attachments/772628353421017118/816404787750109234/15i3bBsz_bMcGQ-UgDMCzQA.png")
    } else if (result === 2) {
        dicerollEmbed.setThumbnail("https://cdn.discordapp.com/attachments/772628353421017118/816404837175918593/1dqZhjZbsbEBDXzKQPAagXw.png")
    } else if (result === 3) {
        dicerollEmbed.setThumbnail("https://cdn.discordapp.com/attachments/772628353421017118/816404895669157891/1DrPdeWaJON0XbtmiEZc3jw.png")
    } else if (result === 4) {
        dicerollEmbed.setThumbnail("https://cdn.discordapp.com/attachments/772628353421017118/816404984089411594/15w7bpE0KdwXc21zUQoOtOw.png")
    } else if (result === 5) {
        dicerollEmbed.setThumbnail("https://cdn.discordapp.com/attachments/772628353421017118/816405032613183518/1UYR8l1h7AI4MNtJWAugyjg.png")
    } else if (result === 6) {
        dicerollEmbed.setThumbnail("https://cdn.discordapp.com/attachments/772628353421017118/816405080273846292/115_KIo9vPHULoA98NYT9jQ.png")
    }

    message.channel.send(dicerollEmbed)
}
    
module.exports.config = {
    name: "diceroll",
    aliases: ["dice", "roll", "dr"]
}
