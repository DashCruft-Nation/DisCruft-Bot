/* eslint-disable no-unused-vars */
const Fetch = require("node-fetch").default;
const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
  if (!args[0]) return message.channel.send("Please Give Content!");
  const { binary } = await (
    await Fetch(
      `https://some-random-api.ml/binary?text=${encodeURI(args.join(" "))}`
    )
  ).json();
  return message.channel.send(
    binary || "Something Went Wrong, Try Again Later!"
  );
};
module.exports.config = {
  name: "binary",
  aliases: [],
  description: "Sends your text into binary,",
};
