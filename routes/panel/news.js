"use strict";

const express = require('express');
const NewsController = require("../../controller/panel/NewsController");
const AdminController = require("../../controller/panel/AdminController");

const router = express.Router();

router.get('/news/news-list',AdminController.CheckAdminAccess , NewsController.GetNewsList);
router.get('/news/add-new', AdminController.CheckAdminAccess , NewsController.addNewsAction);
router.post('/news/add-new',AdminController.CheckAdminAccess , NewsController.addNews);
router.delete('/news/remove', AdminController.CheckAdminAccess , NewsController.removeNews);

router.put('/news/update', AdminController.CheckAdminAccess , NewsController.UpdataNews);
router.get('/news/:id', AdminController.CheckAdminAccess , NewsController.updateNewsAction);

module.exports = router;