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
	searchSongs: true,
	emitNewSongOnly: true,
	leaveOnFinish: false,
	customFilters:
	{
		"clear": "dynaudnorm=f=200",
		"bassboost": "bass=g=20,dynaudnorm=f=200",
		"8d": "apulsator=hz=0.08",
		"vaporwave": "aresample=48000,asetrate=48000*0.8",
		"nightcore": "aresample=48000,asetrate=48000*1.25",
		"phaser": "aphaser=in_gain=0.4",
		"purebass": "bass=g=20,dynaudnorm=f=200,asubboost",
		"tremolo": "tremolo",
		"vibrato": "vibrato=f=6.5",
		"reverse": "areverse",
		"treble": "treble=g=5",
		"surrounding": "surround",
		"pulsator": "apulsator=hz=1",
		"subboost": "asubboost",
		"karaoke": "stereotools=mlev=0.03",
		"flanger": "flanger",
		"gate": "agate",
		"haas": "haas",
		"mcompand": "mcompand"
	}

});


const mongoose = require('mongoose');
mongoose.connect(process.env.MongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

client.setup();