const { Schema, model } = require('mongoose');

const Guilds = new Schema({
	id: { type: String, required: true },
	prefix: { type: String, default: '?' },
	locked: {
		enabled: { type: Boolean, default: false },
		lockChannels: { type: Array, default: [] },
	},
	welcome: {
		enabled: { type: Boolean, default: false },
		channelID: { type: String, default: null },
		message: { type: String, default: null },
	},
	tickets: {
		enabled: { type: Boolean, default: null },
		channelID: { type: String, default: null },
		messageID: { type: String, default: null },
	},
});

module.exports = model('Guilds', Guilds);