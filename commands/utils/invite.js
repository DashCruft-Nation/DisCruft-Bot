/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
	const embed = new MessageEmbed()
		.setTitle('DisCruft')
		.setURL('https://discord.com/api/oauth2/authorize?client_id=823751227405893672&permissions=1544420598&scope=bot')
		.setColor('#2f3136')
		.setDescription(`${bot.user.username} is a community made \`open-source\` discord bot by **DashCruft Nation**! DisCruft is a multi-based bot where we are trying to include everything possible.

    - You can invite DisCruft with this **[LINK](https://discord.com/api/oauth2/authorize?client_id=719267397017796689&permissions=1544420598&scope=bot)**!
    - Check out our \`open-source\` github repository **[HERE](https://github.com/DashCruft-Nation/DisCruft-Bot)**!`)
		.setThumbnail(bot.user.displayAvatarURL());
	message.channel.send(embed);
};

module.exports.config = {
	name: 'invite',
	aliases: ['info'],
	description: 'Invite link and information about our djs bot, DisCruft!',
};
