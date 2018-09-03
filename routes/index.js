"use strict";

const express = require('express');
const router = express.Router();

const HomeController = require('../controller/panel/HomeController');
/* GET home page. */
router.get('/', HomeController.HomeAction );
router.get('/panel', HomeController.HomeAction );

module.exports = router;
