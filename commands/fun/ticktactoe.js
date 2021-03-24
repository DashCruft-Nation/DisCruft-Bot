const Discord = require('discord.js')
const reconlx = require("reconlx")


module.exports.run = async (client, message, args) => {
    var game = new reconlx.tictactoe({
        message: message,
       player_two: message.mentions.members.first(),
        })


}
module.exports.config = {
	name: 'ticktactoe',
	aliases: [],
};