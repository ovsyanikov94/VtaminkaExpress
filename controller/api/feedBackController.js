"use strict";

const Response = require('../../model/Response');

const RegularExpressions = require('../../model/RegularExpressions');
const FeedBack = require('../../model/defenitions').FeedBack;


module.exports.AddFeedBack = async ( req , res )=>{


    let response = new Response();

    try{

        let userName = req.body.userName.trim();
        let userEmail = req.body.userEmail.trim();
        let userPhone = req.body.userPhone.trim();
        let userMessage = req.body.userMessage.trim();


        if(!userName.match(RegularExpressions.UserNameExpression)){

            response.code = 400;
            response.message = 'Имя имеет неверный формат!';
            response.data = userName;

            return res.send(response);

        }//if

        if(!userEmail.match(RegularExpressions.EmailExpression)){

            response.code = 400;
            response.message = 'Email имеет неверный формат!';
            response.data = userEmail;

            return res.send(response);

        }//if

        if(!userPhone.match(RegularExpressions.PhoneExpression)){

            response.code = 400;
            response.message = 'Телефон имеет неверный формат!';
            response.data = userPhone;

            return res.send(response);

        }//if

        if(!userMessage.match(RegularExpressions.ProductDescriptionExpression)){

            response.code = 400;
            response.message = 'Сообщение имеет неверный формат!';
            response.data = userMessage;

            return res.send(response);

        }//if



        let newFeedBack = await FeedBack.create({
            fUserName:  userName,
            fUserEmail: userEmail,
            fUserPhone: userPhone,
            fMessage: userMessage,
            fProcessed: false
        });


        response.code = 200;
        response.message = 'Сообщение успешно добавлено';
        response.data = newFeedBack;

        //res.send(response);



    }//try
    catch(ex){

        response.code = 500;
        response.data = null;
        response.message = "Внутренняя ошибка сервера!";

    }//catch

    res.status(response.code);
    res.send( response );

};

