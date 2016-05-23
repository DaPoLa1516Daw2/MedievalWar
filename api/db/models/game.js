'use strict';

const mongoose = require('mongoose');
const db = require('../db');
const Castle = require('../schemas/castle');
const Mine = require('../schemas/mine');
const Wall = require('../schemas/wall');
const Barracks = require('../schemas/barracks');
const Tower = require('../schemas/tower');
const Soliders = require('../schemas/soliders');


let schema = new mongoose.Schema({
    castle: {type: Castle},
    goldMine: {type: Mine},
    stoneMine: {type: Mine},
    wall: {type: Wall},
    barracks: {type: Barracks},
    tower: {type: Tower},
    warrior: {type: Soliders},
    archer: {type: Soliders},
    resources: {type: Object},
    attacks: {type: Object},
    world: {type: Number},
    country: {type: Number},
    defense: {type: Number},
    power: {type: Number}

});

module.exports = db.model('Game', schema);