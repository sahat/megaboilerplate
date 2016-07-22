var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
//= METHOD_OVERRIDE_REQUIRE
//= COOKIE_PARSER_REQUIRE
//= SESSION_REQUIRE
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var dotenv = require('dotenv');
//= REACT_REQUIRE
//= TEMPLATE_ENGINE_REQUIRE
//= DATABASE_REQUIRE
//= PASSPORT_REQUIRE
//= JWT_REQUIRE
//= CSS_PREPROCESSOR_MIDDLEWARE_REQUIRE
//= WEBPACK_REQUIRE

// Load environment variables from .env file
dotenv.load();
//= ES6_TRANSPILER
//= USER_MODEL_REQUIRE

// Controllers
//= HOME_CONTROLLER
//= USER_CONTROLLER
//= CONTACT_CONTROLLER
//= PASSPORT_CONFIG_REQUIRE
//= REACT_ROUTES_REQUIRE

var app = express();

//= WEBPACK_COMPILER
//= SOCKETIO_REQUIRE
//= DATABASE_CONNECTION
//= TEMPLATE_ENGINE
app.set('port', process.env.PORT || 3000);
app.use(compression());
//= CSS_PREPROCESSOR_MIDDLEWARE
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
//= METHOD_OVERRIDE_MIDDLEWARE
//= COOKIE_PARSER_MIDDLEWARE
//= SESSION_MIDDLEWARE
//= PASSPORT_MIDDLEWARE
//= USER_HELPER_MIDDLEWARE
app.use(express.static(path.join(__dirname, 'public')));
//= IS_AUTHENTICATED_MIDDLEWARE
//= WEBPACK_MIDDLEWARE

//= HOME_ROUTE
//= CONTACT_ROUTE
//= ACCOUNT_ROUTES
//= LOCAL_ROUTES
//= LOGOUT_ROUTE
//= UNLINK_ROUTE
//= FACEBOOK_ROUTES
//= GOOGLE_ROUTES
//= TWITTER_ROUTES
//= VK_ROUTES
//= GITHUB_ROUTES
//= REACT_SERVER_RENDERING
//= ANGULARJS_ROUTES

// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

//= SOCKETIO
//= APP_LISTEN

module.exports = app;
