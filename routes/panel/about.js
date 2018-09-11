"use strict";

const express = require('express');
const AboutController = require("../../controller/panel/AboutController");

const router = express.Router();

/* Localization */

router.get('/about/' , AboutController.GetTextAbout );


module.exports = router;