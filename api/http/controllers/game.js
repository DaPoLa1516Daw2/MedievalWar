'use strict';

const express = require('express');
const Game = require('../../db/models/game');

let router = module.exports = express.Router();

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

router.put('/:_id', (req, res) => {

    var id = req.params._id;

    var game = req.body;

    console.log('guardando', game);

    Game.findOne({_id: id}, (err, g) => {

        if(err) {
            res.sendStatus(500);
        }else if(!g) {
            res.sendStatus(404);
        } else {

            console.log(g);
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