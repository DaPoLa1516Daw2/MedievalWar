'use strict';

const express = require('express');

const deleteAngularPropsMdlw = require('./middlewares/delete_angular_props');
const indexCtrl = require('./controllers');


//const clientCtrl = require('./controllers/client');
const userCtrl = require('./controllers/users');


let router = module.exports = express.Router();

router.use('/*', [deleteAngularPropsMdlw]);

//router.use('/auth', authCtrl);
//router.use('/language', [authMdlw, languageCtrl]);
//router.use('/country', [authMdlw, countryCtrl]);
//router.use('/region', [authMdlw, regionCtrl]);
//router.use('/city', [authMdlw, cityCtrl]);
//router.use('/activity', [authMdlw, activityCtrl]);
//router.use('/hotel', [authMdlw, hotelCtrl]);
//router.use('/trip', [authMdlw, tripCtrl]);
//router.use('/chat', [authMdlw, chatCtrl]);
//router.use('/guide', [authMdlw, guideCtrl]);
//router.use('/service', [authMdlw, serviceCtrl]);
router.use('/user', [userCtrl]);
router.use('/*', indexCtrl);

//router.all('/*', authMdlw);
//router.use('/activity', activityCtrl);
//router.use('/hotel', hotelCtrl);
