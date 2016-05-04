'use strict';

const express = require('express');


let router = module.exports = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});
