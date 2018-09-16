"use strict";

const Categories = require('../model/defenitions').Category;

try{


    Categories.create({
        categoryTitle: 'Категория 1'
    });

    Categories.create({
        categoryTitle: 'Категория 2'
    });

    Categories.create({
        categoryTitle: 'Категория 3'
    });

    Categories.create({
        categoryTitle: 'Категория 4'
    });

}//try
catch(ex){
    console.log('Error 500: ' , ex);
}//catch