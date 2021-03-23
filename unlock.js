const Discord = module.require("discord.js");
module.exports.run = async (client, message, args) => {
if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.channel.send('You don\'t have permission (MANAGE_CHANNELS) to use this command').then(m => m.delete({timeout: 5000}));
    if (!message.guild.me.hasPermission(['MANAGE_CHANNELS'])) return message.channel.send('I don\'t have permission to use that command').then(m => m.delete({timeout: 5000}))
   message.channel.overwritePermissions([
     {
        id: message.guild.id,
        allow : ['SEND_MESSAGES'],
     },
    ],);
   const embed = new Discord.MessageEmbed()
   .setTitle("Channel Updates")
   .setDescription(`${message.channel} has been Unlocked`)
   .setColor("RANDOM");
   await message.channel.send(embed);
   message.delete();
};
module.exports.config = {
	name: 'unlock',
	aliases: [],
};
