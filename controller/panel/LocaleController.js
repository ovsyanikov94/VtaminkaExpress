"use strict";

const Langs = require('../../model/defenitions').Langs;
const WordsConstans =require('../../model/defenitions').WordsConstans;
const Translations =require('../../model/defenitions').Translations;
const Response = require('../../model/Response');

module.exports.AddNewConstLeng=async(req,res)=>{


    let respone = new Response();
    try{
        let description = req.body.description;
        let title = req.body.title;
        let transletion = req.body.transletion;
        let lengId = req.body.lengId;

        let newWordsConstans = await WordsConstans.create({
            'constantTitle':title,
            'description':description,

        })


        if(newWordsConstans){
            console.log(lengId);
            console.log(newWordsConstans.constantID);
            let newTranslete = await Translations.create({
                'constantID':newWordsConstans.constantID,
                'languageID':lengId,
                'translation':transletion,


            });

            console.log('Ответ',newTranslete);
        }

        respone.code=200;
        respone.message="перевод добавлен";
        respone.data= newWordsConstans

    }
    catch (ex){

        respone.code=500;
        respone.message="ошибка сервера";

    }

    res.send(respone)

};

module.exports.GetConstList = async (req,res)=>{

    let respone = new Response();

    try{
        let lang = req.params.lng;

        let allLangs = await Langs.findAll();
        let currentLang = await Langs.findOne({
            where: {
                languageTitle: lang
            }
        });

        if(!currentLang){
            return res.render('error' , { error: { message: 'Язык не найден!' } });
        }//if

        let constants = await WordsConstans.findAll();

        res.render('locale/constants/constants-list',{langs: allLangs , constants: constants})


    }
    catch (ex){
        res.render('error' , { error: ex });
    }

};


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

