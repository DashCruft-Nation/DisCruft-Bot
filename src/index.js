const {
	Intents,
} = require('discord.js');
const DisCruft = require('./DisCruft');

require('dotenv').config();
const client = new DisCruft({
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
	ws: {
		intents: Intents.ALL,
	},
	disableMentions: 'everyone',
});
client.queue = new Map();
const mongoose = require('mongoose');
mongoose.connect(process.env.MongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

client.setup();