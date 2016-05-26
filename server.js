

const Promise = require('bluebird');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const React = require('react');
const ReactDOM = require('react-dom/server');
const Router = require('react-router');
const nunjucks = require('nunjucks');

const dotenv = require('dotenv');

// Load Azure environment variables
dotenv.load();

// App globals
global.__base = __dirname + '/';
global.__modules = {};

// Disable Bluebird warnings
Promise.config({ warnings: false });

// ES6 & ES7 Transpiler
require('babel-core/register');
require('babel-polyfill');

// Express routes
let downloadHandler = require('./routes/download');

// React routes
let reactRoutes = require('./website/routes');

const app = express();

app.set('port', process.env.PORT || 4000);
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const config = require('./webpack.config');
  const compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}

app.use(express.static(path.join(__dirname, 'website', 'assets')));


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

app.listen(app.get('port'), 'localhost', function(err) {
  console.log(`Express server listening on port ${app.get('port')}`);
});

process.on('unhandledRejection', function(reason, p) {
  throw Error(reason);
});
