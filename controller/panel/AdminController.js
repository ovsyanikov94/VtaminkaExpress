"use strict";

const Admin = require('../../model/defenitions').Admin;
const AuthTokens = require('../../model/defenitions').AuthTokens;
const Response = require('../../model/Response');
const Op = require('sequelize').Op;
const bcrypt = require('bcrypt');

//AJAX
module.exports.RegisterAdmin = async ( req , res )=>{

    let response = new Response();

    try{

        let login = req.body.login;
        let password = req.body.password;
        let email = req.body.email;

        let checkAdmin = await Admin.findOne({
            where: {
                [Op.and]: {
                    login: login,
                    email: email
                }//Op.and

            }//where
        });

        if(checkAdmin){

            response.code = 400;
            response.message = 'Такой логин или email заняты!';
            response.data ={
                login: login,
                email: email
            };

        }//if
        else{

            let saltBounds = 10;

            let salt = await bcrypt.genSalt(saltBounds);

            let hash = await bcrypt.hash(password , salt);

            let newAdmin = await Admin.create({
                login: login,
                email: email,
                password: hash
            });

            response.code = 200;
            response.data = null;
            response.message = "Регистрация успешна!";

        }//else

    }//try
    catch(ex){

        console.log(ex);
        response.code = 500;
        response.data = null;
        response.message = "Внутренняя ошибка сервера!";

    }//catch

    res.status(response.code);
    res.send(response);

};

module.exports.AuthAdmin = async ( req , res )=>{

    let response = new Response();

    try{

        let id = req.body.login || req.body.email;

        let admin = await Admin.findOne({
           where:{
               login: id,
               email: id
           }//where
        });
        let password = req.body.password;

        if( !admin ){

            response.code = 400;
            response.message = 'Кыш!';
            response.data = null

        }//if
        else{

            let hash = admin.password;

            let check = await bcrypt.compare(password , hash);

            let expires = new Date();
            expires.setHours( expires.getHours() + 1 );


            let salt = await bcrypt.genSalt(10);
            let token = await bcrypt.hash( expires + new Date() , salt );

            if(check === true){

                let token = await AuthTokens.create({
                    adminID: admin.adminID,
                    token: token,
                    expiresOn: expires
                });

                response.code = 200;
                response.data = token.token;

            }//if
            else{

                response.code = 400;
                response.message = 'Кыш!';
                response.data = null

            }//else

        }//else

    }//try
    catch(ex){

        console.log(ex);
        response.code = 500;
        response.data = null;
        response.message = "Внутренняя ошибка сервера!";

    }//catch

    res.status(response.code);
    res.send(response);

};

//show auth view
module.exports.AuthAdminAction = async ( req , res )=>{
    res.render('secret/auth');
};

//middleware
module.exports.CheckAccess = async ( req ,res , next ) => {

    try{

        let token = req.query.token || req.body.token;

        if(!token){
            return res.redirect('/admin/secret/auth');
        }//if

        let now = new Date();

        let adminToken = await AuthTokens.findOne({
            where: {
                [Op.and]: {
                    token: token,
                    expiresOn: {
                        [Op.gt]: now
                    }
                }//and
            }
        });

        if( !adminToken ){
            return res.redirect('/admin/secret/auth');
        }//if

        next();

    }//try
    catch(ex){

        console.log(ex);
        return res.redirect('/admin/secret/auth');

    }//catch



};


module.exports.CheckAdminAccess = async ( req , res , next )=>{

    if( req.isAuthenticated() ){
        next();
    }//if
    else{
        res.redirect('/admin/secret/auth');
    }//else

};
