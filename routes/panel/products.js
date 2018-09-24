"use strict";

const express = require('express');
const ProductController = require("../../controller/panel/ProductController");
const AdminController = require("../../controller/panel/AdminController");

const router = express.Router();

/* Products */

router.use(AdminController.CheckAdminAccess);

router.get('/products', ProductController.GetProductsListAction );
router.get('/products/attributes',ProductController.GetAttributesAction );

router.get('/products/new'  ,ProductController.AddNewProductAction );
router.post('/products/new' , ProductController.AddNewProduct );

router.get('/products/:id', ProductController.GetProductAction );
router.put('/products/:id',ProductController.UpdateProduct );

router.get('/products/attributes/new', ProductController.AddNewAttributeAction );
router.post('/products/attributes/new', ProductController.AddNewAttribute );

router.delete('/products/delete' , ProductController.RemoveProduct );

module.exports = router;