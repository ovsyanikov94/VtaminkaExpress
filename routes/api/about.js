"use strict";

const express = require('express');

const router = express.Router();

const AboutController = require('../../controller/api/AboutController');

router.get('/about/text' , AboutController.GetAbout );

module.exports = router;