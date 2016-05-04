'use strict';

const mongoose = require('mongoose');
const db = require('../db');

let schema = new mongoose.Schema({
    username: {type: String},
    password: {type: String}
    //game: {type: Ob}
});

module.exports = db.model('User', schema);