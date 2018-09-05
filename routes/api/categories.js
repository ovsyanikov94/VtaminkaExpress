"use strict";

const express = require('express');

const router = express.Router();

const CategoryController = require('../../controller/api/CategoryController');

router.get('/categories/list' , CategoryController.GetCategories );
router.get('/categories/plist' , CategoryController.GetProductsWithCategory );

module.exports = router;