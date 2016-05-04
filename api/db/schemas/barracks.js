'use strict';

const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    level: {type: Number},
    gold: {type: Number},
    stone: {type: Number}

});

module.exports = schema;