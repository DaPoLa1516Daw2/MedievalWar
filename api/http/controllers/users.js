'use strict';

const express = require('express');
const User = require('../../db/models/users');
const Game = require('../../db/models/game');

const sha1 = require('sha1');

let router = module.exports = express.Router();

var world = 1;
var country = 1;

const g = {
    castle: {
        level: 0,
        gold: 700,
        stone: 500
    },
    goldMine: {
        level: 0,
        gold: 0,
        stone: 0,
        income: 450
    },
    stoneMine: {
        level: 0,
        gold: 50,
        stone: 0,
        income: 250
    },
    wall: {
        level: 0,
        gold: 2000,
        stone: 2500,
        defense: 400
    },
    barracks: {
        level: 0,
        gold: 400,
        stone: 150
    },
    tower: {
        level: 0,
        gold: 600,
        stone: 400,
        defense: 100
    },
    army: {},
    resources: {
        gold: 1000,
        stone: 600
    }
};

router.post('/', (req, res) => {

    let user = req.body;
    user.password = sha1(user.password);

    User.create(user, (err, user) => {
       if(err) {
           res.sendStatus(500);
       } else if(!user) {
           res.sendStatus(404);
       }else {

           g.country = country;
           g.world = world;

           Game.create(g, (err, game) => {
               if(err) {
                   res.sendStatus(500);
               } else if(!game) {
                   res.sendStatus(404);
               }else {

                   user.game = game._id;

                   User.findByIdAndUpdate(user._id, user, (err, u) => {
                       if(err) {
                           res.sendStatus(500);
                       } else if(!u) {
                           res.sendStatus(404);
                       }else {
                           country ++;
                           if(country == 6) {
                                world ++;
                                country = 1;
                           }
                           res.json(user);
                       }
                   });
               }
           });
       }
    });




});