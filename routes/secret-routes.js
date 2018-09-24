"use strict";

const express = require('express');
const router = express.Router();
const passport = require('passport');

const AdminController = require('../controller/panel/AdminController');

router.post('/new-admin' , AdminController.RegisterAdmin );

let settings = {
    successRedirect: '/admin/panel',
    failureRedirect: '/admin/secret/auth',
    session: true
};

router.get('/auth' , AdminController.AuthAdminAction);
router.post('/auth' , passport.authenticate('local', settings ) , ( req , res )=>{
    console.log('post.auth');
});

module.exports =  router;