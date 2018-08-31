"use strict";

const express = require('express');
const LocaleController = require("../../controller/panel/LocaleController");

const router = express.Router();

/* Localization */

router.get('/locale/langs-list' , LocaleController.GetLanguagesListAction );
router.post('/locale/new-lang' , LocaleController.AddNewLanguage );
router.get('/locale/const-list/:lng', LocaleController.GetConstList);
router.post('/locale/new',LocaleController.AddNewConstLeng);
router.get('/locale/new-lang' , LocaleController.AddNewLanguageAction );

module.exports = router;