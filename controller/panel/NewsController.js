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

                let path = `/admin/images/news/${newNews.newsID}/${newsImage.name}`;

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

    let response = new Response();
    let id = +req.body.id;
    let stat=200;
    try{
        let news =await News.findOne({
            where:{
                newsID:id
            }
        });

        if(news) {

            let path = await NewsImage.findOne({
                where: {
                    newsID: id
                }
            });



            fe.remove(`public/${path.imagePath}`, async function (err) {
                if (!err) {

                    await path.destroy();
                    await news.destroy();
                }

            });

            fe.remove(`public/images/news/${news.newsID}`,async function (err){
                if(err){
                    console.log('ERROR');
                }
            });
        }
        response.code=200
        response.message = "новость удалена"

    }catch (ex){



        response.code=500
        response.message = "ощибка сервера"
        stat=500;
    }




    res.status(stat);
    res.send(response);

}//removeNews

module.exports.updateNewsAction=async(req,res)=>{
    let response = new Response();
    let id = +req.params.id;

    if(!id){
        response.code =404;
        response.message = "новость не найдена ";
        return response;
    }

    try{

        let oneNews = await News.findOne({
            where:{
                newsID:id
            }
        })

        oneNews.image = await NewsImage.findOne({
            where:{
                newsID: oneNews.newsID
            }
        });


        res.render('blog/single-news',{ 'news':oneNews });

    }catch (ex){
        res.render('error',{ 'error': ex });
    }//catch


}//updateNews

module.exports.UpdataNews=async(req,res)=>{

    let response = new Response();
    let id= +req.body.id;
    let title = req.body.newsTitle;
    let text = req.body.newsText;

    try{

        let news = await News.findById( id );

        if( news ){

            let newNews = await news.update({
                newsTitle:title,
                newsText:text
            });

            if(req.files){

                let newsImage = req.files.image;


                let image = await NewsImage.findOne({
                    where:{
                        newsID:id
                    }
                });

                if( !image ){
                    fs.mkdirSync( `public/images/news/${id}` );
                }//if
                else{
                    fe.removeSync(`public/${image.imagePath}`);
                }//else

                await newsImage.mv( `public/images/news/${id}/${newsImage.name}`);


                let path = `/admin/images/news/${newNews.newsID}/${newsImage.name}`;

                let newImage = await image.update({
                    newsID:newNews.newsID,
                    imagePath:path
                });

                response.data = path;

            }//if

            response.code = 200;

        }//if
        else{

            response.code = 404;
            response.message = "новость не найдена!";

        }//else

    }//try
    catch (ex){

        response.code=500;
        response.message="ощибка сервера";
        console.log( ex );

    }//catch

    res.status(response.code);
    res.send(response);

}//UpdataNews