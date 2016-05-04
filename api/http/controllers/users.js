'use strict';

const express = require('express');
const User = require('../../db/models/users');
const sha1 = require('sha1');

let router = module.exports = express.Router();

router.post('/', (req, res) => {

    let user = req.body;
    user.password = sha1(user.password);

    User.create(user, (err, user) => {
       if(err) {
           res.sendStatus(500);
       } else if(!user) {
           res.sendStatus(404);
       }else {
           res.json(user);
       }
    });


});