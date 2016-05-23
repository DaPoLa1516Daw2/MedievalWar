'use strict';

const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    number: {type: Number},
    gold: {type: Number},
    stone: {type: Number},
    time: {type: Number},
    finish: {type: Number}
});

module.exports = schema;