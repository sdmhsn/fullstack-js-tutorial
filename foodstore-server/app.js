var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// import product router
const productRouter = require('./app/products/router');
// import category router
const categoryRouter = require('./app/categories/router');
// import tag router
const tagRouter = require('./app/tags/router');
// import user router
const authRouter = require('./app/auth/router');
// import region router
const regionRouter = require('./app/regions/router');
// import delivery address router
const deliveryRouter = require('./app/delivery-addresses/router');
// import cart router
const cartRouter = require('./app/cart/router');
// decode token
const { decodeToken } = require('./app/auth/middleware');
// import order router
const orderRouter = require('./app/order/router');
// import invoice router
const invoiceRouter = require('./app/invoice/router');
// import cors
const cors = require('cors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// using cors
app.use(cors()); // posisi harus berada di atas decode token

// using decode token
app.use(decodeToken()); // posisi harus berada di atas perintah app.use('/auth', authRouter), jika tidak akan mengalami error "Your're not login or token expired", yang terdapat pada controller endpoint me

// using auth router
app.use('/auth', authRouter);
// using product router
app.use('/api', productRouter);
// using category router
app.use('/api', categoryRouter);
// using tag router
app.use('/api', tagRouter);
// using region router
app.use('/api', regionRouter);
// using delivery address router
app.use('/api', deliveryRouter);
// using cart router
app.use('/api', cartRouter);
// using order router
app.use('/api', orderRouter);
// using invoice router
app.use('/api', invoiceRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
