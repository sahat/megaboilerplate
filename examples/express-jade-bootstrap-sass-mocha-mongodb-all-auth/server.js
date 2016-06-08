var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var methodOverride = require('method-override');
var session = require('express-session');
var flash = require('express-flash');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var dotenv = require('dotenv');
var mongoose = require('mongoose');
var passport = require('passport');
var sass = require('node-sass-middleware');

// Load environment variables from .env file
dotenv.load({ path: '.env.example' });

// Controllers
var HomeController = require('./controllers/home');
var UserController = require('./controllers/user');
var ContactController = require('./controllers/contact');

// Passport OAuth strategies
require('./config/passport');

var app = express();


mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(sass({ src: path.join(__dirname, 'public'), dest: path.join(__dirname, 'public') }));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(methodOverride('_method'));
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', HomeController.index);
app.get('/contact', ContactController.contactGet);
app.post('/contact', ContactController.contactPost);
app.get('/account', UserController.ensureAuthenticated, UserController.accountGet);
app.put('/account', UserController.ensureAuthenticated, UserController.accountPut);
app.delete('/account', UserController.ensureAuthenticated, UserController.accountDelete);
app.get('/signup', UserController.signupGet);
app.post('/signup', UserController.signupPost);
app.get('/login', UserController.loginGet);
app.post('/login', UserController.loginPost);
app.get('/forgot', UserController.forgotGet);
app.post('/forgot', UserController.forgotPost);
app.get('/reset/:token', UserController.resetGet);
app.post('/reset/:token', UserController.resetPost);
app.get('/logout', UserController.logout);
app.get('/unlink/:provider', UserController.ensureAuthenticated, UserController.unlink);
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));
app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
app.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }));
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/login' }));
app.get('/auth/vkontakte', passport.authenticate('vkontakte', { scope: ['email'] }));
app.get('/auth/vkontakte/callback', passport.authenticate('vkontakte', { successRedirect: '/', failureRedirect: '/login' }));

// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    res.sendStatus(err.status || 500);
  });
}

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
