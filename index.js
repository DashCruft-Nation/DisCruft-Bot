const Discord = require('discord.js');
const client = new Discord.Client({
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
	ws: {
		intents: Discord.Intents.ALL,
	},
	disableMentions: 'everyone',
});
const { loadCommands } = require('./utils/loadCommands');

require('./utils/loadEvents')(client);
require('dotenv').config();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.snipes = new Map();

loadCommands(client);
client.login(process.env.TOKEN);
