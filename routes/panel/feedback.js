"use strict";

const express = require('express');
const FeedBackController = require("../../controller/panel/FeedBackController");
const AdminController = require("../../controller/panel/AdminController");

const router = express.Router();


router.get('/feedbacks-list', FeedBackController.GetFeedBacksListAction );
router.get('/singl-feedback/:id' , FeedBackController.GetSinglFeedBackAction);
router.put('/feedback/:id', FeedBackController.ProcessedFeedBack );
router.post('/feedback-response/', FeedBackController.SendMessage );


module.exports = router;