"use strict";

const express = require('express');
const router = express.Router();

const HomeController = require('../controller/panel/HomeController');

const AdminController = require('../controller/panel/AdminController');

const passport = require('passport');

let settings = {

    successRedirect: '/admin/panel',
    failureRedirect: '/admin/secret/auth',
    session: true

};

/* GET home page. */
router.get('/', passport.authenticate('local' , settings) , HomeController.HomeAction );
router.get('/panel',passport.authenticate('local' , settings ), HomeController.HomeAction );


module.exports = router;
