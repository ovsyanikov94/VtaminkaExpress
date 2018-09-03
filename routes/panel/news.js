"use strict";

const express = require('express');
const NewsController = require("../../controller/panel/NewsController");

const router = express.Router();

router.get('/news/news-list', NewsController.GetNewsList);
router.get('/news/add-new', NewsController.addNewsAction);
router.post('/news/add-new', NewsController.addNews);

module.exports = router;