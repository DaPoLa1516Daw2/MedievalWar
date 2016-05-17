'use strict';

const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    level: {type: Number},
    defense: {type: Number},
    gold: {type: Number},
    stone: {type: Number},
    time: {type: Number},
    finish: {type: Number}

});

module.exports = schema;