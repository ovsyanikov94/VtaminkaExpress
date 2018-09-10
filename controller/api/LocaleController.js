"use strict";

const Langs = require('../../model/defenitions').Langs;
const Translations = require('../../model/defenitions').Translations;
const WordsConstans = require('../../model/defenitions').WordsConstans;
const Connection = require('../../routes/connection');

const Response = require('../../model/Response');

module.exports.AddNewTranslateAction = async(req, res)=>{

    let langs = await Langs.findAll();
    let constants = await WordsConstans.findAll();
    let translations = await Translations.findAll({
        include:[
            {
                model: Langs,
                as: 'language'
            },
            {
                model: WordsConstans,
                as: 'constant'
            }
        ]
    });

    res.render('locale/new-translate', {'langs': langs, 'constants': constants, 'translations':translations});

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

        });

        let language = await Langs.findById( langID  , {
            attributes: [ 'languageTitle' ]
        });

        let constant = await WordsConstans.findById( constID  , {
            attributes: [ 'constantTitle' ]
        });

        respone.code = 200;
        respone.message = "Перевод добавлен";
        respone.data = {
            'ID': newTranslation.ID,
            'languageID':langID,
            'constantID':constID,
            'translation': translation,
            'languageTitle': language.languageTitle,
            'constantTitle': constant.constantTitle
        };

    }//try
    catch (ex){

        respone.code = 500;
        respone.message = "Ошибка сервера";
        console.log( ex );

    }//catch

    res.status( respone.code );
    res.send(respone)

};

module.exports.GetLanguageListJSON = async ( req , res )=>{

    try{

        let langs = await Langs.findAll();
        res.send(langs);

    } // Try
    catch(ex){

        respone.code = 500;
        respone.message = "Ошибка сервера";
        console.log( ex );

    } // Catch


};

module.exports.GetTranslateToCurrentLanguage = async (req,res)=>{

    try {

        let langID = +req.params.id;


        let translate = await Translations.findAll(
            {
                where: {
                    languageID: langID
                }
            }
        );

        res.send(translate);
    } // Try

    catch (ex) {

        respone.code = 500;
        respone.message = "Ошибка сервера";
        console.log( ex );

    } // Catch

};