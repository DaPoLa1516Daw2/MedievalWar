'use strict';

const mongoose = require('mongoose');
const db = require('../db');

let schema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: {type: String},
    game: {type: mongoose.Schema.Types.ObjectId}
});

module.exports = db.model('User', schema);