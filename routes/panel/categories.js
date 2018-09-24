"use strict";

const express = require('express');
const CategoryController = require("../../controller/panel/CategoryController");
const AdminController = require("../../controller/panel/AdminController");

const router = express.Router();

/* Categories */
router.get('/categories', AdminController.CheckAdminAccess , CategoryController.GetCategoriesListAction );
router.get('/categories/:categoryID' ,  AdminController.CheckAdminAccess , CategoryController.GetProductsByCategories);
router.get('/category/new' ,  AdminController.CheckAdminAccess , CategoryController.AddCategoryAction);
router.get('/category/:id' ,  AdminController.CheckAdminAccess , CategoryController.GetCategoryAction );
router.post('/category/new' ,  AdminController.CheckAdminAccess , CategoryController.AddCategory);
router.put('/category/:id' ,  AdminController.CheckAdminAccess , CategoryController.UpdateCategory );
router.delete('/categories/delete' ,  AdminController.CheckAdminAccess , CategoryController.RemoveCategory );

module.exports = router;