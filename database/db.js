require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const Manager = require('./DatabaseManager');

class Database {
    constructor() {
        this.models = new Map();
        
        mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        mongoose.connection.on('connect', () => {
            console.log('Connected to database.');
        });

        mongoose.connection.on('disconnect', () => {
            console.log('Lost connection to database.');
        });

        const models = fs.readdirSync('./database/models/');
        for (const file of models) {
            const e = require(`./models/${file}`);
            this.models.set(file.split('.')[0], new Manager(e));
        }
    }
    
    getModel(model) {
        return this.models.get(model);
    }
}

module.exports = Database;
