"use strict";

const express = require('express');
const CoordController = require("../../controller/panel/CoordController");
const AdminController = require("../../controller/panel/AdminController");

const router = express.Router();

/* Categories */
router.get('/coord-settings',  AdminController.CheckAdminAccess , CoordController.GetCoordAction );
router.put('/coord-settings' ,  AdminController.CheckAdminAccess , CoordController.UpdateCoords );

module.exports = router;