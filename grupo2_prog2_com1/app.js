var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index'); // importamos el archivo index.js que contiene la lógica de la ruta de inicio
var usersRouter = require('./routes/users'); // importamos el archivo users.js que contiene la lógica de la ruta de usuarios
var products = require('./routes/product');  // importamos el archivo products.js que contiene la lógica de la ruta de productos


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter); 
app.use('/products', products);   //hacemos uso del método use() que recibe dos parámetros. El primero un string que será el nombre del recurso, en este caso productos. Al ser una ruta debe empezar con la  / , y el segundo parametro es la ruta del archivo que contiene la lógica de la ruta, en este caso products.js.

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
