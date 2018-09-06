"use strict";


const Orders = require('../../model/defenitions').Orders;
const StatusOrder = require('../../model/defenitions').StatusOrder;

const Product = require('../../model/defenitions').Product;
const Category = require('../../model/defenitions').Category;
const Response = require('../../model/Response');
const ProductAttributes = require('../../model/defenitions').ProductAttributes;

const ProductAndAttributes = require('../../model/defenitions').ProductAndAttributes;

const ProductAndCategories = require('../../model/defenitions').ProductAndCategories;
const ProductImages = require('../../model/defenitions').ProductImages;
const fs = require('fs');


const RegularExpressions = require('../../model/RegularExpressions');

module.exports.GetOrdersListAction = async ( req , res )=>{

    try{

        let orders = await Orders.findAll({
            limit: 10,
            offset: 0
        });

        let statuses = await StatusOrder.findAll({

        });

        res.render('orders/orders-list' , { 'orders': orders, 'statuses': statuses  });

    }//try
    catch(ex){

        res.render('error' , ex);

    }//catch

};

module.exports.ChangeStatusOrder = async ( req , res )=>{

    try{

        let orders = await Orders.findAll({
            limit: 10,
            offset: 0
        });

        let statuses = await StatusOrder.findAll({

        });

        res.render('orders/orders-list' , { 'orders': orders, 'statuses': statuses  });

    }//try
    catch(ex){

        res.render('error' , ex);

    }//catch

};