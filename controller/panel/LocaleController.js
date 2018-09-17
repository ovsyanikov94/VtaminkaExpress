"use strict";

const Langs = require('../../model/defenitions').Langs;
const WordsConstans =require('../../model/defenitions').WordsConstans;
const Translations =require('../../model/defenitions').Translations;
const Response = require('../../model/Response');
const fs = require('fs');
const connection = require('../../routes/connection');

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

};

module.exports.RemoveConst = async(req,res)=>{
    let respone = new Response();
    let idConst = req.body.constID

    try{
        if(!idConst){

            respone.code=404;
            respone.message="значение нн найдено";
            respone.data = idConst;
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
        respone.data = idConst;
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

        });



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

                    if(!fs.existsSync('public/images')){
                        fs.mkdirSync('public/images');
                    }

                    if(!fs.existsSync('public/images/langs')){
                        fs.mkdirSync('public/images/langs');
                    }

                    fs.mkdirSync(path);

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

        await lang.update({
            languageTitle: langTitle,
        });

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

        let langID = +req.body.langID;

        console.log(langID);
        
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


        let path = `public/images/langs/${langID}`;

        if(lang.languageImage){

            try{

                if(!fs.existsSync(path)){
                    return;
                }//if

                if(!fs.existsSync(`public/${lang.languageImage}`)){
                   return;
                }//if

                fs.unlinkSync(`public/${lang.languageImage}`);
                fs.rmdirSync(path);


            }//try
            catch(ex){
                console.log(ex);
            }//catch

        }//if


        await lang.destroy();

        response.code = 200;
        response.message = 'Язык успешно удален';


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

module.exports.ImportLanguage = async ( req , res )=>{

    let response = new Response();

    try{

        let file = req.files.file;

        if(file){

            let LangID = req.body.langID;

            let lang = await Langs.findById(LangID);

            let fileData = JSON.parse(file.data);

            for ( let key in fileData){

                let constant = await WordsConstans.findOne({
                    where: {
                        constantTitle: key
                    }
                });

                if(constant){

                    let translation = await Translations.findOne({
                        where:{
                            constantID: constant.constantID,
                            languageID: lang.languageID
                        }
                    });

                    if(!translation){

                        await Translations.create({
                            translation: fileData[key],
                            constantID: constant.constantID,
                            languageID: LangID
                        });

                    }//if
                    else{

                        await translation.update({
                            translation: fileData[key]
                        });

                    }//else

                    continue;
                }//if

                let newConstant = await WordsConstans.create({
                    constantTitle: key,
                    description: ''
                });

                await Translations.create({
                    translation: fileData[key],
                    constantID: newConstant.constantID,
                    languageID: LangID
                });

            }//for i


            let path = `public/i18n/${lang.languageTitle}.json`;

            fs.writeFileSync(path, file.data);

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

    let response = new Response();

    try{

        let lang = await Langs.findById(req.body.langID);

        if( !lang ){
            throw new Error('Язык не найден');
        }//if

        let translations = await Translations.findAll({
            where: {
                languageID: lang.languageID
            },
            include:[
                {
                    model: WordsConstans,
                    attributes: [ 'constantTitle' ],
                    as: 'constant'
                }
            ]
        });

        let jsonData = {};

        translations.forEach(item => {

            jsonData[`${item.constant.constantTitle}`] = item.translation;

        });

        console.log(jsonData);

        let path = `public/i18n/${lang.languageTitle}.json`;

        fs.writeFileSync(path, JSON.stringify(jsonData));

        response.code = 200;
        response.message = 'Экспорт успешен';

    }//try
    catch(ex){

        console.log('EX: ' , ex);

        response.code = 500;
        response.message = ex.message;

    }//catch

    res.status( response.code );
    res.send( response );

};

module.exports.GelTransletionList=async(req , res)=>{



    let translations = await Translations.findAll({

       include: [
           {
               model: WordsConstans,
               as: 'constant'
           },
           {
               model: Langs
           }
       ]

    });


    let languages = await Langs.findAll();
    let constants = await WordsConstans.findAll();

    res.render('locale/transleton/trasletion-list',{constants : constants, languages: languages ,  translations: translations});
};

module.exports.UpdataTranslationAction=async(req, res)=>{


    let id = req.params.id;
    console.log(id);
    let translations = await Translations.findOne({
            where:{
                ID:id
            },
            include: [
                {
                    model: WordsConstans,
                    as: 'constant'
                },
                {
                    model: Langs
                }
        ]

    });

    res.render('locale/transleton/updataTranslation',{'translations':translations})
};

module.exports.UpdataTranslation=async(req,res)=>{


    let respone = new Response();
    let id = req.body.id;
    let text =req.body.text

    console.log(id);
    console.log(text);

    try{
        let updateTran = await Translations.findOne({

            where:{
                ID:id
            },

        });

        updateTran.update({translation:text})
        respone.code = 200;
        respone.message = "перевод обнавлен";
        respone.data = updateTran;
    }catch (ex){
        respone.code = 500;
        respone.message = "ощибка сервера";

    }
    res.status(respone.code);
    res.send(respone);
}

module.exports.RemoveTransletion=async(req , res)=>{


    let respone = new Response();
    let id = req.body.id;

    try{
        let removeTrans = Translations.destroy({
            where:{
                ID:id
            }
        });

        respone.code=200;
        respone.message="перевод удален";

    }//try
    catch (ex){
        respone.code=500;
        respone.message="ощибка сервера";

    }//catch

    res.status(respone.code);
    res.send(respone);
};

module.exports.AddTransletion=async(req , res)=>{

    let respone = new Response();

    let constId = req.body.idConst;
    let lengId = req.body.idleng;
    let translation = req.body.translation

    let constant = await WordsConstans.findOne({
        where:{
            constantID:constId
        }
    });


    let leng =  await Langs.findOne({
        where:{
            languageID:lengId
        }
    });

    if(constant&&leng&&translation){

        let trans = await Translations.create({
            constantID:constId,
            languageID:lengId,
            translation:translation
        });

        respone.code=200;
        respone.message="перевод добавлен";
        respone.data = {
            'ConstantTitle': constant.constantTitle,
            'LanguageTitle': leng.languageTitle,
            'Translation': translation,
            'TranslationID': trans.ID,
        };

    }//if
    else {
        respone.code=404;
        respone.message="значение не найдено";
    }//else

    res.status(respone.code);
    res.send(respone);

};//AddTransletion