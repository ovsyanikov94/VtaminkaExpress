"use strict"

const express = require('express');

const router = express.Router();
const NewsController = require('../../controller/api/NewsController');

router.get('/news/news-list' , NewsController.GetNewsList );
router.get('/news/one-news', NewsController.GetNews);

module.exports = router;
