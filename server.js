const Promise = require('bluebird');
const path = require('path');
const logger = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const React = require('react');
const ReactDOM = require('react-dom/server');
const Router = require('react-router');
const nunjucks = require('nunjucks');
const postcss = require('postcss-middleware');
const cssnext = require('postcss-cssnext');
const atImport = require('postcss-import');

const dotenv = require('dotenv');

// Load Azure Storage environment variables
dotenv.load({ silent: true });

// App globals
global.__base = __dirname + '/';
global.__modules = {};

// Disable Bluebird warnings
Promise.config({ warnings: false });

// ES6 & ES7 Transpiler
require('babel-core/register');
require('babel-polyfill');

// Routes
const expressRoutes = require('./routes');
const reactRoutes = require('./website/routes');

const app = express();

app.set('port', process.env.PORT || 4000);
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/css', postcss({
  src: function(req) {
    return path.join(__dirname, 'website', 'assets', 'css', req.path);
  },
  plugins: [atImport(), cssnext()]
}));

if (app.get('env') === 'development') {
  const webpack = require('webpack');
  const config = require('./webpack.config');
  const compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
  app.use(logger('dev'));
}

app.use(express.static(path.join(__dirname, 'website', 'assets'), { maxAge: 31557600000 }));

// Routes
app.post('/download', expressRoutes.download);

// Append numeric string to main.css and bundle.js
const cacheBust = Date.now();

// React server rendering
app.use(function(req, res) {
 Router.match({ routes: reactRoutes.default, location: req.url }, function(err, redirectLocation, renderProps) {
   if (err) {
     res.status(500).send(err.message)
   } else if (redirectLocation) {
     res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
   } else if (renderProps) {
     let html = ReactDOM.renderToString(React.createElement(Router.RouterContext, renderProps));
     let page = nunjucks.render('index.html', { 
       html: html,
       cacheBust: cacheBust
     });
     res.status(200).send(page);
   } else {
     res.status(404).send('Page Not Found')
   }
 });
});

app.listen(app.get('port'), function(err) {
  console.log(`Express server listening on port ${app.get('port')} in ${app.get('env')} mode`);
});

process.on('unhandledRejection', function(reason, p) {
  throw Error(reason);
});
