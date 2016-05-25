'use strict';

const mongoose = require('mongoose');
const db = require('../db');
const Castle = require('../schemas/castle');
const Mine = require('../schemas/mine');
const Wall = require('../schemas/wall');
const buildingArmy = require('../schemas/building_army');
const Tower = require('../schemas/tower');
const Soliders = require('../schemas/soliders');

const Church = require('../schemas/church');
const Forge = require('../schemas/forge');
const Tavern = require('../schemas/tavern');
const Warehouse = require('../schemas/warehouse');
const Market = require('../schemas/market');


let schema = new mongoose.Schema({
    castle: {type: Castle},
    goldMine: {type: Mine},
    stoneMine: {type: Mine},
    wall: {type: Wall},
    barracks: {type: buildingArmy},
    cavalry: {type: buildingArmy},
    tower: {type: Tower},
    church: {type: Church},
    forge: {type: Forge},
    tavern: {type: Tavern},
    warehouse: {type: Warehouse},
    market: {type: Market},
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