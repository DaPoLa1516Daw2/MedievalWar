'use strict';

const mongoose = require('mongoose');
const db = require('../db');
const Castle = require('../schemas/castle');
const Mine = require('../schemas/mine');
const Wall = require('../schemas/wall');
const Barracks = require('../schemas/barracks');
const Tower = require('../schemas/tower');


let schema = new mongoose.Schema({
    castle: {type: Castle},
    goldMine: {type: Mine},
    stoneMine: {type: Mine},
    wall: {type: Wall},
    barracks: {type: Barracks},
    tower: {type: Tower},
    army: {type: Object},
    resources: {type: Object},
    world: {type: Number},
    country: {type: Number}

});

module.exports = db.model('Game', schema);