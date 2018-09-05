"use strict";

const express = require('express');

const router = express.Router();

const OrderController = require('../../controller/api/OrderController');

router.post('/order/new' , OrderController.AddOrder );



module.exports = router;