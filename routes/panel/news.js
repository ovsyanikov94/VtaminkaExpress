"use strict";

const express = require('express');
const NewsController = require("../../controller/panel/NewsController");

const router = express.Router();

router.get('/news/news-list', NewsController.GetNewsList);
router.get('/news/add-new', NewsController.addNewsAction);
router.post('/news/add-new', NewsController.addNews);
router.delete('/news/remove', NewsController.removeNews);

router.put('/news/update', NewsController.UpdataNews);
router.get('/news/:id', NewsController.updateNewsAction);




module.exports = router;