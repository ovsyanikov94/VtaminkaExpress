"use strict";
const RegularExpressions = require('../../model/RegularExpressions');
const Response = require('../../model/Response');
var fs = require('fs');

module.exports.GetCoordAction = async ( req , res )=>{

    try{

        let path = `public/settings/coord.json`;



        if(!fs.existsSync (path)){
            console.log("Файл 'Coord' на сервере отсутствует!");
            return
        }//if


        let fileSize = new Object();
        fs.stat(path, function(err,stats){
            if(!err){
                fileSize=stats;
            }
        })
        console.log(fileSize);


        if(fileSize.size!=0){

            var coordObj = JSON.parse(fs.readFileSync(path, 'utf8'));

            let latitude = coordObj.lat;
            let longitude = coordObj.lng;

            res.render('coord/coord-info',{'latitude': latitude, 'longitude': longitude});

        }//if
        else{

            let latitude = 48.01771002139289;
            let longitude = 37.80502894280718;
            res.render('coord/coord-info',{'latitude': latitude, 'longitude': longitude});

        }//else


    }//try
    catch(ex){
        console.log(ex);
        res.render('error',{'error': ex});

    }//catch

};

module.exports.UpdateCoords = async ( req , res )=>{

    let response = new Response();

    try {
        let path = `public/settings/coord.json`;
        let lat = +req.body.lat;
        let lng = +req.body.lng;

        if (isNaN(lat)) {

            response.code = 400;
            response.message = 'Широта задана не верно!';
            response.data = lat;

            return res.send(response);

        }//if
        if (isNaN(lng)) {

            response.code = 400;
            response.message = 'Долгота задана не верно!';
            response.data = lng;

            return res.send(response);

        }//if

        let latStr = lat.toString();
        if (!latStr.match(RegularExpressions.CoordExpression)) {

            response.code = 400;
            response.message = 'Широта имеет неверный формат!';
            response.data = lat;

            return res.send(response);

        }//if
        let lngStr = lat.toString();
        if (!lngStr.match(RegularExpressions.CoordExpression)) {

            response.code = 400;
            response.message = 'Долгота имеет неверный формат!';
            response.data = lng;

            return res.send(response);

        }//if

        let jsonData = {};

        jsonData[`lat`] = lat;
        jsonData[`lng`] = lng;
        fs.writeFileSync(path, JSON.stringify(jsonData));



        response.code = 200;
        response.message = 'Данные изменены!';
        //response.data = categoryID;

        res.send(response);

    }
    catch(ex){

        response.code = 500;
        response.message = 'Внутренняя ошибка сервера';
        response.data = ex;
console.log(ex);
        res.send( response );

    }//catch

};