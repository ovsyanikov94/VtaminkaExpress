"use strict";

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');

const Connection = require('./routes/connection');

const indexRouter = require('./routes/index');

const productsRoutes = require('./routes/panel/products');
const categoriesRoutes = require('./routes/panel/categories');
const ordersRoutes = require('./routes/panel/orders');
const localeRoutes = require('./routes/panel/locale');
const newsRoutes = require('./routes/panel/news');
const promoRoutes = require('./routes/panel/promo-codes');
const coordRoutes = require('./routes/panel/coord');
const feedBackRoutes = require('./routes/panel/feedback');
const aboutRoutes = require('./routes/panel/about');

const productsApiRoutes = require('./routes/api/products');
const promocodesApiRoutes = require('./routes/api/promo-codes');
const categoriesApiRoutes = require('./routes/api/categories');
const feedBackApiRoutes = require('./routes/api/feedback');
const ordersApiRoutes = require('./routes/api/orders');
const localeApiRoutes = require('./routes/api/locale');
const newsApiRoutes = require('./routes/api/news');


const mapApiRoutes = require('./routes/api/coord');
const aboutApiRoutes = require('./routes/api/about');

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
app.use(require('express-session')(
    {
        secret:'elkflwekflwekfl888ef',
        saveUninitialized: true,
        cookie: {
            maxAge: (1000 * 60 ) * 60, // ms
            secure: false
        },
    }
  ));
app.use(passport.initialize());
app.use(passport.session());

app.use( require('connect-flash')() );

const localStrategy = require('./passport/local-strategy');
localStrategy(passport);

//ADMIN PANEL ROUTES
app.use('/',  indexRouter);
app.use('/panel' , productsRoutes);
app.use('/panel' , categoriesRoutes);
app.use('/panel' , localeRoutes);
app.use('/panel' , newsRoutes);
app.use('/panel' , promoRoutes);
app.use('/panel' , feedBackRoutes);
app.use('/panel' , ordersRoutes);
app.use('/panel' , coordRoutes);
app.use('/panel' , aboutRoutes);

app.use('/secret' , require('./routes/secret-routes'));

//API ROUTES
app.use('/api' , productsApiRoutes);
app.use('/api' , promocodesApiRoutes);
app.use('/api' , categoriesApiRoutes);
app.use('/api' , feedBackApiRoutes);
app.use('/api' , ordersApiRoutes);
app.use('/api' , mapApiRoutes);
app.use('/api' , aboutApiRoutes);
app.use('/api' , localeApiRoutes);
app.use('/api' , newsApiRoutes);//добавлены новости
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
  res.render('error');

});

module.exports = app;
