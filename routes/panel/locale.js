"use strict";

const express = require('express');
const LocaleController = require("../../controller/panel/LocaleController");
const AdminController = require("../../controller/panel/AdminController");

const router = express.Router();

/* Localization */

router.get('/locale/langs-list' , AdminController.CheckAdminAccess ,LocaleController.GetLanguagesListAction );
router.post('/locale/new-lang' , AdminController.CheckAdminAccess ,LocaleController.AddNewLanguage );
router.get('/locale/const-list', AdminController.CheckAdminAccess ,LocaleController.GetConstList);
router.post('/locale/new', AdminController.CheckAdminAccess ,LocaleController.AddNewConstLeng);
router.get('/locale/new-lang' , LocaleController.AddNewLanguageAction );

router.get( '/locale/lang/exist' ,AdminController.CheckAdminAccess , LocaleController.LanguageExist );
router.get('/locale/lang/:id' , AdminController.CheckAdminAccess ,LocaleController.UpdateLanguageAction );
router.put('/locale/lang/:id' , AdminController.CheckAdminAccess ,LocaleController.UpdateLanguage );
router.delete('/locale/lang/delete' , AdminController.CheckAdminAccess ,LocaleController.RemoveLang );

router.delete('/locale/remove' , AdminController.CheckAdminAccess ,LocaleController.RemoveConst );
router.put('/locale/update' , AdminController.CheckAdminAccess ,LocaleController.UpdateConst );

router.get('/locale/transletion',AdminController.CheckAdminAccess ,LocaleController.GelTransletionList);
router.post('/locale/add-translation', AdminController.CheckAdminAccess ,LocaleController.AddTransletion);
router.delete('/locale/remove-translation', AdminController.CheckAdminAccess ,LocaleController.RemoveTransletion);

router.post('/locale/lang/export/' , AdminController.CheckAdminAccess ,LocaleController.ExportLanguage );
router.post('/locale/lang/import/' , AdminController.CheckAdminAccess ,LocaleController.ImportLanguage );

router.put('/locale/updata-translation',AdminController.CheckAdminAccess ,LocaleController.UpdataTranslation);
router.get('/locale/updata-translation/:id',AdminController.CheckAdminAccess ,LocaleController.UpdataTranslationAction);

module.exports = router;