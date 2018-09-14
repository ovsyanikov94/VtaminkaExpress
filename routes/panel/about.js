"use strict";

const express = require('express');
const AboutController = require("../../controller/panel/AboutController");

const router = express.Router();

/* Localization */

router.get('/about/' , AboutController.GetTextAboutAction );
router.put('/about/update' , AboutController.UpdateTextAbout );


module.exports = router;