"use strict";

const Response = require('../../model/Response');
const PromoCode = require('../../model/defenitions').PromoCodes;

module.exports.GetPromoCodes = async(req, res) => {

    let response = new Response();

    try{

        const promoCodes = await PromoCode.findAll();

        response.code = 200;
        response.data = promoCodes;

    }//try
    catch(ex){
        response.code = 500;
        response.data = null;
        response.message = "Внутренняя ошибка сервера!";
    }//catch

    res.status(response.code);
    res.send(response);

};