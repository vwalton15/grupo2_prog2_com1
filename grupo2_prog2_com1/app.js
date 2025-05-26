var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');


var indexRouter = require('./routes/index'); 
var usersRouter = require('./routes/users'); 
var productRouter = require('./routes/product');  


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'mi_secreto', 
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
}));
app.use((req, res, next) => {
  console.log(`Petición recibida: ${req.method} ${req.url}`);
  next();  // Importante llamar a next() para que siga al siguiente middleware o ruta
});
app.use(function(req, res, next) {
  if (req.session.user !== undefined) {
    res.locals.user = req.session.user;
  }
  next();
});

// Middleware para pasar datos de cookies a las vistas si no hay sesión activa
app.use(function(req, res, next) {
  if (req.cookies.user !== undefined && req.session.user === undefined) {
    res.locals.user = req.cookies.user;
    res.locals.usuario = req.session.usuario || null;
    req.session.user = req.cookies.user;
  }
  next();
});
// Rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);  

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
