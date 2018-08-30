"use strict";

const Langs = require('../../model/defenitions').Langs;
const Translations = require('../../model/defenitions').Translations;
const WordsConstans = require('../../model/defenitions').WordsConstans;
const Response = require('../../model/Response');
const connection = require('../../routes/connection');
const fs = require('fs');

module.exports.GetLanguagesListAction = async ( req , res )=>{

    let langs = await Langs.findAll();

    res.render('locale/languages-list' , {
        langs: langs
    });

};

module.exports.AddNewLanguage = async ( req , res )=>{

   let response = new Response();

   try{

       let languageTitle = req.body.languageTitle;

       let newLang = await Langs.create({
           'languageTitle': languageTitle
       });

       response.code = 200;
       response.message = 'Язык успешно добавлен!';
       response.data = newLang;

   }//try
   catch(ex){

       response.code = 500;
       response.message = 'Внутренняя ошибка сервера!';
       console.log('EX: ' , ex);

   }//catch

   res.status( response.code );
   res.send( response );

};

module.exports.ImportLanguage = async ( req , res )=>{

    let response = new Response();

    try{

        let file = req.files.file;

        if(file){

            let LangID = req.body.langID;

            let fileData = JSON.parse(file.data);

            fileData = Object.entries(fileData);

            let checkTranstate;

            for(let i = 0; i < fileData.length; i++){

                if(fileData[i][1] === "")
                    continue;

                checkTranstate = await connection.query(`
                    SELECT *
                    FROM \`translations\` AS t
                    JOIN \`wordsconstants\` AS wc ON wc.constantID = t.constantID
                    WHERE t.langID = '${LangID}' AND wc.constantTitle = '${fileData[i][0]}'`);

                if(checkTranstate[0].length > 0){

                    let translate = await Translations.findById(checkTranstate[0][0].ID);

                    translate.update({
                        translation: fileData[i][1]
                    })

                }//if
                else {

                    let constant = await WordsConstans.findOne({

                        where: {
                            constantTitle: fileData[i][0]
                        }

                    });

                    Translations.create({
                        translation: fileData[i][1],
                        langID: LangID,
                        constantID: constant.constantID
                    });

                }//else

            }//for

        }//if

        response.code = 200;
        response.message = 'Данные успешно добавлены!';
        response.data = {};

    }//try
    catch(ex){

        response.code = 500;
        response.message = 'Внутренняя ошибка сервера!';
        console.log('EX: ' , ex);

    }//catch

    res.status( response.code );
    res.send( response );

};

module.exports.ExportLanguage = async ( req , res )=>{

    try{

        let lang = await Langs.findById(req.params.id);

        let translations = await connection.query(`
        SELECT wc.constantTitle, t.translation
        FROM \`translations\` as t
        JOIN \`wordsconstants\` as wc ON wc.constantID = t.constantID
        WHERE t.langID = '${lang.languageID}'
        `);

        let constants = await WordsConstans.findAll();

        let jsonData = {};

        constants.forEach(item => {

            jsonData[`${item.constantTitle}`] = "";

        });

        translations[0].forEach(item => {

            jsonData[`${item.constantTitle}`] = item.translation;

        });

        res.send( jsonData );

    }//try
    catch(ex){

        let response = new Response();
        response.code = 500;
        response.message = 'Внутренняя ошибка сервера!';
        console.log('EX: ' , ex);
        res.status( response.code );
        res.send( response );

    }//catch

};


