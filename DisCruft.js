const { Collection, Client } = require('discord.js');
const DB = require('./database/db');
module.exports = class DisCruft extends Client {
	constructor(options) {
		super(options);

		this.commands = new Collection();
		this.aliases = new Collection();
		this.snipes = new Map();
		this.db = new DB;
		this.config = require('./config.json');
	}


	setup() {
		require('./utils/loadCommands')(this);
		require('./utils/loadEvents')(this);
		this.login(process.env.TOKEN);
	}
};
