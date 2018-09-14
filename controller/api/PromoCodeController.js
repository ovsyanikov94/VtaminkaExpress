"use strict";

const Response = require('../../model/Response');
const PromoCode = require('../../model/defenitions').PromoCodes;

const Op = require('sequelize').Op;

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

module.exports.UsePromoCode = async (req, res) => {

    let response = new Response();

    let promoCode = req.body.promoCode;

    try{

        let currentDate = new Date();

        let promo = await PromoCode.findOne({
            where:{
                discountCode: promoCode,
                startAtDate:{
                    [Op.lte]: currentDate
                },
                expireAtDate:{
                    [Op.gte]: currentDate
                },
                promoCount:{
                    [Op.gt]: 0
                }
            }
        });

        if(!promo){

            response.code = 404;
            response.message = "Промо-код не найден!";

            return res.send(response);

        }//if

        await promo.update({
            'promoCount': promo.promoCount - 1
        });

        response.code = 200;
        response.data = promo.discount;

    }//try
    catch(ex){
        response.code = 500;
        response.data = null;
        response.message = "Внутренняя ошибка сервера!";
    }//catch

    res.status(response.code);
    res.send( response );

};