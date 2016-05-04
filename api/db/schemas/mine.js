'use strict';

const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    level: {type: Number},
    gold: {type: Number},
    stone: {type: Number},
    income: {type: Number}

});

module.exports = schema;