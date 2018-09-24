"use strict";

const express = require('express');
const ProductController = require("../../controller/panel/ProductController");
const AdminController = require("../../controller/panel/AdminController");

const router = express.Router();

/* Products */

router.get('/products', AdminController.CheckAdminAccess  ,ProductController.GetProductsListAction );
router.get('/products/attributes', AdminController.CheckAdminAccess,ProductController.GetAttributesAction );

router.get('/products/new', AdminController.CheckAdminAccess  ,ProductController.AddNewProductAction );
router.post('/products/new' , AdminController.CheckAdminAccess ,ProductController.AddNewProduct );

router.get('/products/:id', AdminController.CheckAdminAccess,ProductController.GetProductAction );
router.put('/products/:id', AdminController.CheckAdminAccess,ProductController.UpdateProduct );

router.get('/products/attributes/new', AdminController.CheckAdminAccess,ProductController.AddNewAttributeAction );
router.post('/products/attributes/new', AdminController.CheckAdminAccess,ProductController.AddNewAttribute );

router.delete('/products/delete' , AdminController.CheckAdminAccess, ProductController.RemoveProduct );

module.exports = router;