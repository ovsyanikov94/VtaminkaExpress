"use strict";

const Response = require('../../model/Response');
const PromoCode = require('../../model/defenitions').PromoCodes;

const Op = Sequelize.Op

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

        let promo = await PromoCode.findOne({
            where:{
                discountCode: promoCode
            }
        });

        if(!promo){

            response.code = 404;
            response.message = "Промо-код не найден!";

            return res.send(response);

        }//if

        let promoPercentage = +promo.discount;
        let promoCount = +promo.promoCount;
        let promostartAtDate = promo.startAtDate;
        let promoexpireAtDate = promo.expireAtDate;

        let decreasedPromoCount = promoCount--;

        if(promoCount !== 0){

            await promo.update({
                'promoCount': decreasedPromoCount
            });

        }//if

        response.code = 200;
        response.data = promoPercentage;

    }//try
    catch(ex){
        response.code = 500;
        response.data = null;
        response.message = "Внутренняя ошибка сервера!";
    }//catch

    res.status(response.code);
    res.send( response );

};