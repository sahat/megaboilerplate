

const Promise = require('bluebird');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const React = require('react');
const ReactDOM = require('react-dom/server');
const Router = require('react-router');
const nunjucks = require('nunjucks');
const webpack = require('webpack');
const config = require('./webpack.config');
const compression = require('compression');

// App globals
global.__base = __dirname + '/';
global.__modules = {};

// Disable Bluebird warnings
Promise.config({ warnings: false });

// ES6/ES7 Transpiler
require('babel-core/register');
require('babel-polyfill');

// Express routes
let downloadHandler = require('./routes/download');

// React routes
let reactRoutes = require('./client/routes');

const app = express();
const compiler = webpack(config);

app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client', 'assets')));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

// POST /download
app.post('/download', downloadHandler.default);

// React server rendering
app.use((req, res) => {
  return res.sendFile(path.join(__dirname, 'index.html'));
});
//app.use(function(req, res) {
//  Router.match({ routes: reactRoutes.default, location: req.url }, function(err, redirectLocation, renderProps) {
//    if (err) {
//      res.status(500).send(err.message)
//    } else if (redirectLocation) {
//      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
//    } else if (renderProps) {
//      let html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
//      let page = nunjucks.render(path.join(__dirname, 'index.html'), { html: html });
//      res.status(200).send(page);
//    } else {
//      res.status(404).send('Page Not Found')
//    }
//  });
//});

app.listen(4000, 'localhost', function(err) {
  console.log('Listening at http://localhost:4000');
});

process.on('unhandledRejection', function(reason, p) {
  throw Error(reason);
});
