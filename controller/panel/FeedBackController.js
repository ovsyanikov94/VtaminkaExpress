"use strict";

const FeedBack = require('../../model/defenitions').FeedBack;

const nodemailer = require('nodemailer');
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

        fBack.fProcessed = true;
        //console.log(fBack);
        if(fBack){

            let updateResult = await fBack.update({
                'fProcessed':  fBack.fProcessed,
            });

            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'vnbqgi2yx6tbqw7v@ethereal.email',
                    pass: 'futnncvaa2zAFjd9v4'
                }
            });

            let mailOptions = {
                from: 'Vtaminka support<Vtaminka@gmail.com>', // sender address
                to: fBack.fUserEmail, // list of receivers
                subject: 'Support', // Subject line
                text: 'Ваше сообщение обработано!', // plain text body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });

            response.code = 200;
            response.message = 'Сообщение успешно обработано!';
            response.data = updateResult;
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

