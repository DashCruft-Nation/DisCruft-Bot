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
		this.login('NzQxMDAwODY1Mjg4MjkwNDM1.XyxM1Q.deoXvo_y4jo7M89X2uh-Drz0WLU');
	}
};
