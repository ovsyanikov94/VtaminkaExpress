"use strict";

const Response = require('../../model/Response');

const fs = require('fs');

module.exports.GetAbout = async ( req , res )=>{


    let response = new Response();

    try{

        let pathDirectory = `public/settings`;
        let path = `public/settings/about.json`;

        if(!fs.existsSync(pathDirectory)){

            fs.mkdirSync(pathDirectory);

        }//if

        if(!fs.existsSync(path)){

            let jsonData = {};

            jsonData[`description`] = 'Текст не добавлен';

            fs.writeFileSync(path, JSON.stringify(jsonData));
        }//if

        let file = fs.readFileSync(path);

        response.code = 200;
        response.data = JSON.parse(file);

    }//try
    catch(ex){

        response.code = 500;
        response.data = null;
        response.message = "Внутренняя ошибка сервера!";

    }//catch

    res.status(response.code);
    res.send( response );

};