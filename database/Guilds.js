const { Schema, model } = require('mongoose');

const Guilds = new Schema({
    id: { type: String, required: true },
    prefix: { type: String, default: '?' },
    locked: { type: Boolean, default: false },
    lockedChannels: { type: Array },
    welcome: { type: Boolean, default: false },
    welcomeChannel: { type: String, default: null },
    welcomemsg: { type: String, default: null },
});

module.exports = model('Guilds', Guilds);