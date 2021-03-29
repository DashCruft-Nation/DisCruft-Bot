const { Schema, model } = require('mongoose');

const Guilds = new Schema({
	id: { type: String, required: true },
	prefix: { type: String, default: '?' },
	locked: { type: Boolean, default: false },
	lockedChannels: { type: Array },
});

module.exports = model('Guilds', Guilds);