var express = require('express');
//= TEMPLATE_ENGINE_REQUIRE
var path = require('path');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
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
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
//= PASSPORT_MIDDLEWARE
app.use(express.static(path.join(__dirname, 'public')));
//= BASE_ROUTE

// development error handler
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    // TODO: replace if no template engine provided
    // TODO: need to replace for other engines?
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
