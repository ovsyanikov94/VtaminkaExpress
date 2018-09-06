"use strict";

const Langs = require('../../model/defenitions').Langs;
const Translations = require('../../model/defenitions').Translations;

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