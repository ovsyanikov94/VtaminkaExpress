"use strict";

const Product = require('../../model/defenitions').Product;
const Category = require('../../model/defenitions').Category;
const Response = require('../../model/Response');
const ProductAndCategories = require('../../model/defenitions').ProductAndCategories;
const ProductImages = require('../../model/defenitions').ProductImages;

const RegularExpressions = require('../../model/RegularExpressions');

module.exports.GetCategories = async ( req , res )=>{


    let response = new Response();

    try{


        const categories = await Category.findAll({
        });


        response.code = 200;
        response.data = categories;

    }//try
    catch(ex){

        response.code = 500;
        response.data = null;
        response.message = "Внутренняя ошибка сервера!";

    }//catch

    res.status(response.code);
    res.send( response );

};

module.exports.GetProductsWithCategory = async ( req , res )=>{


    let response = new Response();

    try{

        const categories = await Category.findAll({});


        response.code = 200;
        response.data = categories;

    }//try
    catch(ex){

        response.code = 500;
        response.data = null;
        response.message = "Внутренняя ошибка сервера!";

    }//catch

    res.status(response.code);
    res.send( response );

};