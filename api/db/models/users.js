'use strict';

const mongoose = require('mongoose');
const db = require('../db');

/**
 * User schema for mongoose
 */
let schema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: {type: String},
    game: {type: mongoose.Schema.Types.ObjectId}
});

module.exports = db.model('User', schema);