"use strict";

const responce = require('../../model/Response');
const PromoCodes = require('../../model/defenitions').PromoCodes;
//const fs = require('fs');
const RegolarExpressions = require('../../model/RegularExpressions');

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
module.exports.AddNewPromoCodeAction = async (req, res) => {

    let response = new Response();

    try{

        let promoCode = req.body.promoCode;

    }//try
    catch(ex){

        response.code = 500;
        response.message = 'Внутрення ошибка сервера';
        console.log('ex', ex);

    }//catch

};