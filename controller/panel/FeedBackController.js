"use strict";

const FeedBack = require('../../model/defenitions').FeedBack;
const nodemailer = require('../../node_modules/nodemailer/lib/nodemailer');
//const RegularExpressions = require('../../model/RegularExpressions');

const Response = require('../../model/Response');

module.exports.GetFeedBacksListAction = async ( req , res )=>{

    try{

        let limit = req.query.limit || 10;
        let offset = req.query.offset || 0;

        let fBacks = await FeedBack.findAll({
            limit: limit,
            offset: offset,
            order: [
                ['feedBackID' , 'DESC']
            ]
        });
        //console.log(fBacks);

        res.render('feedBacks/feedBacks-list',{'fBacks': fBacks});


    }//try
    catch(ex){

        res.render('error',{'error': ex});

    }//catch

};

module.exports.GetSinglFeedBackAction = async ( req , res )=>{

    try{


        let fBackId = +req.params.id;

        //console.log(fBackId);
        if( isNaN(fBackId) ){

            response.code = 400;
            response.message = 'ID Сообщения задан не верно!';
            response.data = fBackId;

            return res.send(response);

        }//if

        let fBack = await FeedBack.findById(fBackId);

        if(!fBack){
            response.code = 400;
            response.message = 'Сообщение с таким ID не найден!';
            response.data = fBackId;

            return res.send(response);
        }//if

        res.render('feedBacks/feedBack-simple',{'fBack': fBack});


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

        fBack.fProcessed = true;
        //console.log(fBack);
        if(fBack){

            let updateResult = await fBack.update({

                'fProcessed':  fBack.fProcessed,
            });

            response.code = 200;
            response.message = 'Сообщение успешно обработано!';
            response.data = fBackId;
        }//if
        else{
            response.code = 404;
            response.message = 'Сообщение не найденo!';
            response.data = fBackId;

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

module.exports.SendMessage = async ( req , res )=>{


    let response = new Response();

    try{

        let fBackId = +req.body.fBackId;
        let responseText = req.body.responseText;

        console.log('fBackId: %s', fBackId);
        console.log('responseText: %s', responseText);

       let fBack = await FeedBack.findById(fBackId);

        if(!fBack){
            response.code = 404;
            response.message = 'Сообщение не найденo!';
            response.data = fBackId;
            return res.send(response);
        }//if

        nodemailer.createTestAccount((err, account) => {

            let transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: 'rcvqptjzqtm2a2hq@ethereal.email',
                    pass: 'AhZfk3zFEfjJDvdv2M'
                }
            });


            let mailOptions = {
                from: '"Support Vtaminka" <SupportVtaminka@example.com>', // sender address
                to: `${fBack.fUserEmail}`, // list of receivers
                subject: 'Vtaminka response ✔', // Subject line
                text: `${responseText}`, // plain text body
                html: '' // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));


            });
        });


        let updateResult = await fBack.update({

            'fProcessed':  true,
        });


        response.code = 200;
        response.message = 'Сообщение успешно отправлено!';
        response.data = updateResult;


    }//try
    catch(ex){

        response.code = 500;
        response.data = null;
        response.message = "Внутренняя ошибка сервера!";

    }//catch

    res.status(response.code);
    res.send( response );

};
