"use strict";

const express = require('express');
const CategoryController = require("../../controller/panel/CategoryController");

const router = express.Router();

/* Categories */
router.get('/categories', CategoryController.GetCategoriesListAction );
router.get('/categories/:categoryID' , CategoryController.GetProductsByCategories);
router.get('/category/new' , CategoryController.AddCategoryAction);
router.get('/category/:id' , CategoryController.GetCategoryAction );
router.post('/category/new' , CategoryController.AddCategory);
router.put('/category/:id' , CategoryController.UpdateCategory );
router.delete('/category' , CategoryController.RemoveCategory );

module.exports = router;