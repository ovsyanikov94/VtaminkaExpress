"use strict";

const Product = require('../../model/defenitions').Product;
const Category = require('../../model/defenitions').Category;
const Response = require('../../model/Response');
const ProductAttributes = require('../../model/defenitions').ProductAttributes;

const ProductAndAttributes = require('../../model/defenitions').ProductAndAttributes;

const ProductAndCategories = require('../../model/defenitions').ProductAndCategories;
const ProductImages = require('../../model/defenitions').ProductImages;
const fs = require('fs');

const RegularExpressions = require('../../model/RegularExpressions');

module.exports.GetProducts = async ( req , res )=>{


    let response = new Response();

    try{

        let limit = +req.query.limit;
        let offset = +req.query.offset;


        const products = await Product.findAll({
           limit: limit,
           offset: offset,
           attributes: {
               exclude: [
                   'productDescription',
                   'created',
                   'updated'
               ]
           }
        });

        for ( let i = 0 ; i < products.length ; i++ ){

            let product = products[i];

            product.image = await ProductImages.findOne({
                where:{
                    productID: product.productID
                },
                attributes: {
                    exclude: [
                        'ID',
                        'productID',
                        'createdAt',
                        'updatedAt'
                    ]
                }
            });

        }//for i


        response.code = 200;
        response.data = products;

    }//try
    catch(ex){

        response.code = 500;
        response.data = null;
        response.message = "Внутренняя ошибка сервера!";

    }//catch

    res.status(response.code);
    res.send( response );

};