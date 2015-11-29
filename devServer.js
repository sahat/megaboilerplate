'use strict';

var _ = require('lodash');
var fs = require('fs-extra');
var shortid = require('shortid');
var archiver = require('archiver');
var jsonfile = require('jsonfile');
var Promise = require('bluebird');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var readline = require('readline');

var readFile = Promise.promisify(fs.readFile);
var writeFile = Promise.promisify(fs.writeFile);
var remove = Promise.promisify(fs.remove);
var mkdirs = Promise.promisify(fs.mkdirs);
var copy = Promise.promisify(fs.copy);
var readJson = Promise.promisify(fs.readJson);
var writeJson = Promise.promisify(fs.writeJson);

var app = express();
var compiler = webpack(config);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'modules')));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));


app.post('/download', (req, res) => {
  let framework = req.body.framework;
  let appName = req.body.appName;
  let templateEngine = req.body.templateEngine;

  prepare().then((uid) => {
    return generateFramework(framework, appName, uid).then(() => {
      return generateTemplateEngine(templateEngine, framework, uid).then(() => {
        return generateCssFramework().then(() => {

        })
      })
    });
  });

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

function generateFramework(framework, appName, uid) {
  return new Promise((resolve, reject) => {
    let dest = path.join(__dirname, 'build', uid);
    switch (framework) {
      case 'express':
        let src = path.join(__dirname, 'modules', 'express');
        return copy(src, dest).then(() => {
          let updatePackageJson = new Promise((resolve, reject) => {
            let packageJson = path.join(dest, 'package.json');
            return readJson(packageJson).then((packageObj) => {
              packageObj.name = appName;
              return writeJson(packageJson, packageObj, { spaces: 2 }).then(() => {
                resolve();
              });
            });
          });
          var createPublicDirs = new Promise((resolve, reject) => {
            return mkdirs(path.join(dest, 'public', 'images')).then(() => {
              return mkdirs(path.join(dest, 'public', 'javascripts')).then(() => {
                return mkdirs(path.join(dest, 'public', 'stylesheets')).then(() => {
                  resolve();
                });
              });
            })
          });
          return Promise.all([updatePackageJson, createPublicDirs]).then(() => {
            resolve();
          });
        });
        break;
      case 'hapi':
        break;
      case 'sails':
        break;
      default:
        reject('Unsupported Framework');
    }
  });
}

function generateTemplateEngine(templateEngine, framework, uid) {
  return new Promise(function(resolve, reject) {
    switch (templateEngine) {
      case 'jade':
        return generateJadeTemplateEngine(framework, uid);
        break;
      case 'handlebars':
        break;
      case 'swig':
        break;
      case 'none':
        return cleanupTemplateEngineString(framework, uid);
        break;
      default:
        reject('Unsupported Template Engine');
    }
  });
}


function cleanupTemplateEngineString(framework, uid) {
  return new Promise((resolve, reject) => {
    if (framework === 'express') {
      let dest = path.join(__dirname, 'build', uid);
      let appFile = path.join(dest, 'app.js');

      return readFile(appFile).then((appFileData) => {
        appFileData = removeCode(appFileData, 'EXPRESS_TEMPLATE_ENGINE_CONFIG');
        return writeFile(appFile, appFileData).then(() => {
          resolve();
        });
      });
    } else if (framework === 'hapi') {
      // TODO
    } else if (framework === 'sails') {
      // TODO
    }
  });
}

function generateJadeTemplateEngine(framework, uid) {
  return new Promise((resolve, reject) => {
    if (framework === 'express') {
      let jadeExpressFile = path.join(__dirname, 'modules', 'template-engine', 'jade', 'jade-express.js');
      let jadeViewsDir = path.join(__dirname, 'modules', 'template-engine', 'jade', 'views');
      let dest = path.join(__dirname, 'build', uid);
      let appFile = path.join(dest, 'app.js');

      return readFile(jadeExpressFile).then((jadeExpressData) => {
        return readFile(appFile).then((appFileData) => {
          appFileData = replaceCode(appFileData, 'EXPRESS_TEMPLATE_ENGINE_CONFIG', jadeExpressData, true);
          return writeFile(appFile, appFileData).then(() => {
            resolve();
          });
        })
      }).then(() => {
        return copy(jadeViewsDir, path.join(dest, 'views'))
      });
    } else if (framework === 'hapi') {
      // TODO
    } else if (framework === 'sails') {
      // TODO
    }
  });
}

/**
 *
 * @param src {buffer} - where to replace
 * @param subStr {string} - what to replace
 * @param newSubStr {string} - replace it with this
 * @param leadingBlankLine {boolean} - add blank line above
 * @returns {string}
 */
function replaceCode(src, subStr, newSubStr, leadingBlankLine) {
  let array = src.toString().split('\n');
  array.forEach((line, index) => {
    if (line.includes(subStr)) {
      let str = newSubStr.toString().split('\n').filter(Boolean).join('\n');
      array[index] = leadingBlankLine ? '\n' + str : str;
    }
  });
  return array.join('\n');
}

/**
 *
 * @param src {buffer} - where to remove
 * @param subStr {string} - what to remove
 * @returns {string}
 */
function removeCode(src, subStr) {
  let array = src.toString().split('\n');
  array.forEach((line, index) => {
    if (line.includes(subStr)) {
      array.splice(index, 1);
    }
  });
  return array.join('\n');
}

function generateCssFramework() {
  return new Promise((resolve, reject) => {

  });
}




function generateZip(req, res) {
  return new Promise(function(resolve, reject) {
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
  });
}

function cleanup(uid) {
  return new Promise((resolve, reject) => {
    let location = path.join(__dirname, 'build', uid);
    remove(location).then(() => {
      resolve();
    }).catch(() => {
      reject();
    });
  });
}

function prepare() {
  return new Promise((resolve, reject) => {
    let uid = shortid.generate();
    let location = path.join(__dirname, 'build', uid);
    return mkdirs(location).then(() => {
      resolve(uid);
    }).catch((err) => {
      reject(err);
    });
  });
}
