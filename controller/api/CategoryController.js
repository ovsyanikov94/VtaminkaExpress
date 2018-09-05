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

        let id = +req.query.id;

        const pCategories = await ProductAndCategories.findAll({

            where:{categoryID:id},
            attributes: {
                exclude: [
                    'ID',
                    'categoryID',
                ]
            }
        });

        const products = await Product.findAll({

            where:{productID:pCategories[1].productID},
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