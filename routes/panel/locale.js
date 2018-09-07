"use strict";

const express = require('express');
const LocaleController = require("../../controller/panel/LocaleController");

const router = express.Router();

/* Localization */

router.get('/locale/langs-list' , LocaleController.GetLanguagesListAction );
router.post('/locale/new-lang' , LocaleController.AddNewLanguage );
router.get('/locale/const-list', LocaleController.GetConstList);
router.post('/locale/new',LocaleController.AddNewConstLeng);
router.get('/locale/new-lang' , LocaleController.AddNewLanguageAction );

router.get( '/locale/lang/exist' , LocaleController.LanguageExist );
router.get('/locale/lang/:id' , LocaleController.UpdateLanguageAction );
router.put('/locale/lang/:id' , LocaleController.UpdateLanguage );

router.delete('/locale/remove' , LocaleController.RemoveConst );
router.put('/locale/update' , LocaleController.UpdateConst );

router.get('/locale/transletion',LocaleController.GelTransletionList);
router.post('/locale/add-translation',LocaleController.AddTransletion);
router.delete('/locale/remove-translation',LocaleController.RemoveTransletion);


router.put('/locale/updata-translation',LocaleController.UpdataTranslation);
router.get('/locale/updata-translation/:id',LocaleController.UpdataTranslationAction);

module.exports = router;