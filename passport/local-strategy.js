"use strict";
const bcrypt = require("bcrypt");
const Op = require("sequelize").Op;

const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../model/defenitions').Admin;
const AuthTokens = require('../model/defenitions').AuthTokens;

const AdminPayload = {
    'token': '',
    'adminID': ''
};

async function GenerateTokenForAdmin( ){

    let expires = new Date();
    expires.setHours( expires.getHours() + 1 );


    let salt = await bcrypt.genSalt(10);
    let token = await bcrypt.hash( expires + new Date() , salt );

    return {
        'token': token,
        'expires': expires
    };

}

module.exports = async ( passport )=>{

    passport.serializeUser(function(admin, done) {

        AdminPayload.adminID = admin.adminID;
        AdminPayload.token = admin.token;

        done(null, AdminPayload);
    });

    //JWT
    passport.deserializeUser(async function(payload, done) {

        let admin = await Admin.findOne({
            where:{
                adminID: payload.adminID
            },
            attributes: [ 'adminID' , 'login']
        });

        if( !admin ){
            return done(null , false);
        }//if

        let now = new Date();

        let token = await AuthTokens.findOne({
           where:{
               [Op.and]:{
                   adminID: admin.adminID,
                   expiresOn: {
                       [Op.gt]: now
                   },
                   token: payload.token
               }
           }
        });

        if(token){
            return done(null , admin);
        }//if

        done(null , false);

    });

    passport.use(new LocalStrategy(
        {
            usernameField: 'login',
            passwordField: 'password'
        },
        async function(login, password, done) {

            try{

                let admin = await Admin.findOne({
                    where:{
                        login: login
                    }
                });

                if(!admin){
                    return done(null , false);
                }//if

                let result = await admin.validatePassword(password);

                if(!result){
                    return done(null , false);
                }//if

                let accessToken = await GenerateTokenForAdmin();

                await AuthTokens.create({
                    adminID: admin.adminID,
                    token: accessToken.token,
                    expiresOn: accessToken.expires
                });

                admin.token = accessToken.token;

                return done( null , admin );

            }//try
            catch(ex){
                return done(ex);
            }//catch

        }//function

    ));//passport.use

};

