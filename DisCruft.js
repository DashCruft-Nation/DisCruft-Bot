const {
	Collection,
	Client
} = require('discord.js');

module.exports = class DisCruft extends Client {
	constructor(options) {
		super(options);

		this.commands = new Collection();
		this.aliases = new Collection();
		this.snipes = new Map();
		this.config = require('./config.json');
		this.cooldownFunction = require("./functions/functions");
	}


	setup() {
		require('./utils/loadCommands')(this);
		require('./utils/loadEvents')(this);

		this.distube
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

		this.login(process.env.TOKEN);
	}
};