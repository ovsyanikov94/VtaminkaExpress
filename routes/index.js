"use strict";

const express = require('express');
const router = express.Router();

const HomeController = require('../controller/panel/HomeController');

const AdminController = require('../controller/panel/AdminController');

const passport = require('passport');

let settings = {

    successRedirect: '/admin/panel',
    failureRedirect: '/admin/secret/auth'

};

/* GET home page. */
router.get('/', passport.authenticate('local' , settings));
router.get('/panel', AdminController.CheckAdminAccess , HomeController.HomeAction );


module.exports = router;
