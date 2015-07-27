// require => IMPORTs
// IMPORT De paquetes con MW
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials'); 
var methodOverride = require('method-override');
var session = require('express-session');

// IMPORT De enrutadores
var routes = require('./routes/index');

// ***** CREACIÓN DE LA APLICACIÓN *****
var app = express();

// INSTALACIONES
// app.set => INSTALACIÓN DE GENERADORES DE VISTAS EJS
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use => INSTALACIÓN (de MWs)
app.use(partials());  // El módulo express-partials importa una factory (debe invocarse con ()) para generar el MW a instalar
// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('Quiz 2015'));
app.use(session());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Helpers dinamicos:
app.use(function(req, res, next) {

  // guardar path en session.redir para despues de login
  if (!req.path.match(/\/login|\/logout/)) {
    req.session.redir = req.path;
  }

  // Hacer visible req.session en las vistas
  res.locals.session = req.session;
  next();
});

// ASOCIAR rutas A gestores
app.use('/', routes);		// ruta "/" 		=> routes/index.js
//app.use('/users', users);	// ruta "/users"	=> routes/users.js

// RESTO DE RUTAS
// Creación(function)/Instalación(app.use) de TRES MW's
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);			// lo siguiente que se se ejecute será el sgte MW ("err")
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {			// Renderiza (render)	=> views/error.js
            message: err.message,		// DOS PARAMS: 1. message y 2. error
            error: err,					// en views/error.js se usan <%= message %> y <%=error%>
			errors: []
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},						// No se imprime err (objeto empty)
		errors: []
    });
});

//EXPORTar "app" para comando de arranque
module.exports = app;