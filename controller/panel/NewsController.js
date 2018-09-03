"use strict"

const Response = require('../../model/Response');

const News = require('../../model/defenitions').News;
const NewsImage = require('../../model/defenitions').newsImage;
const fs = require('fs');

module.exports.GetNewsList=async(req,res)=>{

    console.log('START');

    let news = await News.findAll();
    let image = await NewsImage.findOne({
        where:{
            newsID:news.newsID
        }
    });

console.log(image);


    res.render('blog/news-list',{'news':news,'image':image});

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
            console.log('66666666666666666666',newsImage)
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
                console.log('1111111111111111111111',path)

                let newsImage = await NewsImage.create({

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

}//removeNews

module.exports.updateNews=async(req,res)=>{

}//updateNews

module.exports.GetSingleNews=async(req,res)=>{


}//GetSingleNews