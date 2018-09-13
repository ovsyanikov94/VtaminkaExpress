"use strict";

const express = require('express');
const router = express.Router();

const PromoCodeController = require('../../controller/api/PromoCodeController');

router.get('/promo-codes/list', PromoCodeController.GetPromoCodes);
router.post('/promo-codes/use-promo-code', PromoCodeController.UsePromoCode);

module.exports = router;

/*

    SELECT `promoCodeID`, `discountCode`, `discount`, `promoCount`, `startAtDate`, `expireAtDate`, `createdAt`, `updatedAt`
    FROM `promoCodes` AS `promoCodes` WHERE `promoCodes`.`discountCode` = 'AAAA-1111-GGGG' AND `promoCodes`.`startAtDate` >= '2018-09-11' AND `promoCodes`.`expireAtDate` <= '2018-09-11' AND `promoCodes`.`promoCount` > 0;



 */