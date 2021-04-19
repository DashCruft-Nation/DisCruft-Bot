const {
	Client,
	Collection,
} = require('discord.js');
module.exports = class DisCruft extends Client {
	constructor(options) {
		super(options);
		this.commands = new Collection();
		this.aliases = new Collection();
		this.slashcommands = new Collection();
		this.snipes = new Map();
		this.config = require('./config.json');
	}

	setup() {
		require('./utils/loadCommands')(this);
		require('./utils/loadClientEvents')(this);
		require('./utils/loadWsEvents')(this);
		require('./utils/loadSlashCommands')(this);

		this.login(process.env.TOKEN);
	}
};
