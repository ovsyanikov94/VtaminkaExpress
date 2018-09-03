"use strict";

const Response = require('../../model/Response');
const PromoCodes = require('../../model/defenitions').PromoCodes;
//const fs = require('fs');
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
        let delivery = req.body.deliveryValue;      //цена за доставку
        let count = req.body.promoCountValue;       //кол-во промо-кодов
        let startDate = req.body.startDateValue;    //начальная дата промо-кода
        let expireDate = req.body.expireDateValue;  //конечная дата промо-кода

        //создаём запись в базе данных промо-кодов
        let newPromoCode = await PromoCodes.create({
           'discountCode': promoCode,
           'discount': percentage,
           'delivery': delivery,
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