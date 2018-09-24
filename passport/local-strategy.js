"use strict";

const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../model/defenitions').Admin;

module.exports = async ( passport )=>{

    passport.serializeUser(function(admin, done) {
        console.log('serialize')
        done(null, admin.adminID);
    });

    passport.deserializeUser(async function(adminID, done) {

        let admin = await Admin.findOne({
            where:{
                adminID: adminID
            },
            attributes: [ 'adminID' , 'login']
        });

        console.log( 'deserialize' , adminID );

        done(null , admin);

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

                return done( null , admin );

            }//try
            catch(ex){
                return done(ex);
            }//catch

        }//function

    ));//passport.use

};

