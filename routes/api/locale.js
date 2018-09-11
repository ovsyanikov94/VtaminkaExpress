const express = require('express');

const router = express.Router();

const LocaleController = require('../../controller/api/LocaleController');

router.get('/locale/list' , LocaleController.GetLangs );

module.exports = router;