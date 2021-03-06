var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var nunjucks = require('nunjucks');
var expressSession = require('express-session');
var flash = require('connect-flash');

var routes = require('./app/server/routes/index');
var clients = require('./app/server/routes/clients');

var app = express();

var dbconfig = require('./app/server/config/database.js');
mongoose.connect(dbconfig.url);

nunjucks.configure('./app/server/views', {
    autoescape: true,
    express: app
});

// view engine setup
app.set('views', path.join(__dirname, '/app/server/views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './app/public/build')));

// Configuring Passport
app.use(expressSession({
    secret: 'blahblahblah',
    maxAge: 1800000,
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

app.use('/', routes);
app.use('/clients', clients);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;