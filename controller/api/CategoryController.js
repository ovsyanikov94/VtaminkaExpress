"use strict";

const Op = require('sequelize').Op;

const Product = require('../../model/defenitions').Product;
const Category = require('../../model/defenitions').Category;
const Response = require('../../model/Response');
const ProductAndCategories = require('../../model/defenitions').ProductAndCategories;
const ProductImages = require('../../model/defenitions').ProductImages;


const RegularExpressions = require('../../model/RegularExpressions');

module.exports.GetCategories = async ( req , res )=>{


    let response = new Response();

    try{


        const categories = await Category.findAll();

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

        let categoryID = +req.params.categoryID;
        let limit = +req.query.limit || 10;
        let offset = +req.query.offset || 0;

        if( isNaN(categoryID) ){

            response.code = 404;
            response.data = {
                categoryID: categoryID
            };

            response.message = "Категория передана не верно!";

            res.status(response.code);
            return res.send(response) ;

        }//if

        const category = await Category.findById(categoryID);

        if( !category ){

            response.code = 404;
            response.data = {
                categoryID: categoryID
            };

            response.message = "Категория не найдена!";

            res.status(response.code);
            return res.send(response) ;

        }//if

        let products = await ProductAndCategories.findAll({
            limit: limit,
            offset: offset,
            where: {
                categoryID: categoryID
            },
            attributes: [ 'productID' ]
        });

        let ids = [].map.call( products , p => p.productID );

        products = await Product.findAll({
            order: [
                [ 'productID' , 'DESC' ]
            ],
            attributes: {
                exclude: [ 'created' , 'updated' , 'productDescription' ]
            },
            where:{
                productID: {
                    [Op.in]: ids
                }
            }
        });

        for ( let i = 0 ; i < products.length ; i++ ){

            let product = products[i];
            product.image = await ProductImages.findOne({
                attributes: [ 'imagePath' ],
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