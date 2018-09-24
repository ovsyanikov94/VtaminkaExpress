"use strict";

const express = require('express');
const OrderController = require("../../controller/panel/OrderController");
const AdminController = require("../../controller/panel/AdminController");
const router = express.Router();

/* Orders */

router.get('/orders' ,AdminController.CheckAdminAccess  ,OrderController.GetOrdersListAction );
router.get('/orders/status' , AdminController.CheckAdminAccess  ,OrderController.GetStatusListAction );
router.get('/orders/:id', AdminController.CheckAdminAccess  ,OrderController.GetSingleOrderAction );
router.get('/orders/status/new' , AdminController.CheckAdminAccess  ,OrderController.GetAddStatusAction );
router.post('/orders/status/new' , AdminController.CheckAdminAccess  ,OrderController.AddStatus );
router.put('/orders/:id' , AdminController.CheckAdminAccess ,OrderController.ChangeStatusOrder );
router.delete('/orders' ,OrderController.RemoveOrder );

router.get('/orders/status/:id',AdminController.CheckAdminAccess  ,OrderController.GetUpdateStatusAction );
router.put('/orders/status/:id' ,AdminController.CheckAdminAccess ,OrderController.UpdateStatus );

router.delete('/orders/status/delete',AdminController.CheckAdminAccess ,OrderController.RemoveStatus );


module.exports = router;