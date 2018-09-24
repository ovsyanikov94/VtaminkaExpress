"use strict";

const express = require('express');
const AboutController = require("../../controller/panel/AboutController");
const AdminController = require("../../controller/panel/AdminController");

const router = express.Router();

/* Localization */

router.get('/about/' , AdminController.CheckAdminAccess ,  AboutController.GetTextAboutAction );
router.put('/about/update' ,AdminController.CheckAdminAccess , AboutController.UpdateTextAbout );


module.exports = router;