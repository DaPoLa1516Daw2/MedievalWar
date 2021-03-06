'use strict';

const mongoose = require('mongoose');

/**
 * schema for soldiers object
 */
let schema = new mongoose.Schema({
    number: {type: Number},
    attack: {type: Number},
    gold: {type: Number},
    stone: {type: Number},
    time: {type: Number},
    finish: {type: Number}
});

module.exports = schema;