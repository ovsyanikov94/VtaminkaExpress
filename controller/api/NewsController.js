"use strict"

const Response = require('../../model/Response');

const News = require('../../model/defenitions').News;
const NewsImage = require('../../model/defenitions').newsImage;
const fs = require('fs');
const fe = require('fs-extra');

module.exports.GetNewsList = async(req,res)=>{
    let response = new Response();
    let limit = +req.query.limit || 10;
    let offset = +req.query.offset || 0;

    try {
        let news = await News.findAll({
            limit: limit,
            offset: offset
        });


        for ( let i = 0 ; i < news.length ; i++ ){

            news[i].image = await NewsImage.findOne({
                where:{
                    newsID: news[i].newsID
                }
            });

        }//for i

        response.status = 200;
        response.code=200;
        response.message ="операция успешно заверщена";
        response.data = news;

    }
    catch (ex){

        response.status = 500;
        response.code=500;
        response.message ="ощибк сервера";
        console.log('ex', ex);

    }


    res.send(response);

}//GetNewsList__Api


module.exports.GetNews = async(req,res)=>{
    let response = new Response();
    let id = req.query.id;
        try{
            if(!id){
                response.status=404;
                response.code=404;
                response.message = "Новость не найдена!";
                response.data = id;

                throw response;
            }

            let news = await News.findOne({
                where:{
                    newsID: id
                }
            });

            news.image = await NewsImage.findOne({
                where:{
                    newsID: news.newsID
                }
            });

            response.status = 200;
            response.code=200;
            response.message ="операция успешно заверщена";
            response.data = news;

        }
        catch (ex){
            response.status=500;
            response.code=500;
            response.message = "Ощибка вервера!";

        }

    res.send(response);

}//GetNews__Api