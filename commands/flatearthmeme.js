/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const axios = require('axios');
const { Client, Message } = require('discord.js');
/**
 * JSDOC
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */
module.exports.run = async (client, message, args) => {
	// nuggetapi pog :LMFAO:
 const memeEmbed = new Discord.MessageEmbed();
    got('https://www.reddit.com/r/flatearth/random/.json').then(response => {
      let content = JSON.parse(response.body);
      let permalink = content[0].data.children[0].data.permalink;
      let memeURL = `https://reddit.com${permalink}`;
      let memeImage = content[0].data.children[0].data.url;
      let memeTitle = content[0].data.children[0].data.title;
      let memeUpvotes = content[0].data.children[0].data.ups;
      let memeDownvotes = content[0].data.children[0].data.downs;
      let memeNumComments = content[0].data.children[0].data.num_comments;

      memeEmbed.setTitle(`${memeTitle}`);
      memeEmbed.setURL(`${memeURL}`);
      memeEmbed.setImage(memeImage);
      memeEmbed.setColor('RED');

      message.channel.send(memeEmbed);
    });
module.exports.config = {
	name: 'flatearth',
	aliases: [],
};
