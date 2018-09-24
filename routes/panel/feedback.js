"use strict";

const express = require('express');
const FeedBackController = require("../../controller/panel/FeedBackController");
const AdminController = require("../../controller/panel/AdminController");

const router = express.Router();


router.get('/feedbacks-list', AdminController.CheckAdminAccess ,  FeedBackController.GetFeedBacksListAction );
router.get('/singl-feedback/:id' ,AdminController.CheckAdminAccess , FeedBackController.GetSinglFeedBackAction);
router.put('/feedback/:id', AdminController.CheckAdminAccess ,FeedBackController.ProcessedFeedBack );
router.post('/feedback-response/', AdminController.CheckAdminAccess ,FeedBackController.SendMessage );


module.exports = router;