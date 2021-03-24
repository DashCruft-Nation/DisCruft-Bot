const {
	Intents,
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
client.distube = new DisTube(client, {
	leaveOnEmpty: false,
	searchSongs: false,
	emitNewSongOnly: true,
	leaveOnFinish: false,
});

const mongoose = require('mongoose');
mongoose.connect(process.env.MongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

client.setup();