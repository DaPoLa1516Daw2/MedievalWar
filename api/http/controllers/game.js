const express = require('express');
const User = require('../../db/models/users');
const Game = require('../../db/models/game');

let router = module.exports = express.Router();

router.get('/:id', (req , res) =>{

    var id = req.params.id;

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