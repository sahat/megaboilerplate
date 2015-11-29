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
  let cssFramework = req.body.cssFramework;

  prepare().then((uid) => {
    return generateFramework(framework, appName, uid).then(() => {
      return generateTemplateEngine(templateEngine, framework, uid).then(() => {
        return generateCssFramework(cssFramework, templateEngine, uid).then(() => {

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
  let dest = path.join(__dirname, 'build', uid);

  switch (framework) {
    case 'express':
      let expressModule = path.join(__dirname, 'modules', 'express');

      return copy(expressModule, dest).then(() => {
        let images = path.join(dest, 'public', 'images');
        let javascripts = path.join(dest, 'public', 'javascripts');
        let stylesheets = path.join(dest, 'public', 'stylesheets');

        let updatePackageJson = new Promise((resolve, reject) => {
          let packageJson = path.join(dest, 'package.json');
          return readJson(packageJson).then((packageObj) => {
            packageObj.name = appName;
            return writeJson(packageJson, packageObj, { spaces: 2 }).then(() => {
              resolve();
            });
          });
        });

        return Promise.all([
          mkdirs(images),
          mkdirs(javascripts),
          mkdirs(stylesheets),
          updatePackageJson
        ]);
      });
      break;
    case 'hapi':
      break;
    case 'sails':
      break;
    default:
      break;
  }
}

function generateTemplateEngine(templateEngine, framework, uid) {
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
      break;
  }
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
  if (framework === 'express') {
    let jadeExpressFile = path.join(__dirname, 'modules', 'template-engine', 'jade', 'jade-express.js');
    let jadeViewsDir = path.join(__dirname, 'modules', 'template-engine', 'jade', 'views');
    let dest = path.join(__dirname, 'build', uid);
    let appFile = path.join(dest, 'app.js');

    return readFile(jadeExpressFile).then((jadeExpressData) => {
      return readFile(appFile).then((appFileData) => {
        appFileData = replaceCode(appFileData, 'EXPRESS_TEMPLATE_ENGINE_CONFIG', jadeExpressData, { leadingBlankLine: true });
        return writeFile(appFile, appFileData);
      });
    }).then(() => {
      return copy(jadeViewsDir, path.join(dest, 'views'))
    });
  } else if (framework === 'hapi') {
    // TODO
  } else if (framework === 'sails') {
    // TODO
  }
}

function generateBootstrapCss(templateEngine, uid) {
  let bootstrapDir = path.join(__dirname, 'modules', 'css-framework', 'bootstrap');
  let jqueryDir = path.join(__dirname, 'modules', 'js-framework', 'jquery');
  let publicDir = path.join(__dirname, 'build', uid, 'public');

  let addCssImports = function(templateEngine) {
    return new Promise(function(resolve, reject) {
      if (templateEngine === 'jade') {
        let layoutFile = path.join(__dirname, 'build', uid, 'views', 'layout.jade');
        let bootstrapCssJadeImportFile = path.join(__dirname, 'modules', 'css-framework', 'bootstrap', 'bootstrap-css-jade.jade')

        return readFile(bootstrapCssJadeImportFile).then((bootstrapCssJadeImportData) => {
          return readFile(layoutFile).then((layoutFileData) => {
            layoutFileData = replaceCode(layoutFileData, 'JADE_CSS_FRAMEWORK_IMPORT', bootstrapCssJadeImportData, { indentLevel: 2 });
            return writeFile(layoutFile, layoutFileData);
          });
        });
      } else {
        resolve();
      }
    })
  };

  return Promise.all([
    addCssImports(templateEngine),
    copy(path.join(bootstrapDir, 'main.css'), path.join(publicDir, 'stylesheets', 'main.css')),
    copy(path.join(bootstrapDir, 'fonts'), path.join(publicDir, 'fonts')),
    copy(path.join(bootstrapDir, 'css', 'bootstrap.css'), path.join(publicDir, 'stylesheets', 'vendor', 'bootstrap.css')),
    copy(path.join(bootstrapDir, 'css', 'bootstrap.min.css'), path.join(publicDir, 'stylesheets', 'vendor', 'bootstrap.min.css')),
    copy(path.join(bootstrapDir, 'js', 'bootstrap.js'), path.join(publicDir, 'javascripts', 'vendor', 'bootstrap.js')),
    copy(path.join(bootstrapDir, 'js', 'bootstrap.min.js'), path.join(publicDir, 'javascripts', 'vendor', 'bootstrap.min.js')),
    copy(path.join(jqueryDir, 'jquery.js'), path.join(publicDir, 'javascripts', 'vendor', 'jquery.js')),
    copy(path.join(jqueryDir, 'jquery.min.js'), path.join(publicDir, 'javascripts', 'vendor', 'jquery.min.js')),
    copy(path.join(jqueryDir, 'main.js'), path.join(publicDir, 'javascripts', 'main.js'))
  ]);
}
function generateCssFramework(cssFramework, templateEngine, uid) {
  // TODO: Sail.js assets dir instead of public
  switch (cssFramework) {
    case 'bootstrapCss':
      return generateBootstrapCss(templateEngine, uid);
      break;
    case 'bootstrapLess':
      break;
    case 'bootstrapSass':
      break;
    case 'foundationCss':
      break;
    case 'foundationSass':
      break;
    case 'bourbonNeat':
      break;
    case 'none':
      break;
    default:
      console.log('Unsupported CSS Framework');
  }
}

/**
 *
 * @param src {buffer} - where to replace
 * @param subStr {string} - what to replace
 * @param newSubStr {string} - replace it with this
 * @param opts {object} - options
 * @returns {string}
 */
function replaceCode(src, subStr, newSubStr, opts) {
  opts = opts || {};
  let array = src.toString().split('\n');
  array.forEach((line, index) => {
    if (line.includes(subStr)) {
      if (opts.indentLevel) {
        newSubStr = indentCode(newSubStr, opts.indentLevel);
      }

      newSubStr = newSubStr.toString().split('\n').filter(Boolean).join('\n');

      if (opts.leadingBlankLine) {
        newSubStr = '\n' + newSubStr;
      }

      array[index] = newSubStr;
    }
  });
  return array.join('\n');
}

/**
 *
 * @param subStr {string} - what to indent
 * @param indentLevel {number} - how many levels to indent
 * @returns {string}
 */
function indentCode(subStr, indentLevel) {
  let defaultIndentation = 2;
  let indent = ' '.repeat(indentLevel * defaultIndentation);
  let array = subStr.toString().split('\n').filter(Boolean);
  array.forEach((line, index) => {
    array[index] = indent + line;
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
