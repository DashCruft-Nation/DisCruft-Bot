const {
	Intents
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

const DisTube = require('distube');
client.distube = distube = new DisTube(client, {
	leaveOnEmpty: false,
	searchSongs: false,
	emitNewSongOnly: true,
	leaveOnFinish: false
});

client.distube
	.on("playSong", (message, queue, song) => message.channel.send(
		`🎧 Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`
	))
	.on("addSong", (message, queue, song) => message.reply(
		`🎧 Added \`${song.name}\` - \`${song.formattedDuration}\` to the queue by ${song.user}`, {
			allowedMentions: {
				repliedUser: false
			}
		}))
	.on("error", (message, e) => {
		console.error(e)
		message.channel.send("An error encountered: " + e);
	});

client.setup();
