const { Collection, Client } = require('discord.js');
module.exports = class DisCruft extends Client {
	constructor(options) {
		super(options);

		this.commands = new Collection();
		this.aliases = new Collection();
		this.snipes = new Map();
		this.config = require('./config.json');
	}


	setup() {
		require('./utils/loadCommands')(this);
		require('./utils/loadEvents')(this);
		this.login('NzQxMDAwODY1Mjg4MjkwNDM1.XyxM1Q.FrGWuUDFU8jF6qWo8tH5hwJkLCA');
	}
};
