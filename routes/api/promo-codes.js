"use strict";

const express = require('express');
const router = express.Router();

const PromoCodeController = require('../../controller/api/PromoCodeController');

router.get('promo-codes/list', PromoCodeController.GetPromoCodes);
router.post('promo-codes/use-promo-code', PromoCodeController.UsePromoCode);

module.exports = router;