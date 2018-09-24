"use strict";

const express = require('express');
const PromoCodes = require("../../controller/panel/PromoCodesController");
const AdminController = require("../../controller/panel/AdminController");
const router = express.Router();


/* PromoCodes */
router.get('/promo-codes/promo-codes-list', AdminController.CheckAdminAccess, PromoCodes.GetPromoCodesListAction);
router.post('/promo-codes/new',AdminController.CheckAdminAccess ,PromoCodes.AddNewPromoCode);

router.get('/promo-codes/single/:id', AdminController.CheckAdminAccess, PromoCodes.UpdatePromoCodeAction);
router.put('/promo-codes/single/:id', AdminController.CheckAdminAccess, PromoCodes.UpdatePromoCode);
router.delete('/promo-codes/delete', AdminController.CheckAdminAccess, PromoCodes.DeletePromoCode);


module.exports = router;