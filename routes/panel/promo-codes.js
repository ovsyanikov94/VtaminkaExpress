"use strict";

const express = require('express');
const PromoCodes = require("../../controller/panel/PromoCodesController");
const router = express.Router();


/* PromoCodes */
router.get('/promo-codes/promo-codes-list', PromoCodes.GetPromoCodesListAction);
router.post('/promo-codes/new', PromoCodes.AddNewPromoCode);

module.exports = router;