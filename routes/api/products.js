"use strict";

const express = require('express');

const router = express.Router();

const ProductController = require('../../controller/api/ProductController');

router.get('/products/list' , ProductController.GetProducts );

module.exports = router;