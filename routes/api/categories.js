"use strict";

const express = require('express');

const router = express.Router();

const CategoryController = require('../../controller/api/CategoryController');

router.get('/category/list' , CategoryController.GetCategories );
router.get('/category/plist' , CategoryController.GetProductsWithCategory );


module.exports = router;