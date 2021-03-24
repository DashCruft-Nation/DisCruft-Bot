const { Schema, model } = require('mongoose');

const Guilds = new Schema({
    id: { type: String, required: true },
    prefix: { type: String, default: '?' }
});

module.exports = model('Guilds', Guilds);
