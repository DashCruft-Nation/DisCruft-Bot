/* eslint-disable no-unused-vars */
const schema = require('../database/models/Guilds');
const Discord = require('discord.js');
const Canvas = require("canvas");
const { registerFont, createCanvas } = require('canvas')
registerFont('./Debrosee-ALPnL.ttf', { family: 'Roboto' })
registerFont('./Debrosee-ALPnL.ttf', { family: 'deb' })
registerFont('./Debrosee-ALPnL.ttf', { family: 'bi' })

/**
 *
 * @param {Discord.GuildMember} member
 * @returns
 */
module.exports = async (client, member) => {
	let data = await schema.findOne({
		id: member.guild.id,
	});
	if(!data) {
		data = await new schema({
			id: member.guild.id,
			prefix: '?',
			locked: false,
			lockedChannels: [],
			welcome: false,
		}).save();
	}
	if (data.welcome === true && data.welcomeChannel) {
		const msg = data.welcomemsg || `Welcome to the server <@!${member.id}>, we are at ${member.guild.memberCount} members!`;
		member.guild.channels.cache.get(data.welcomeChannel).send(msg);
	}
	let c = "https://cdn.discordapp.com/attachments/807145709966327809/818441700388896808/blue-yellow-background.jpg";
	
	if(!c) return;
      if(!member.guild) return;
      //create a new Canvas
      const canvas = Canvas.createCanvas(1772, 633);
      //make it "2D"
      const ctx = canvas.getContext('2d');
      //set the Background to the welcome.png
      const background = await Canvas.loadImage(c);
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#000000';
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
      //set the first text string 
      var textString3 = `${member.user.username}`;
      //if the text is too big then smaller the text
      if (textString3.length >= 14) {
        ctx.font = 'bold 100px "Roboto"';
        ctx.fillStyle = '#f2f2f2';
        ctx.fillText(textString3, 720, canvas.height / 2 + 20);
      }
      //else dont do it
      else {
        ctx.font = 'bold 150px "Roboto"';
        ctx.fillStyle = '#000000';
        ctx.fillText(textString3, 720, canvas.height / 2 + 20);
      }
      //define the Discriminator Tag
      var textString2 = `#${member.user.discriminator}`;
      ctx.font = 'bold 40px "Roboto"';
      ctx.fillStyle = '#000000';
      ctx.fillText(textString2, 730, canvas.height / 2 + 58);
      //define the Member count
      var textString4 = `YOU ARE THE ${member.guild.memberCount}th MEMBER`;
      ctx.font = 'bold 60px "deb"';
      ctx.fillStyle = '#000000';
      ctx.fillText(textString4, 750, canvas.height / 2 + 125);
      //get the Guild Name
      var textString4 = `${member.guild.name}`;
      ctx.font = 'bold 60px "bi"';
      ctx.fillStyle = '#000000';
      ctx.fillText(textString4, 700, canvas.height / 2 - 150);
      //create a circular "mask"
      ctx.beginPath();
      ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);//position of img
      ctx.closePath();
      ctx.clip();
      //define the user avatar
      const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
      //draw the avatar
      ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
      //get it as a discord attachment
      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
      //define the welcome embed
      const welcomeembed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Welcome", member.guild.iconURL({ dynamic: true }))
        .setDescription(`**Welcome to ${member.guild.name}!**
      Hi <@${member.id}>!, read and accept the rules!`)
 const g = client.guilds.cache.get("644764850706448384")
      const ch = g.channels.cache.get('825224040641724416')
try{ 
   ch.send(welcomeembed)
   ch.send(attachment)
}catch(e){
 console.log(e)
}
};
