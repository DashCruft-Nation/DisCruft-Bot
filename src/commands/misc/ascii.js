const { MessageEmbed } = require('discord.js');
const figlet = require("figlet");
const util = require("util");
/**
 * JSDOC
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {String[]} args
 */

const figletAsync = util.promisify(figlet);
module.exports.run = async (client, message, args, Discord) => {
  const text = args.join(" ");
  if (!text) {
    const embed1 = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Notice!")
      .setDescription("You need to add text to execute the command!")
      .setTimestamp();
    return message.channel.send({ embed: embed1 });
  } else if (text.length > 20) {
    const embed2 = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Error!")
      .setDescription("The inputted text has to be less than 20 characters!")
      .setTimestamp();
    return message.channel.send({ embed: embed2 });
  }

  const rendered = await figletAsync(text);
  message.channel.send("```" + rendered + "```");
};

module.exports.config = {
  name: "ascii",
  aliases: ["unicode", "figlet"],
  description: "This command turns inputted text to ascii art.",
};
