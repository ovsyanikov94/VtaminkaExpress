"use strict";

const express = require('express');
const CoordController = require("../../controller/panel/CoordController");

const router = express.Router();

/* Categories */
router.get('/coord-settings', CoordController.GetCoordAction );
router.put('/coord-settings', CoordController.UpdateCoords );

module.exports = router;