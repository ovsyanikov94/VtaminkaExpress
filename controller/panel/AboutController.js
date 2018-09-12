"use strict";

const Response = require('../../model/Response');
const fs = require('fs');

module.exports.GetTextAboutAction = async ( req , res )=>{

    try{

        let pathDirectory = `public/settings`;
        let path = `public/settings/about.json`;

        if(!fs.existsSync(pathDirectory)){

            fs.mkdirSync(pathDirectory);

        }//if

        if(!fs.existsSync(path)){

            let jsonData = {};

            jsonData[`description`] = '';

            fs.writeFileSync(path, JSON.stringify(jsonData));
        }//if

        let file = fs.readFileSync(path);
        
        res.render('about/about-list', {about: JSON.parse(file)});


    }//try
    catch(ex){

        res.render('error',{'error': ex});

    }//catch

};

module.exports.UpdateTextAbout = async ( req , res )=>{

    let response = new Response();

    try{


        let textAbout = req.body.text.trim();

        if( textAbout ){

            let jsonData = {};


            jsonData[`description`] = textAbout;


            let path = `public/settings/about.json`;
            fs.writeFileSync(path, JSON.stringify(jsonData));


            response.code = 200;
            response.message = 'Текст обновлен';

            res.status(response.code);
            return res.send(response);

        }//if



    }//try
    catch(ex){

        response.code = 500;
        response.message = 'Внутренняя ошибка сервера';
        response.data = ex;

        console.log(ex);
        
        res.status(response.code);
        res.send( response );

    }//catch


};