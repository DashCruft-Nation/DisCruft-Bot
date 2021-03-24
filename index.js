const {
	Intents
} = require('discord.js');
const DisCruft = require('./DisCruft');
const DisTube = require('distube');
require('dotenv').config();
const client = new DisCruft({
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
	ws: {
		intents: Intents.ALL,
	},
	disableMentions: 'everyone',
});
client.distube = distube = new DisTube(client, {
	leaveOnEmpty: false,
	searchSongs: false,
	emitNewSongOnly: true,
	leaveOnFinish: false
});

client.setup();
