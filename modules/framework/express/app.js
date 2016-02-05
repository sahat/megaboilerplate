var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
//= REACT_REQUIRE
//= TEMPLATE_ENGINE_REQUIRE
//= DATABASE_REQUIRE
//= PASSPORT_REQUIRE
//= CSS_PREPROCESSOR_MIDDLEWARE_REQUIRE

var app = express();
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
app.use(express.static(path.join(__dirname, 'public')));
//= BASE_ROUTE
//= REACT_SERVER_RENDERING

// production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    res.sendStatus(err.status || 500);
  });
}

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
