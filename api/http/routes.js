'use strict';

const express = require('express');

const deleteAngularPropsMdlw = require('./middlewares/delete_angular_props');
const indexCtrl = require('./controllers');


const userCtrl = require('./controllers/users');
const gameCtrl = require('./controllers/game');


let router = module.exports = express.Router();

router.use('/*', [deleteAngularPropsMdlw]);


router.use('/user', [userCtrl]);
router.use('/game', [gameCtrl]);
router.use('/*', indexCtrl);


