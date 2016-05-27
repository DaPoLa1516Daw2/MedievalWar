'use strict';

const mongoose = require('mongoose');

/**
 * schema for castle object
 */
let schema = new mongoose.Schema({
    level: {type: Number},
    gold: {type: Number},
    stone: {type: Number},
    time: {type: Number},
    finish: {type: Number}

});

module.exports = schema;