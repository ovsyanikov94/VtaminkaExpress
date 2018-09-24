"use strict";

const express = require('express');
const ProductController = require("../../controller/panel/ProductController");
const AdminController = require("../../controller/panel/AdminController");

const router = express.Router();

/* Products */

router.get('/products', AdminController.CheckAccess  ,ProductController.GetProductsListAction );
router.get('/products/attributes', AdminController.CheckAccess  ,ProductController.GetAttributesAction );

router.get('/products/new', AdminController.CheckAccess  ,ProductController.AddNewProductAction );
router.post('/products/new' , AdminController.CheckAccess ,ProductController.AddNewProduct );

router.get('/products/:id', AdminController.CheckAccess  ,ProductController.GetProductAction );
router.put('/products/:id', AdminController.CheckAccess  ,ProductController.UpdateProduct );

router.get('/products/attributes/new', AdminController.CheckAccess  ,ProductController.AddNewAttributeAction );
router.post('/products/attributes/new', AdminController.CheckAccess  ,ProductController.AddNewAttribute );

router.delete('/products/delete' , AdminController.CheckAccess  , ProductController.RemoveProduct );

module.exports = router;