"use strict";

const gulp = require('gulp');
const Categories = require('../model/defenitions').Category;

gulp.task('categories-task' , async function (){


    // try{
    //
    //
    //     await Categories.create({
    //         categoryTitle: 'Категория 1'
    //     });
    //
    //     await Categories.create({
    //         categoryTitle: 'Категория 2'
    //     });
    //
    //     await Categories.create({
    //         categoryTitle: 'Категория 3'
    //     });
    //
    //     await Categories.create({
    //         categoryTitle: 'Категория 4'
    //     });
    //
    // }//try
    // catch(ex){
    //     console.log('Error 500: ' , ex);
    // }//catch

    console.log('categories-task');

});
gulp.task('products-task' , async function (){

    console.log('products-task');

});
gulp.task('attributes-task' , async function (){

    console.log('attributes-task');

});
gulp.task('coord-task' , async function (){


    console.log('coord-task');


});

gulp.task('about-task' , async function (){


    console.log('about-task');

});

gulp.task('default', [
    'categories-task' ,
    'attributes-task' ,
    'products-task' ,
    'about-task' ,
    'coord-task'
]);