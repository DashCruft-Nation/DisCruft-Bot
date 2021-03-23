const { Intents } = require('discord.js');
const DisCruft = require('./DisCruft');
require('dotenv').config();
const client = new DisCruft({
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
	ws: {
		intents: Intents.ALL,
	},
	disableMentions: 'everyone',
});
client.setup();