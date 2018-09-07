"use strict";

const express = require('express');
const OrderController = require("../../controller/panel/OrderController");
const router = express.Router();

/* Orders */

router.get('/orders' ,OrderController.GetOrdersListAction );
router.get('/orders/status' ,OrderController.GetStatusListAction );
router.get('/orders/:id' ,OrderController.GetSingleOrderAction );
router.get('/orders/status/new' ,OrderController.GetAddStatusAction );
router.post('/orders/status/new' ,OrderController.AddStatus );
router.put('/orders/:id' ,OrderController.ChangeStatusOrder );
router.delete('/orders' ,OrderController.RemoveOrder );
router.delete('/orders/status/delete' ,OrderController.RemoveStatus );

module.exports = router;