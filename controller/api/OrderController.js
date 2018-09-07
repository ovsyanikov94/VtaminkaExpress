"use strict";

const Product = require('../../model/defenitions').Product;
const Users = require('../../model/defenitions').Users;
const UsersAndCart = require('../../model/defenitions').UsersAndCart;
const Cards = require('../../model/defenitions').Cards;
const Orders = require('../../model/defenitions').Orders;
const OrdersAndProduct = require('../../model/defenitions').OrdersAndProduct;
const PromoCodes = require('../../model/defenitions').PromoCodes;
const StatusOrder = require('../../model/defenitions').StatusOrder;

const Response = require('../../model/Response');

const RegularExpressions = require('../../model/RegularExpressions');

module.exports.AddOrder = async ( req , res )=>{


    let response = new Response();


    try{

        let userName = req.body.userName.trim();

        let userEmail= req.body.userEmail.trim();
        let userPhone= req.body.userPhone.trim();
        let userAdress= req.body.userAdress.trim();
        let userMessage= req.body.userMessage.trim();

        let numberCard =  req.body.numberCard.trim();
        let yearCard =  +req.body.yearCard;
        let monthCard =  +req.body.monthCard;
        let cvvCard =  +req.body.cvvCard;
        let nameCard =  req.body.nameCard.trim();

        let promoCode =  req.body.promoCode.trim();

       
        //let products = JSON.parse(req.body.products);
        let products = req.body.products;
        
        if(!userName.match(RegularExpressions.NameOrderExpression)){

            response.code = 400;
            response.message = 'Имя пользователя имеет неверный формат!';
            response.data = userName;

            return res.send(response);

        }//if

        if(!userEmail.match(RegularExpressions.EmaailOrderExpression)){

            response.code = 400;
            response.message = 'Email пользователя имеет неверный формат!';
            response.data = userEmail;

            return res.send(response);

        }//if

        if(!userPhone.match(RegularExpressions.PhoneOrderExpression)){

        response.code = 400;
        response.message = 'Телефон пользователя имеет неверный формат!';
        response.data = userPhone;

        return res.send(response);

    }//if

        if(!numberCard.match(RegularExpressions.CardOrderExpression)){

            response.code = 400;
            response.message = 'Номер карты пользователя имеет неверный формат!';
            response.data = numberCard;

            return res.send(response);

        }//if


        let userFind = await Users.findOne({
            where:{
                userEmail: userEmail
            }
        });

        let user = {};

        if(userFind){

             user = await userFind.update({
                userName: userName,
                userPhone: userPhone
            });

        }//if
        else{

            
             user = await Users.create({
                userEmail:userEmail,
                userName: userName,
                userPhone:userPhone
            });

        }//else

        let cardNumberOrder = numberCard;

        let card = await Cards.findOne({
            where:{
                cardNumber: numberCard
            }
        });

        if(card){
            let userCard = await UsersAndCart.findOne({
                where:{
                    userID: user.userID,
                    cardID: card.cardID
                }
            });

            if(!userCard){
                await UsersAndCart.create({
                    userID: user.userID,
                    cardID: card.cardID
                })
            }//if
        }//if
        else{

            let newCard = await Cards.create({
                cardNumber: numberCard,
                year: yearCard,
                month: monthCard,
                cvv: cvvCard,
                userCardName: nameCard
            });

            cardNumberOrder = newCard.cardNumber;

            await UsersAndCart.create({
                userID: user.userID,
                cardID: newCard.cardID
            })
        }//else

        let totalPrice=0;
        let totalPriceWithDiscount=0;

        for(let i=0; i<products.length; i++){
            let product = products[i];

            let pFind = await Product.findById(product.productID);

            let pPrice = pFind.productPrice;

            totalPrice += pPrice*+product.amount;
        }//for

        let promoID=-1;
        if(promoCode){

            let promo = await PromoCodes.findOne({
                where:{
                    discountCode:promoCode
                }
            });

            if(promo){
                totalPriceWithDiscount = +totalPrice*(1 - +promo.discount/100);
                promoID=promo.promoCodeID;
            }
            else{
                promoID= null;
            }
        }//if

        let status = await StatusOrder.findOne({
            where:{
                statusTitle: "Новый"
            }
        });

        if(!status){
            await StatusOrder.create({
                statusTitle: "Новый"
            });
        }//if

        let newStatus = await StatusOrder.findOne({
            where:{
                statusTitle: "Новый"
            }
        });

        let newOrder = await Orders.create({

            orderAdress:userAdress,
            orderMessage:userMessage,
            orderDate: new Date(),
            totalPrice:totalPrice,
            totalPriceWithPromo: totalPriceWithDiscount,
            userID: user.userID,
            promoID:promoID,
            statusID: newStatus.statusID,
            numberCard: cardNumberOrder
        });

        for(let i=0; i<products.length; i++){

            let product = products[i];

            let pFind = await Product.findById(product.productID);

            let pPrice = pFind.productPrice;

            await OrdersAndProduct.create({
                productPrice: pPrice,
                productAmount: product.amount,
                orderID: newOrder.orderID,
                productID: product.productID
            });
        }//for


        let oD = await OrdersAndProduct.findAll({
            where:{
                orderID: newOrder.orderID
            }
        });

        response.code = 200;
        response.data = oD;

    }//try
    catch(ex){

        response.code = 500;
        response.data = null;
        response.message = "Внутренняя ошибка сервера!";

    }//catch

    res.status(response.code);
    res.send( response );

};

