"use strict";

const express = require('express');
const AboutController = require("../../controller/panel/AboutController");
const AdminController = require("../../controller/panel/AdminController");

const router = express.Router();

/* Localization */

router.use(AdminController.CheckAdminAccess);

router.get('/about/' ,  AboutController.GetTextAboutAction );
router.put('/about/update', AboutController.UpdateTextAbout );


module.exports = router;