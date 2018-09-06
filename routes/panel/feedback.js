"use strict";

const express = require('express');
const FeedBackController = require("../../controller/panel/FeedBackController");

const router = express.Router();


router.get('/feedbacks-list', FeedBackController.GetFeedBacksListAction );
router.put('/feedback/:id', FeedBackController.ProcessedFeedBack );


module.exports = router;