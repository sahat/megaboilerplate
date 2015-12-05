'use strict';

let Promise = require('bluebird');
let path = require('path');
let express = require('express');
let bodyParser = require('body-parser');
let webpack = require('webpack');
let config = require('./webpack.config.dev');

// Shortcut for root directory
global.__base = __dirname + '/';

// Disable Bluebird warnings
Promise.config({
  warnings: false
});

// ES6/ES7 Transpiler
require('babel-core/register');
require('babel-polyfill');

let routes = require('./routes');

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

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(4000, 'localhost', function(err) {
  if (err) { return console.log(err); }
  console.log('Listening at http://localhost:3000');
});
