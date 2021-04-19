/* eslint-disable no-unused-vars */
const schema = require('../../database/models/Guilds');
const Discord = require('discord.js');
const Canvas = require('canvas');
Canvas.registerFont('./Debrosee-ALPnL.ttf', { family: 'deb' });

/**
 * @param {Discord.Client} client
 * @param {Discord.GuildMember} member
 * @returns undefined
 */
module.exports = async (client, member) => {
const c = 'https://i.imgur.com/RhAzf2d.png';

		if (!c) return;
		if (!member.guild) return;
		// create a new Canvas
		const canvas = Canvas.createCanvas(1772, 633);
		// make it "2D"
		const ctx = canvas.getContext('2d');
		// set the Background to the welcome.png
		const background = await Canvas.loadImage(c);
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
		ctx.strokeStyle = '#000000';
		ctx.strokeRect(0, 0, canvas.width, canvas.height);
		// set the first text string
		const textString3 = `${member.user.username}`;
		// if the text is too big then smaller the text
		if (textString3.length >= 14) {
			ctx.font = 'bold 100px "deb"';
			ctx.fillStyle = '#000000';
			ctx.fillText(textString3, 720, canvas.height / 2 + 20);
		}
		// else dont do it
		else {
			ctx.font = 'bold 150px "deb"';
			ctx.fillStyle = '#000000';
			ctx.fillText(textString3, 720, canvas.height / 2 + 20);
		}
		// define the Discriminator Tag
		const textString2 = `#${member.user.discriminator}`;
		ctx.font = 'bold 40px "deb"';
		ctx.fillStyle = '#000000';
		ctx.fillText(textString2, 730, canvas.height / 2 + 58);
		// define the Member count
		const textString4 = `YOU ARE THE ${member.guild.memberCount}th MEMBER`;
		ctx.font = 'bold 60px "deb"';
		ctx.fillStyle = '#000000';
		ctx.fillText(textString4, 750, canvas.height / 2 + 125);
		// get the Guild Name
		const textString5 = `${member.guild.name}`;
		ctx.font = 'bold 60px "deb"';
		ctx.fillStyle = '#000000';
		ctx.fillText(textString5, 700, canvas.height / 2 - 150);
		// create a circular "mask"
		ctx.beginPath();
		ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.clip();
		// define the user avatar
		const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg', size: 2048 }));
		// draw the avatar
		ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
		// get it as a discord attachment
		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
		// define the welcome embed
		const welcometitles = [`**${member.user.username}** just landed!`, `Just saw **${member.user.username}** hop in the server`, `**${member.user.username}** thanks for joining!`, `Woah ${member.user.username} just joined!`];
		const welcomeembed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setTimestamp()
			.setTitle(welcometitles[Math.floor(Math.random() * welcometitles.length)])
			.setDescription(data.welcomemsg)
			.setFooter('Welcome', member.guild.iconURL({ dynamic: true }))
			.attachFiles([attachment]);
		const ch = member.guild.channels.cache.get("825224040641724416");
		try {
			ch.send(welcomeembed);
		}
		catch (e) {
			console.log(e);
		}
	let data = await schema.findOne({
		id: member.guild.id,
	});
	if (!data) {
		data = await new schema({
			id: member.guild.id,
			prefix: '?',
			locked: false,
			lockedChannels: [],
			welcome: false,
		}).save();
	}
	if (data.welcome === true && data.welcomeChannel) {
		welcome 
	}
};
