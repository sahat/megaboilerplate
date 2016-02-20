var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
//= REACT_REQUIRE
//= TEMPLATE_ENGINE_REQUIRE
//= DATABASE_REQUIRE
//= PASSPORT_REQUIRE
//= CSS_PREPROCESSOR_MIDDLEWARE_REQUIRE

// Load environment variables from .env file
dotenv.load();

// Controllers
//= USER_CONTROLLER

var app = express();
//= SOCKETIO_REQUIRE
//= DATABASE_CONNECTION
//= TEMPLATE_ENGINE

app.set('port', process.env.PORT || 3000);
//= CSS_PREPROCESSOR_MIDDLEWARE
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
//= PASSPORT_MIDDLEWARE
//= USER_HELPER_MIDDLEWARE
app.use(express.static(path.join(__dirname, 'public')));
//= BASE_ROUTE
//= REACT_SERVER_RENDERING
//= PASSPORT_LOCAL_ROUTES

// production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    res.sendStatus(err.status || 500);
  });
}

//= SOCKETIO
//= APP_LISTEN
