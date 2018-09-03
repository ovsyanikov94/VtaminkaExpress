"use strict";

const express = require('express');
const router = express.Router();

const HomeController = require('../controller/panel/HomeController');

/* GET home page. */
router.get('/', HomeController.HomeAction );
router.get('/panel', HomeController.HomeAction );

/* PromoCodes */
router.get('/panel/promo-codes/promo-codes-list', PromoCodes.GetPromoCodesListAction);
router.post('/panel/promo-codes/new', PromoCodes.AddNewPromoCode);

module.exports = router;
