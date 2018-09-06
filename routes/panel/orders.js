"use strict";

const express = require('express');
const OrderController = require("../../controller/panel/OrderController");
const router = express.Router();

/* Orders */

router.get('/orders' ,OrderController.GetOrdersListAction );
router.put('/orders/:id' ,OrderController.ChangeStatusOrder );


module.exports = router;