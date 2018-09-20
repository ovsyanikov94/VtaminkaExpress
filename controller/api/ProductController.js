"use strict";

const Op = require('sequelize').Op;
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

        let limit = +req.query.limit || 2;
        let offset = +req.query.offset || 0;


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

module.exports.GetProduct = async ( req , res )=>{

    let response = new Response();

    try{


        let product = await Product.findById( req.params.id , {
            include: [
                {
                    model: ProductAttributes
                }
            ],
            attributes: {
                exclude: ['updated' , 'created']
            }

        });

        if( !product ){

            response.code = 404;
            response.data = req.params.id;
            response.message = "Товар не найден";

            res.status(404);

            return res.send(response);

        }//if

        product.image = await ProductImages.findOne({
            where: {
                productID: product.productID
            },
            attributes: ['imagePath']
        });


        response.code = 200;
        response.data = product;

    }//try
    catch(ex){

        response.code = 500;
        response.data = null;
        response.message = "Внутренняя ошибка сервера!";

    }//catch

    res.status(response.code);
    res.send( response );

};

module.exports.GetProductsByIds = async ( req , res )=>{

    let response = new Response();

    try{

        let ids = req.body.ids;

        let products = await Product.findAll({
            where:{
                productID: {
                    [Op.in]: ids
                }
            }
        });


        for(let i = 0 ; i < products.length ; i++ ){

            let product = products[i];

            product.image = await ProductImages.findOne({
                where: {
                    productID: product.productID
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
