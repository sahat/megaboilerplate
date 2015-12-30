'use strict';

let Promise = require('bluebird');
let path = require('path');
let express = require('express');
let bodyParser = require('body-parser');
let React = require('react');
let ReactDOM = require('react-dom/server');
let Router = require('react-router');
let nunjucks = require('nunjucks');
let webpack = require('webpack');
let config = require('./webpack.config.dev');

// Root directory reference
global.__base = __dirname + '/';

// Disable Bluebird warnings
Promise.config({
  warnings: false
});

// ES6/ES7 Transpiler
require('babel-core/register');
require('babel-polyfill');

let routes = require('./routes');
let reactRoutes = require('./src/routes');

let app = express();
let compiler = webpack(config);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'modules')));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

app.post('/download', routes.download);
//
//app.get('*', function(req, res) {
//  res.sendFile(path.join(__dirname, 'index.html'));
//});

app.use(function(req, res) {
  Router.match({ routes: reactRoutes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      let html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
      let page = nunjucks.render(path.join(__dirname, 'index.html'), { html: html });
      res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

app.listen(4000, 'localhost', function(err) {
  if (err) { return console.log(err); }
  console.log('Listening at http://localhost:4000');
});
