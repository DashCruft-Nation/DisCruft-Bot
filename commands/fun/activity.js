/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
const fetch = require('node-fetch').default;
const { Client, Message } = require('discord.js');
const PREFIX = "?";
const ACTIVITIES = {
  "poker": {
    id: "755827207812677713",
    name: "Poker Night"
  },
  "betrayal": {
    id: "773336526917861400",
    name: "Betrayal.io"
  },
  "youtube": {
    id: "755600276941176913",
    name: "YouTube Together"
  },
  "fishington": {
    id: "814288819477020702",
    name: "Fishington.io"
  }
};

/**
 * JSDOC
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */
module.exports.run = async (client, message, args) => {
  const channel = message.guild.channels.cache.get(args[0]);
  if (!channel || channel.type !== "voice") return message.channel.send("❌ | Invalid channel specified!");
  if (!channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")) return message.channel.send("❌ | I need `CREATE_INSTANT_INVITE` permission");
  const activity = ACTIVITIES[args[1] ? args[1].toLowerCase() : null];
  if (!activity) return message.channel.send(`❌ | Correct formats:\n${Object.keys(ACTIVITIES).map(m => `- **${PREFIX}activity <Channel_ID> ${m}**`).join("\n")}`);

  fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
    method: "POST",
    body: JSON.stringify({
      max_age: 86400,
      max_uses: 0,
      target_application_id: activity.id,
      target_type: 2,
      temporary: false,
      validate: null
    }),
    headers: {
      "Authorization": `Bot ${client.token}`,
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(invite => {
      if (invite.error || !invite.code) return message.channel.send(`❌ | Could not start **${activity.name}**!`);
      message.channel.send(`✅ | Click here to start **${activity.name}** in **${channel.name}**: <https://discord.gg/${invite.code}>`);
    })
    .catch(e => {
      message.channel.send(`❌ | Could not start **${activity.name}**!`);
    })
};

module.exports.config = {
  name: 'activity',
  aliases: ['yt'],
  description: 'Start an activity on a Voice Channel!',
};
