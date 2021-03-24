/* eslint-disable no-unused-vars */
const Fetch = require("node-fetch").default;
const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js')
module.exports.run = async (client, message, args) => {
  if (!args[0]) return message.channel.send("Please Give Content!");
  const { binary } = await (
    await Fetch(
      `https://some-random-api.ml/binary?text=${encodeURI(args.join(" "))}`
    )
  ).json();
  return message.channel.send(new MessageEmbed()
  .setTitle("Here is your encoded binary!")
  .addField("Output:", binary)
);
};
module.exports.config = {
  name: "binary",
  aliases: [],
  description: "Send your text into binary,",
};
