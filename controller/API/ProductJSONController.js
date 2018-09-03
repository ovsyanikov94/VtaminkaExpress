"use strict";

const Product = require('../../model/defenitions').Product;
const Category = require('../../model/defenitions').Category;
const Response = require('../../model/Response');
const ProductAttributes = require('../../model/defenitions').ProductAttributes;

const ProductAndAttributes = require('../../model/defenitions').ProductAndAttributes;

const ProductAndCategories = require('../../model/defenitions').ProductAndCategories;
const ProductImages = require('../../model/defenitions').ProductImages;
const fs = require('fs');
const xmlHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const RegularExpressions = require('../../model/RegularExpressions');

module.exports.GetProductJSON = async ( req , res )=>{



    let limit = 2;
    let offset = +req.params.offset;
    console.log(offset);

    try{

        let productLength = await Product.count({

        });
        let prod = [];
        let products = [];


        if (offset > productLength) {


            return;


        }//if
        prod = await Product.findAll({
            limit: limit,
            offset: offset
        });


        offset = offset + limit;

        for ( let i = 0 ; i < prod.length; i++ ){

            let product = await Product.findById( prod[i].productID , {
                include: [
                    {
                        model: Category,
                        as: 'categories',
                        //attributes: { exclude: ['categoryTitle'] },
                    },
                    {
                        model: ProductAttributes
                    }
                ]
            });

            product.image = await ProductImages.findOne({
                where: {
                    productID: prod[i].productID
                }
            });

            products.push(product)

        }//for i


        if( !products ){
            throw new Error('Product not found!');
        }//if



        var str = JSON.stringify(products);

        var url = "http://localhost:3000/panel";



        var xhr = new xmlHttpRequest();
        xhr.open('GET', url, true)

        xhr.send(str);
    }//try
    catch(ex){
        res.render('error' , { error: ex });
    }//catch

};