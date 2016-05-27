'use strict';

const express = require('express');
const User = require('../../db/models/users');
const Game = require('../../db/models/game');

const sha1 = require('sha1');

let router = module.exports = express.Router();

var world = 1;
var country = 1;

_count();

/**
 * crate new game
 * @type {{castle: {level: number, gold: number, stone: number, time: number}, goldMine: {level: number, gold: number, stone: number, income: number, time: number}, stoneMine: {level: number, gold: number, stone: number, income: number, time: number}, wall: {level: number, gold: number, stone: number, defense: number, time: number}, barracks: {level: number, gold: number, stone: number, time: number}, cavalry: {level: number, gold: number, stone: number, time: number}, church: {level: number, gold: number, stone: number, time: number}, forge: {level: number, gold: number, stone: number, time: number}, tavern: {level: number, gold: number, stone: number, time: number}, warehouse: {level: number, gold: number, stone: number, time: number}, market: {level: number, gold: number, stone: number, time: number}, tower: {level: number, gold: number, stone: number, defense: number, time: number}, warrior: {number: number, gold: number, stone: number, attack: number, time: number}, archer: {number: number, gold: number, stone: number, attack: number, time: number}, resources: {gold: number, stone: number}, defense: number, power: number, attacks: {gold: number, stone: number}}}
 */
const g = {
    castle: {
        level: 0,
        gold: 700,
        stone: 500,
        time: 300000
    },
    goldMine: {
        level: 0,
        gold: 0,
        stone: 0,
        income: 450,
        time: 60000
    },
    stoneMine: {
        level: 0,
        gold: 50,
        stone: 0,
        income: 250,
        time: 60000
    },
    wall: {
        level: 0,
        gold: 2000,
        stone: 2500,
        defense: 400,
        time: 1800000
    },
    barracks: {
        level: 0,
        gold: 400,
        stone: 150,
        time: 300000
    },
    cavalry: {
        level: 0,
        gold: 700,
        stone: 500,
        time: 3600000
    },
    church: {
        level: 0,
        gold: 1000,
        stone: 800,
        time: 14400000
    },
    forge: {
        level: 0,
        gold: 400,
        stone: 400,
        time: 3600000
    },
    tavern: {
        level: 0,
        gold: 550,
        stone: 300,
        time: 1200000
    },
    warehouse: {
        level: 0,
        gold: 1000,
        stone: 740,
        time: 7200000
    },
    market: {
        level: 0,
        gold: 1000,
        stone: 740,
        time: 7200000
    },
    tower: {
        level: 0,
        gold: 600,
        stone: 400,
        defense: 100,
        time: 600000
    },
    warrior: {
        number: 0,
        gold: 50,
        stone: 0,
        attack: 5,
        time: 30000
    },
    archer: {
        number: 0,
        gold: 100,
        stone: 20,
        attack: 15,
        time: 120000
    },
    resources: {
        gold: 1000,
        stone: 600
    },
    defense: 0,
    power: 0,
    attacks: {
        gold: 0,
        stone:0
    }
};

/**
 * crate new user and new game
 */
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

/**
 * get all users
 */
router.get('/all', (req, res) => {

    User.find({}, (err, users) => {
        if(err) {
            console.log(err);
            res.sendStatus(500);
        }else if(!users){
            res.sendStatus(404);
        }else {
            res.json(users);
        }
    })

});

/**
 * get user by user and password
 */
router.get('/:user/:pass', (req , res) =>{

    var user = req.params.user;
    var pass = sha1(req.params.pass);
    var projection = '_id game username password';



    User.findOne({username: user}, projection ,(err, u) => {
        if(err) {
            res.sendStatus(500);
        } else if(!u) {
            res.sendStatus(404);
        } else {
            if(u.password == pass) {
                res.json(u);
            } else {
                res.sendStatus(404);
            }
        }
    })

});

/**
 * count how many worlds and countries are in bd
 * @private
 */
function  _count () {
    User.count({}, function(err, n) {
        
        world = Math.floor(n/6)+1;
        country = (n%6)+1;
    })
}