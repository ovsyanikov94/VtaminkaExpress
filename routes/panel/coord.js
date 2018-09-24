"use strict";

const express = require('express');
const CoordController = require("../../controller/panel/CoordController");
const AdminController = require("../../controller/panel/AdminController");

const router = express.Router();

router.use(AdminController.CheckAdminAccess);

/* Categories */
router.get('/coord-settings', CoordController.GetCoordAction );
router.put('/coord-settings' , CoordController.UpdateCoords );

module.exports = router;