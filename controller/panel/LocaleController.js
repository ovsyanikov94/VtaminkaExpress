"use strict";

const Langs = require('../../model/defenitions').Langs;
const Response = require('../../model/Response');

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

