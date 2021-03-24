const {
	Collection,
	Client,
	MessageEmbed,
} = require('discord.js');
const Discord = require('discord.js');

module.exports = class DisCruft extends Client {
	constructor(options) {
		super(options);

		this.commands = new Collection();
		this.aliases = new Collection();
		this.snipes = new Map();
		this.config = require('./config.json');
		this.cooldownFunction = require('./functions/functions');
	}


	setup() {
		require('./utils/loadCommands')(this);
		require('./utils/loadEvents')(this);
		const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
		this.distube
			.on("finish", message => message.channel.send(new MessageEmbed().setTitle("No more song in queue")))
			.on("initQueue", queue => {
				queue.autoplay = false;
				queue.volume = 100;
			})
			// DisTubeOptions.searchSongs = true
			.on("noRelated", message => message.channel.send(new MessageEmbed().setTitle("Can't find related video to play. Stop playing music.")))
			.on("playSong", (message, queue, song) => message.channel.send(new MessageEmbed().setTitle("Playing").setDescription(`Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)} `).setThumbnail(`${song.thumbnail}`))
			)
			.on("addSong", (message, queue, song) => message.channel.send(new MessageEmbed().setTitle("Added").setDescription(`Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`)
			))
			.on("playList", (message, queue, playlist, song) => message.channel.send(
				new MessageEmbed().setTitle("Play").setDescription(`Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`)
			))
			.on("addList", (message, queue, playlist) => message.channel.send(
				new MessageEmbed().setTitle("Added").setDescription(`Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`)
			))
			// DisTubeOptions.searchSongs = true
			.on("searchResult", (message, result) => {
				let i = 0;
				message.channel.send(new MessageEmbed().setTitle("Choose an option from below").setDescription(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`));
			})
			// DisTubeOptions.searchSongs = true
			.on("searchCancel", (message) => message.channel.send(new MessageEmbed().setTitle(`Searching canceled`)))
			.on("error", (message, e) => {
				console.error(e)
				message.channel.send("An error encountered: " + e);
			});
		this.login(lol);
	}
};
