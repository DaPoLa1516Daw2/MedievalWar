'use strict';

const mongoose = require('mongoose');
const db = require('../db');
const Castillo = require('../schemas/castillo');
const Mine = require('../schemas/mine');
const Wall = require('../schemas/wall');


let schema = new mongoose.Schema({
    castillo: {type: Castillo},
    goldMine: {type: Mine},
    stoneMine: {type: Mine},
    wall: {type: Wall}

});

module.exports = db.model('Game', schema);