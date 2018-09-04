"use strict"

const Response = require('../../model/Response');

const News = require('../../model/defenitions').News;
const NewsImage = require('../../model/defenitions').newsImage;
const fs = require('fs');
const fe = require('fs-extra');
module.exports.GetNewsList = async(req,res)=>{

    let limit = req.query.limit || 10;
    let offset = req.query.offset || 0;

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
    res.render('blog/news-list',{ 'news':news });

}//GetNewsList

module.exports.addNewsAction = async(req,res)=>{
    res.render('blog/add-news');

}
module.exports.addNews=async(req,res)=>{
    let response = new Response();
    let title = req.body.newsTitle;
    let text = req.body.newsText;

    try{
        let newNews = await News.create({
            newsTitle:title,
            newsText:text
        });

        if(req.files){

            let newsImage = req.files.image
            let path = `public/images/news/${newNews.newsID}`;

            console.log(path);
            if(!fs.existsSync('public/images')){
                fs.mkdirSync('public/images');
            }

            if(!fs.existsSync('public/images/news')){
                fs.mkdirSync('public/images/news');
            }

            try{
                fs.mkdirSync(path);
            }catch(ex){
                console.log(ex)
            }

            newsImage.mv( `${path}/${newsImage.name}`,async function(err){

                if (err){
                    console.log('FILE UPLOAD ERROR:' , err);
                    return;
                }//if

                let path = `images/news/${newNews.newsID}/${newsImage.name}`;

                let newImage = await NewsImage.create({

                    newsID:newNews.newsID,
                    imagePath:path
                })


            })
        }

        response.code = 200;
        response.message = 'новость успешно добавлен!';
        response.data = newNews;
    }
    catch (ex){
        response.code = 500;
        response.message = 'ощибка сервера!';

    }

    res.status( response.code );
    res.send( response );

}//addNews

module.exports.removeNews=async(req,res)=>{

    let id = req.body.id;

    let news =await News.findOne({
        where:{
            newsID:id
        }
    });

    if(news){

        let path = await NewsImage.findOne({
            where:{
                newsID:id
            }
        });

        console.log('2',path);
        console.log('2',path.imagePath);
        fe.remove(`public/${path.imagePath}`, function(err){
            if (err) return console.error(err);

            console.log("success!")
        });
    }



    res.status(200
    );
    res.send("Good");

}//removeNews

module.exports.updateNews=async(req,res)=>{

}//updateNews

module.exports.GetSingleNews=async(req,res)=>{


}//GetSingleNews