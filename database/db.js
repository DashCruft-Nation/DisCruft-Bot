require('dotenv').config();

const mongoose = require('mongoose');
const fs = require('fs');

module.exports = client => {
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
}
