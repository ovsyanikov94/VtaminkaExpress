"use strict";

const Response = require('../../model/Response');
const fs = require('fs');

module.exports.GetTextAbout = async ( req , res )=>{

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
