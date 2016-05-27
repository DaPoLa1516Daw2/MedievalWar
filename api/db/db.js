'use strict';

const mongoose = require('mongoose');
const config = require('../lib/config');
const recorder = require('./plugins/recorder');


let db = mongoose.createConnection(config.db.url);
db.authenticate(config.db.user,config.db.password, function(err, res){


    db.on('open', () => {
        console.log(`Connected to MongoDB at ${config.db.url}`);
    });

    db.on('error', err => {
        console.error(`Unable to connect to MongoDB at ${config.db.url}`);
        throw err;
    });
});


mongoose.plugin(recorder);

module.exports = db;
