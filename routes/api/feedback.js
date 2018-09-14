"use strict";

const express = require('express');

const router = express.Router();

const FeedbackController = require('../../controller/api/feedBackController');

router.post('/feedbacks/new' , FeedbackController.AddFeedBack );

module.exports = router;