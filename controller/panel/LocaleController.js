"use strict";

const Langs = require('../../model/defenitions').Langs;
const WordsConstans =require('../../model/defenitions').WordsConstans;
const Translations =require('../../model/defenitions').Translations;
const Response = require('../../model/Response');
const fs = require('fs');

module.exports.UpdateConst = async(req,res)=>{

    console.log(req.body);
    let id = +req.body.id;
    let title = req.body.title;
    let description = req.body.description;

    let respone = new Response();

    try{

        let constUpdate = await WordsConstans.findById(id);

        console.log(constUpdate);

        if(!constUpdate){

            respone.code=404;
            respone.message="значение нн найдено";
            respone.data = id;
            return res.send(respone);
        }


        let updateResponse =await constUpdate.update({
            constantTitle:title,
            description:description
        });
        console.log(updateResponse);
        respone.code=200;
        respone.message = "константа изменена";
        respone.data = updateResponse;

        res.send(respone)

    }catch (ex){
        respone.code=500;
        respone.message="ощибка сервера";
    }

    res.status( respone.code );
    res.send(respone);

}

module.exports.RemoveConst = async(req,res)=>{
    let respone = new Response();
    let idConst = req.body.constID

    try{
        if(!idConst){

            respone.code=404;
            respone.message="значение нн найдено";
            respone.data = idConst
            return res.send(respone)

        }

        Translations.destroy({
            where:{
                constantID:idConst
            }
        });

      WordsConstans.destroy({
            where:{

                constantID:idConst
            }
        });

        respone.code=200;
        respone.message = "константа удалена";
        respone.data = idConst
        res.send(respone)
    }
    catch (ex){
        respone.code=500;
        respone.message="ощибка сервера";
        return res.send(respone)
    }

}

module.exports.AddNewConstLeng=async(req,res)=>{


    let respone = new Response();
    try{
        let description = req.body.description;
        let title = req.body.title;
        let newWordsConstans = await WordsConstans.create({
            'constantTitle':title,
            'description':description,

        })



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


        let constants = await WordsConstans.findAll();

        res.render('locale/constants/constants-list',{ constants: constants})


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

module.exports.AddNewLanguageAction = async(req, res)=>{

    res.render('locale/new-language');
};

module.exports.AddNewLanguage = async ( req , res )=>{

   let response = new Response();

   try{

       let languageTitle = req.body.languageTitle;

       let newLang = await Langs.create({
           'languageTitle': languageTitle
       });

       if( req.files ){

           let langImage = req.files.image;
           let path = `public/images/langs/${newLang.languageID}`;

          if(!fs.existsSync('public/images')){
              fs.mkdirSync('public/images');
          }

          if(!fs.existsSync('public/images/langs')){
              fs.mkdirSync('public/images/langs');
          }

           try{

               fs.mkdirSync(path);

           }//try
           catch(ex){

               console.log('not create' , ex);

           }

           // fs.existsSync()
           langImage.mv( `${path}/${langImage.name}` ,async function(err) {

               if (err){
                   console.log('FILE UPLOAD ERROR:' , err);
                   return;
               }//if

               let lang = await Langs.findById( newLang.languageID );

               lang.update({
                   languageTitle: languageTitle,
                   languageImage: `images/langs/${newLang.languageID}/${langImage.name}`,
               });

           });

       }//if



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

module.exports.UpdateLanguageAction  = async(req, res)=>{



    try{
        let langID = +req.params.id;
        let lang = await Langs.findById( langID );

        res.render('locale/language-single',{ lang: lang });
    }//try
    catch (ex){
        res.render('error',{ error: ex});
    }//catch
};

module.exports.UpdateLanguage = async ( req , res )=>{

    let response = new Response();

    try{

        let langID = req.params.id;

        let lang = await Langs.findById(langID);

        if(!lang ){

            response.code = 404;
            response.message = 'Язык не найден!';
            response.data = langID;
            res.status(response.code);

            return res.send(response);

        }//if

        let langTitle = req.body.langTitle;

        //Начало работы с загруженным файлом
        if( req.files ){

            let langImage = req.files.image;
            let path = `public/images/langs/${langID}`;


            if(!lang.languageImage){

                try{
                    if(!fs.existsSync('public/images')){
                        fs.mkdirSync('public/images');
                    }

                    if(!fs.existsSync('public/images/langs')){
                        fs.mkdirSync('public/images/langs');
                    }


                    fs.mkdirSync(path);
                }//try
                catch(ex){
                    console.log(ex);
                }//catch


            }//if
            else{
                try{
                    fs.unlinkSync(`public/${lang.languageImage}`);
                }
                catch(ex){
                    console.log(ex);
                }


            }//else


            // fs.existsSync()
            langImage.mv( `${path}/${langImage.name}` ,async function(err) {

                if (err){
                    console.log('FILE UPLOAD ERROR:' , err);
                    return;
                }//if

                await lang.update({
                    languageTitle: langTitle,
                    languageImage: `images/langs/${langID}/${langImage.name}`,
                });

            });

        }//if

        response.code = 200;
        response.message = 'Язык успешно обновлен!';

    }//try
    catch(ex){

        response.code = 500;
        response.message = 'Внутренняя ошибка сервера!';
        console.log(ex);

    }//catch

    res.status(response.code);
    res.send(response);

};

module.exports.RemoveLang= async ( req , res )=>{

    let response = new Response();

    try{

        let langID = +req.body.languageTitle;

        if( isNaN(langID) ){

            response.code = 400;
            response.message = 'ID языка задан не верно!';
            response.data = langID;

            return res.send(response);

        }//if

        let lang = await Langs.findById(langID);

        if(!lang){

            response.code = 404;
            response.message = 'Язык не найден!';
            response.data = langID;

            return res.send(response);


        }//if

        await lang.destroy();

        response.code = 200;
        response.message = 'Язык успешно обновлен';



    }//try
    catch(ex){


        response.code = 500;
        response.message = 'Внутренняя ошибка сервера';
        response.data = ex;

    }//catch

    res.status( response.code );
    res.send(response);

};

module.exports.LanguageExist = async ( req , res )=>{

    let response = new Response();

    try{

        let languageTitle = req.query.languageTitle;

        let lang = await Langs.findOne({
           where:{
               languageTitle: languageTitle
           }
        });

        if( !lang ){

            response.code = 200;
            response.data = true;

        }//if
        else{
            response.code = 400;
            response.data = false;
        }//else

    }//try
    catch(ex){

        response.code = 500;
        response.message = 'Внутренняя ошибка сервера';
        response.data = ex;

    }//catch

    res.status( response.code );
    res.send( response );

};