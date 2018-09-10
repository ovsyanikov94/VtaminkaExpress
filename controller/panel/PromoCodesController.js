"use strict";

const Response = require('../../model/Response');
const PromoCodes = require('../../model/defenitions').PromoCodes;
//const RegularExpressions = require('../../model/RegularExpressions');

//получаем список имеющихся промокодов в базе данных
module.exports.GetPromoCodesListAction = async (req, res) => {

  try {

      let promoCodes = await PromoCodes.findAll();

      res.render('promo-codes/promo-codes-list', {'promoCodes': promoCodes});

  }//try
  catch (ex) {

      res.render('error', ex);

  }//catch

};

//добавление нового промо-кода
module.exports.AddNewPromoCode = async (req, res) => {

    let response = new Response();

    try{

        //извлекаем данные из полей страницы
        let promoCode = req.body.promoCode;    //значение промо-кода
        let percentage = req.body.percentageValue;  //процент снижения цены
        let count = req.body.promoCountValue;       //кол-во промо-кодов
        let startDate = req.body.startDateValue;    //начальная дата промо-кода
        let expireDate = req.body.expireDateValue;  //конечная дата промо-кода

        //создаём запись в базе данных промо-кодов
        let newPromoCode = await PromoCodes.create({
           'discountCode': promoCode,
           'discount': percentage,
           'promoCount': count,
           'startAtDate': startDate,
           'expireAtDate': expireDate,
        });

        //формируем успешный ответ
        response.code = 200;
        response.message = 'Новый промо-код успешно добавлен!'
        response.data = newPromoCode;


    }//try
    catch(ex){

        response.code = 500;
        response.message = 'Внутрення ошибка сервера';
        console.log('ex', ex);

    }//catch

    res.status(response.code);
    res.send(response);

};


//обновление промо-кода
module.exports.UpdatePromoCodeAction = async (req, res)=>{

    try {

        let promoCodeID = +req.params.id;
        let promoCodeToUpdate = await PromoCodes.findById(promoCodeID);

        console.log(promoCodeToUpdate);

        res.render('promo-codes/update-promo-code', { promoCode : promoCodeToUpdate });

    }//try
    catch(ex){
        res.render('error', {error: ex});
    }//catch

};
module.exports.UpdatePromoCode = async (req, res)=>{

    let response = new Response();

    try {

        let promoCodeID = req.params.id;
        let promoCodeToUpdate = await PromoCodes.findById(promoCodeID);

        //если промо-код в базе не найден формируем ответ
        if(!promoCodeToUpdate){

            response.code = 404;
            response.message = 'Промо-код не найден!';
            response.data = promoCodeID;

            res.status(response.code);

            return res.send(response);

        }//if

        let newPromoCode = req.body.newPromoCodeValue;
        let newPercentage = req.body.newPercentageValue;
        let newPromoCount = req.body.newPromoCountValue;
        let newStartDate = req.body.newStartDateValue;
        let newExpireDate = req.body.newExpireDateValue;

        await promoCodeToUpdate.update({
            'discountCode': newPromoCode,
            'discount': newPercentage,
            'promoCount': newPromoCount,
            'startAtDate': newStartDate,
            'expireAtDate': newExpireDate,
        });

        response.code = 200;
        response.message = 'Промо-код успешно обновлен!';

    }//try
    catch(ex){
        response.code = 500;
        response.message = 'Внутренняя ошибка сервера!';
        console.log(ex);
    }//catch

    res.status(response.code);
    res.send(response);

};


//удаление промо-кода
module.exports.DeletePromoCode = async (req, res)=>{

    let response = new Response();

    let promoCodeId = +req.body.promoCodeId;

    console.log(promoCodeId);

    try {

        let promoCodeToDelete = await PromoCode.findById(promoCodeId);

        if(!promoCodeToDelete){

            response.code = 404;
            response.message = "Промо-код не найден!";
            response.data = promoCodeId;

            return res.send(response);

        }//if

        await promoCodeToDelete.destroy();

        response.code = 200;
        response.message = "Промо-код успешно удалён";
        response.data = promoCodeToDelete;

    }//try
    catch(ex){

        response.code=500;
        response.message="Ошибка сервера";
        return res.send(response)

    }//catch

    res.status(response.code);
    res.send(response);

};
