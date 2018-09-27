"use strict";

const express = require('express');
const PromoCodes = require("../../controller/panel/PromoCodesController");
const AdminController = require("../../controller/panel/AdminController");
const router = express.Router();


router.use(AdminController.CheckAdminAccess);

/* PromoCodes */
router.get('/promo-codes/promo-codes-list',PromoCodes.GetPromoCodesListAction);
router.post('/promo-codes/new',PromoCodes.AddNewPromoCode);

router.get('/promo-codes/single/:id',PromoCodes.UpdatePromoCodeAction);
router.put('/promo-codes/single/:id',PromoCodes.UpdatePromoCode);
router.delete('/promo-codes/delete', PromoCodes.DeletePromoCode);


module.exports = router;