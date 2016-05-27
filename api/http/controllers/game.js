'use strict';

const express = require('express');
const Game = require('../../db/models/game');

let router = module.exports = express.Router();

/**
 * get villages by world
 */
router.get('/map/:world', (req, res) => {

    var world = req.params.world;

    Game.find({world: world}, (err, g) => {
        if(err) {
            console.error(err);
            res.sendStatus(500);
        }else if(!g) {
            res.sendStatus(404);
        } else {
            res.json(g);
        }
    });
});

/**
 * get village by _id
 */
router.get('/:_id', (req , res) =>{

    var id = req.params._id;


    Game.findOne({_id: id}, (err, g)=> {

        if(err) {
            res.sendStatus(500);
        } else if(!g) {
            res.sendStatus(404);
        } else {
            res.json(g);
        }

    });

});

/**
 * update village by _id
 */
router.put('/:_id', (req, res) => {

    var id = req.params._id;

    var game = req.body;

    Game.findOne({_id: id}, (err, g) => {

        if(err) {
            res.sendStatus(500);
        }else if(!g) {
            res.sendStatus(404);
        } else {

            g = game;

            Game.findOneAndUpdate({_id: id}, g, (err, ga) => {

                if(err) {
                    res.sendStatus(500);
                }else if(!ga) {
                    res.sendStatus(404);
                } else {
                    res.sendStatus(200);
                }

            })
        }

    })


});