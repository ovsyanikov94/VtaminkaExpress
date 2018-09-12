"use strict";

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const Connection = require('./routes/connection');

const indexRouter = require('./routes/index');

const productsRoutes = require('./routes/panel/products');
const categoriesRoutes = require('./routes/panel/categories');
const ordersRoutes = require('./routes/panel/orders');
const localeRoutes = require('./routes/panel/locale');
const newsRoutes = require('./routes/panel/news');
const promoRoutes = require('./routes/panel/promo-codes');
const coordRoutes = require('./routes/panel/coord');

const productsApiRoutes = require('./routes/api/products');
const categoriesApiRoutes = require('./routes/api/categories');
const ordersApiRoutes = require('./routes/api/orders');
const mapApiRoutes = require('./routes/api/coord');

const fileUpload = require('express-fileupload');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//ADMIN PANEL ROUTES
app.use('/', indexRouter);
app.use('/panel' , productsRoutes);
app.use('/panel' , categoriesRoutes);
app.use('/panel' , localeRoutes);
app.use('/panel' , newsRoutes);
app.use('/panel' , promoRoutes);
app.use('/panel' , ordersRoutes);
app.use('/panel' , coordRoutes);

//API ROUTES
app.use('/api' , productsApiRoutes);
app.use('/api' , categoriesApiRoutes);
app.use('/api' , ordersApiRoutes);
app.use('/api' , mapApiRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {

  let error = createError(404);
  next(error);

});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  // render the error page
  res.status(err.status || 500);
  res.render('error');

});

module.exports = app;
