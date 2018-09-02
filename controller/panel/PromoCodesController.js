"use strict";

const responce = require('../../model/Response');
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
        let promoCode = req.body.promoCodeInput;    //значение промо-кода
        let percentage = req.body.percentageInput;  //процент снижения цены
        let delivery = req.body.deliveryInput;      //цена за доставку
        let count = req.body.promoCountInput;       //кол-во промо-кодов
        let startDate = req.body.startDateInput;    //начальная дата промо-кода
        let expireDate = req.body.expireDateInput;  //конечная дата промо-кода


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
        responce.code = 200;
        responce.message = 'Новый промо-код успешно добавлен!'
        responce.data = newPromoCode;

        res.send(response);


    }//try
    catch(ex){

        response.code = 500;
        response.message = 'Внутрення ошибка сервера';
        console.log('ex', ex);

    }//catch

};