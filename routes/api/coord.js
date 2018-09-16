"use strict";

const express = require('express');

const router = express.Router();

const CoordController = require('../../controller/api/CoordController');

router.get('/cord-settings' , CoordController.GetCoords );

module.exports = router;