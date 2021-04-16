/* eslint-disable no-unused-vars */
const schema = require('../database/models/Guilds');
const Discord = require('discord.js');
const Canvas = require("canvas");
const { registerFont, createCanvas } = require('canvas')

registerFont('./arialblack.ttf', { family: 'arial' })

/**
 *
 * @param {Discord.GuildMember} member
 * @returns

 */
module.exports = async (client, member) => {
  let c = "https://i.imgur.com/RhAzf2d.png";

  if (!c) return;
  if (!member.guild) return;

  const canvas = Canvas.createCanvas(1772, 633);

  const ctx = canvas.getContext('2d');

  const background = await Canvas.loadImage(c);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#000000';
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  var textString3 = `${member.user.username}`;

  if (textString3.length >= 14) {
    ctx.font = 'bold 100px "arial"';
    ctx.fillStyle = '#0a0202';
    ctx.fillText(textString3, 720, canvas.height / 2 + 20);
  }
  //else dont do it
  else {
    ctx.font = 'bold 150px "arial"';
    ctx.fillStyle = '#000000';
    ctx.fillText(textString3, 720, canvas.height / 2 + 20);
  }
  //define the Discriminator Tag
  var textString2 = `#${member.user.discriminator}`;
  ctx.font = 'bold 40px "arial"';
  ctx.fillStyle = '#000000';
  ctx.fillText(textString2, 730, canvas.height / 2 + 58);

  var textString4 = `You are the ${member.guild.memberCount}th member in ${member.guild.name}!`;
  ctx.font = 'bold 60px "arial"';
  ctx.fillStyle = '#000000';
  ctx.fillText(textString4, 750, canvas.height / 2 + 125);

  var textString4 = `Server: ${member.guild.name}`;
  ctx.font = 'bold 60px "bi"';
  ctx.fillStyle = '#000000';
  ctx.fillText(textString4, 700, canvas.height / 2 - 150);
 
  ctx.beginPath();
  ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);//position of img
  ctx.closePath();
  ctx.clip();
 
  const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));

  ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);

  

  let data = await schema.findOne({
    id: member.guild.id,
  });
  if (!data) {
    data = await new schema({
      id: member.guild.id,
      prefix: '?',
      locked: false,
      lockedChannels: [],
      welcome: true,
    }).save();
  }
  if (data.welcome === true && data.welcomeChannel) {
  }try{
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
    const welcomeembed = new Discord.MessageEmbed()
    .setTitle(`Welcome to ${member.guild.name}`)
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter("Welcome", member.guild.iconURL({ dynamic: true }))
    .setDescription(`Hi <@${member.id}>!, read and accept the rules!`)
    const g = client.guilds.cache.get("644764850706448384")
    const ch = g.channels.cache.get('825224040641724416')
   ch.send(welcomeembed)
   ch.send(attachment)
}catch(e){
 console.log(e)
}
};
