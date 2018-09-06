"use strict";

const FeedBack = require('../../model/defenitions').FeedBack;

//const RegularExpressions = require('../../model/RegularExpressions');

const Response = require('../../model/Response');

module.exports.GetFeedBacksListAction = async ( req , res )=>{

    try{

        let fBacks = await FeedBack.findAll();
        //console.log(fBacks);

        res.render('feedBacks/feedBacks-list',{'fBacks': fBacks});


    }//try
    catch(ex){

        res.render('error',{'error': ex});

    }//catch

};

module.exports.ProcessedFeedBack = async ( req , res )=>{


    let response = new Response();

    try{

        let fBackId = +req.params.id;

        console.log(fBackId);
        if( isNaN(fBackId) ){

            response.code = 400;
            response.message = 'ID Сообщения задан не верно!';
            response.data = fBackId;

            return res.send(response);

        }//if

        let fBack = await FeedBack.findById(fBackId);
        console.log(fBack);
        if(fBack){
            let updateResult = await FeedBack.update({

                fUserName:  fBack.fUserName,
                fUserEmail: fBack.fUserEmail,
                fUserPhone: fBack.fUserPhone,
                fMessage: fBack.fMessage,
                fProcessed:  true,
            });

            response.code = 200;
            response.message = 'Сообщение успешно обработано!';
            response.data = updateResult;
        }//if
        else{
            response.code = 404;
            response.message = 'Сообщение не найденo!';
            response.data = categoryID;

        }//if




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

