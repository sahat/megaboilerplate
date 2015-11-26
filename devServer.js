var archiver = require('archiver');
var jsonfile = require('jsonfile');

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser')
var webpack = require('webpack');
var config = require('./webpack.config.dev');

var app = express();
var compiler = webpack(config);

console.dir(jsonfile.readFileSync(__dirname + '/modules/express/package.json'))
//jsonfile.writeFile(file, obj, function (err) {
//  console.error(err)
//})
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'modules')));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));



app.post('/download', function(req, res) {
  if (req.body.platform === 'node') {

    switch (req.body.framework) {
      case 'express':
        generateExpressFramework(req, res);
        break;
      case 'hapi':
        break;
      case 'sails':
        break;
      default:
        res.status(400).send('Unsupported Framework');
    }

  } else {
    res.status(400).send('Unsupported Platform');
  }
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});

function generateExpressFramework(req, res) {
  var archive = archiver('zip');

  archive.on('error', function(err) {
    res.status(500).send(err.message);
  });

  res.on('close', function() {
    console.log('closing...')
    console.log('Archive wrote %d bytes', archive.pointer());
    return res.status(200).send('OK').end();
  });

  res.attachment('megaboilerplate-express.zip');

  archive.pipe(res);

  var files = [
    __dirname + '/modules/express/app.js',
    __dirname + '/modules/express/package.json'
  ];

  for (var i in files) {
    archive.append(fs.createReadStream(files[i]), { name: path.basename(files[i]) });
  }

  archive.finalize();
}