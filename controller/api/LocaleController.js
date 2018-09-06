"use strict";

const Langs = require('../../model/defenitions').Langs;
const Translations = require('../../model/defenitions').Translations;
const Constants = require('../../model/defenitions').WordsConstans;
const Connection = require('../../routes/connection');

const Response = require('../../model/Response');

module.exports.AddNewTranslateAction = async(req, res)=>{

    let langs = await Langs.findAll();
    let constants = await Constants.findAll();
    let translates = await Translations.findAll();

    let data = await Connection.query('SELECT w.constantTitle, l.languageTitle, t.translation ' +
        'FROM `translations` as t ' +
        'JOIN `langs` as l on l.languageID = t.languageID ' +
        'JOIN `wordsconstants` as w on w.constantID = t.constantID', {type: 'SELECT'});

    res.render('locale/new-translate', {'langs': langs, 'constants': constants, 'translates':translates, 'data': data});

};



module.exports.AddNewTranslate = async(req,res)=>{

    let respone = new Response();

    try {

        let langID = req.body.languageID;
        let constID = req.body.constantID;
        let translation = req.body.translation;

        let newTranslation = await Translations.create({

            'languageID':langID,
            'constantID':constID,
            'translation': translation

        })



        respone.code = 200;
        respone.messag = "Перевод добавлен";
        respone.data= newTranslation

    }
    catch (ex){

        respone.code = 500;
        respone.message="Ошибка сервера";

    }

    res.send(respone)

};

module.exports.GetLanguageListJSON = async ( req , res )=>{

    let langs = await Langs.findAll();

    res.send(JSON.stringify(langs));

};

module.exports.GetTranslateToCurrentLanguage = async (req,res)=>{

    let langID = +req.params.id;


    let translate = await Translations.findAll(
        {
            where: {
                languageID: langID
            }
        }
    );

    res.send(JSON.stringify(translate));

};