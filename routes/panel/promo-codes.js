"use strict";

const express = require('express');
const PromoCodes = require("../../controller/panel/PromoCodesController");
const router = express.Router();


/* PromoCodes */
router.get('/promo-codes/promo-codes-list', PromoCodes.GetPromoCodesListAction);
router.post('/promo-codes/new', PromoCodes.AddNewPromoCode);

router.get('/promo-codes/:id', PromoCodes.UpdatePromoCodeAction);
router.put('/promo-codes/:id', PromoCodes.UpdatePromoCode);
router.delete('/promo-codes/delete', PromoCodes.DeletePromoCode);


module.exports = router;