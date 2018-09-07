"use strict";


const Orders = require('../../model/defenitions').Orders;
const StatusOrder = require('../../model/defenitions').StatusOrder;
const OrdersAndProduct = require('../../model/defenitions').OrdersAndProduct;
const Users = require('../../model/defenitions').Users;
const PromoCodes = require('../../model/defenitions').PromoCodes;



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
        for(let i=0; i<orders.length; i++){

            for(let j=0; j<statuses.length; j++){

                if(orders[i].statusID===statuses[j].statusID){

                    orders[i].currentStatusName = statuses[j].statusTitle;

                }//if

            }//for j

        }//for i
        res.render('orders/orders-list' , { 'orders': orders, 'statuses': statuses  });

    }//try
    catch(ex){

        res.render('error' , ex);

    }//catch

};

module.exports.ChangeStatusOrder = async ( req , res )=>{

    let response = new Response();
    try{

        let orderID = +req.params.id;
        let statusID = +req.body.newStatusId;

        if( isNaN(orderID) ){

            response.code = 400;
            response.message = 'ID заказа задан не верно!';
            response.data = orderID;

            return res.send(response);

        }//if

        if( isNaN(statusID) ){

            response.code = 400;
            response.message = 'ID статуса задан не верно!';
            response.data = statusID;

            return res.send(response);

        }//if

        let order = await Orders.findById(orderID);

        let status = await StatusOrder.findById(statusID);


        if( order ){

            let updateResult = await order.update({
                'statusID':  statusID
            });
            //
            response.statusTitle = status.statusTitle;

            response.code = 200;
            response.message = 'Статус заказа успешно обновлен';
            response.data = updateResult;

            res.send(response);

        }//if
        else{


            response.code = 404;
            response.message = 'Заказ не найден!';
            response.data = statusID;

            res.send(response);

        }//else

    }//try
    catch(ex){

        response.code = 500;
        response.message = 'Внутренняя ошибка сервера';
        response.data = ex;

        res.send( response );

    }//catch

};

module.exports.RemoveOrder = async ( req , res )=>{

    let response = new Response();

    try{

        let orderID = +req.body.orderID;

        if( isNaN(orderID) ){

            response.code = 400;
            response.message = 'ID заказа задан не верно!';
            response.data = orderID;

            return res.send(response);

        }//if

        let order = await Orders.findById(orderID);

        if(!order){

            response.code = 404;
            response.message = 'Заказ не найден!';
            response.data = orderID;

            return res.send(response);


        }//if

        await order.destroy();

        response.code = 200;
        response.message = 'Заказ успешно обновлена';
        //response.data = orderID;
        res.send(response);

    }//try
    catch(ex){


        response.code = 500;
        response.message = 'Внутренняя ошибка сервера';
        response.data = ex;

        res.send( response );

    }//catch

};
module.exports.GetSingleOrderAction = async ( req , res )=>{

    try{

        let order = await Orders.findById( req.params.id , {
            include: [
                {
                    model: Product,

                }
            ]
        });

        if( !order ){
            throw new Error('Order not found!');
        }//if

        let user = await Users.findById( order.userID , {

        });
        let promo = await PromoCodes.findById( order.promoID , {

        });
        let ordersAndProduct = await OrdersAndProduct.findAll({
            where: {
                orderID: req.params.id
            }
        });
        let allProduct = await Product.findAll({

        });
        let products = [];

        for(let i=0; i<allProduct.length; i++){

            for(let j=0; j<ordersAndProduct.length; j++){

                if(ordersAndProduct[j].productID === allProduct[i].productID){
                    let product={
                        productID:allProduct[i].productID,
                        productTitle:allProduct[i].productTitle,
                        amount:ordersAndProduct[j].productAmount,
                        fixedPrice:ordersAndProduct[j].productPrice
                    }

                    products.push(product);
                }//if

            }//for j


        }//for i

        let status = await ProductImages.findById( order.statusID , {

        });

        let productImages =  await ProductImages.findAll({

        });
        for(let i=0; i<products.length; i++){

            for(let j=0; j<productImages.length; j++){

                if(productImages[j].productID == products[i].productID){
                    products[i].imagePath = productImages[j].imagePath;

                }//if

            }//for j


        }//for i


        res.render('orders/single-order' , {order: order, user: user, promo:promo, products: products, status: status });

    }//try
    catch(ex){
        res.render('error' , { error: ex });
    }//catch

};

module.exports.GetStatusListAction = async ( req , res )=>{

    try{

        let statuses = await StatusOrder.findAll({

        });

        for ( let i = 0 ; i < statuses.length ; i++ ){

            let status = statuses[i];

            status.orderAmount = await Orders.count({
                where: {
                    statusID: status.statusID
                }
            });

        }//for i
        res.render('orders/statuses-list' , { 'statuses': statuses });

    }//try
    catch(ex){

        res.render('error' , ex);

    }//catch

};

module.exports.GetAddStatusAction = async ( req , res )=>{

    res.render('orders/new-status');

};

module.exports.AddStatus = async ( req , res )=>{

    let response = new Response();

    try{

        let statusTitle = req.body.statusTitle.trim();

        if(!statusTitle.match(RegularExpressions.CategoryTitleExpression)){

            response.code = 400;
            response.message = 'Название статуса имеет неверный формат!';
            response.data = statusTitle;

            return res.send(response);

        }//if

        let newStatus = await StatusOrder.create({
            statusTitle: statusTitle
        });

        response.code = 200;
        response.message = 'Статус успешно добавлен';
        response.data = newStatus;

        res.send(response);


    }//try
    catch(ex){

        response.code = 500;
        response.message = 'Внутренняя ошибка сервера';
        response.data = ex;

        res.send( response );

    }//catch

};