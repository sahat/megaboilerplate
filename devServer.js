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

var packages = require ('./modules/packages');

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
  let params = req.body;

  prepare(params)
    .then(generateFramework)
    .then(generateTemplateEngine)
    .then(generateCssFramework)
    .then(generateCssPreprocessor)
    .then(generateDatabase)
    .then(generateAuthentication);

});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(4000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});

function generateFramework(params) {
  return new Promise((resolve, reject) => {
    let dest = path.join(__dirname, 'build', params.uid);

    switch (params.framework) {
      case 'express':
        let expressModule = path.join(__dirname, 'modules', 'express');

        return copy(expressModule, dest).then(() => {
          let images = path.join(dest, 'public', 'images');
          let javascripts = path.join(dest, 'public', 'javascripts');
          let stylesheets = path.join(dest, 'public', 'stylesheets');

          let updatePackageJson = function() {
            let packageJson = path.join(dest, 'package.json');
            return readJson(packageJson).then((packageObj) => {
              packageObj.name = params.appName;
              return writeJson(packageJson, packageObj, { spaces: 2 });
            });
          };

          return Promise.all([
            updatePackageJson,
            mkdirs(images),
            mkdirs(javascripts),
            mkdirs(stylesheets)
          ]).then(() => {
            resolve(params);
          });
        });
        break;
      case 'hapi':
        // TODO
        return Promise.reject();
        break;
      case 'sails':
        // TODO
        return Promise.reject();
        break;
      default:
        return Promise.reject('Unsupported Framework');
        break;
    }
  });
}

function generateTemplateEngine(params) {
  return new Promise((resolve, reject) => {
    switch (params.templateEngine) {
      case 'jade':
        return generateJadeTemplateEngine(params).then(() => {
          resolve(params);
        });
        break;
      case 'handlebars':
        // TODO: Not implemented
        return Promise.reject();
        break;
      case 'swig':
        // TODO: Not implemented
        return Promise.reject();
        break;
      case 'none':
        return cleanupTemplateEngineString(params);
        break;
      default:
        return Promise.reject('Unsupported Template Engine');
    }
  });
}


function cleanupTemplateEngineString(params) {
  if (params.framework === 'express') {
    let appFile = path.join(__dirname, 'build', params.uid, 'app.js');

    return removeCode(appFile, 'EXPRESS_TEMPLATE_ENGINE_CONFIG');
  } else if (params.framework === 'hapi') {
    // TODO: not implemented
  } else if (params.framework === 'sails') {
    // TODO: not implemented
  }
}

function cleanupCssFrameworkString(params) {
  // TODO: switch per framework
  if (params.templateEngine === 'jade') {
    let layoutFile = path.join(__dirname, 'build', params.uid, 'views', 'layout.jade');

    return removeCode(layoutFile, 'CSS_FRAMEWORK_IMPORT');
  } else if (params.templateEngine === 'handlebars') {
    // TODO: not implemented
  } else if (params.templateEngine === 'swig') {
    // TODO: not implemented
  } else {
    return Promise.resolve();
  }
}

function generateJadeTemplateEngine(params) {
  switch (params.framework) {
    case 'express':
      let jadeExpressFile = path.join(__dirname, 'modules', 'template-engine', 'jade', 'jade-express.js');
      let appFile = path.join(__dirname, 'build', params.uid, 'app.js');

      return replaceCode(appFile, 'EXPRESS_TEMPLATE_ENGINE_CONFIG', jadeExpressFile, { leadingBlankLine: true })
        .then(() => {
          let src = path.join(__dirname, 'modules', 'template-engine', 'jade', 'views');
          let dest = path.join(__dirname, 'build', params.uid, 'views');
          return copy(src, dest);
        });
      break;
    case 'hapi':
      // TODO: not implemented
      break;
    case 'sails':
      // TODO: not implemented
      break;
    default:
      return Promise.reject('Unsupported Framework');
  }
}

function generateBootstrapCss(params) {
  let bootstrapDir = path.join(__dirname, 'modules', 'css-framework', 'bootstrap');
  let jqueryDir = path.join(__dirname, 'modules', 'js-framework', 'jquery');
  let publicDir = path.join(__dirname, 'build', params.uid, 'public');

  return Promise.all([
    addCssImports(params),
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

function generateCssFramework(params) {
  return new Promise((resolve, reject) => {
    // TODO: Sail.js assets dir instead of public
    switch (params.cssFramework) {
      case 'bootstrapCss':
        return generateBootstrapCss(params).then(() => {
          resolve(params);
        });
        break;
      case 'bootstrapLess':
        // TODO: not implemented
        reject();
        break;
      case 'bootstrapSass':
        // TODO: not implemented
        reject();
        break;
      case 'foundationCss':
        // TODO: not implemented
        reject();
        break;
      case 'foundationSass':
        // TODO: not implemented
        reject();
        break;
      case 'bourbonNeat':
        // TODO: not implemented
        reject();
        break;
      case 'none':
        return cleanupCssFrameworkString(params).then(() => {
          resolve(params);
        });
        break;
      default:
        reject('Unsupported CSS Framework');
    }
  });
}

function generatePlainCssPreprocessor(params) {
  let src = path.join(__dirname, 'modules', 'css-preprocessor', 'main.css');
  let dest = path.join(__dirname, 'build', params.uid, 'public', 'stylesheets', 'main.css');
  return copy(src, dest);
}

function generateCssPreprocessor(params) {
  return new Promise((resolve, reject) => {
    switch (params.cssPreprocessor) {
      case 'css':
        return generatePlainCssPreprocessor(params).then(() => {
          resolve(params);
        });
        break;
      case 'sass':
        // TODO: not implemented
        resolve(params);
        break;
      case 'less':
        // TODO: not implemented
        resolve(params);
        break;
      case 'postcss':
        // TODO: not implemented
        resolve(params);
        break;
      default:
        resolve(params);
    }
  });
}

function addCssImports(params) {
  if (params.templateEngine === 'jade') {
    let layoutFile = path.join(__dirname, 'build', params.uid, 'views', 'layout.jade');
    let cssImportFile;

    switch (params.cssFramework) {
      case 'bootstrapCss':
        cssImportFile = path.join(__dirname, 'modules', 'css-framework', 'bootstrap', 'jade-import.jade');
        break;
      case 'bootstrapLess':
        // TODO: not implemented
        break;
      case 'bootstrapSass':
        // TODO: not implemented
        break;
      case 'foundationCss':
        // TODO: not implemented
        break;
      case 'foundationSass':
        // TODO: not implemented
        break;
      case 'bourbonNeat':
        // TODO: not implemented
        break;
      case 'none':
        // TODO: not implemented
        break;
      default:
        break;
    }
    return replaceCode(layoutFile, 'CSS_FRAMEWORK_IMPORT', cssImportFile, { indentLevel: 2 });
  } else if (params.templateEngine === 'handlebars') {
    // TODO
  } else if (params.templateEngine === 'swig') {
    // TODO
  } else {
    Promise.resolve();
  }
}

function addPackageDependencies(dependencies, params, isDev) {
  let packageJson = path.join(__dirname, 'build', params.uid, 'package.json');

  return readJson(packageJson).then((packageObj) => {

    for (var key in dependencies) {
      if (dependencies.hasOwnProperty(key)) {
        if (isDev) {
          packageObj.devDependencies = packageObj.devDependencies || {};
          packageObj.devDependencies[key] = dependencies[key];
        } else {
          packageObj.dependencies[key] = dependencies[key];
        }
      }
    }

    return writeJson(packageJson, packageObj, { spaces: 2 });
  });
}

function generateMongodbDatabase(params) {

  switch (params.framework) {
    case 'express':
      let appFile = path.join(__dirname, 'build', params.uid, 'app.js');
      let mongooseRequireFile = path.join(__dirname, 'modules', 'database', 'mongodb', 'mongoose-require.js');
      let mongooseConnectFile = path.join(__dirname, 'modules', 'database', 'mongodb', 'mongoose-connect.js');

      return replaceCode(appFile, 'DATABASE_REQUIRE', mongooseRequireFile)
        .then(() => {
          return replaceCode(appFile, 'DATABASE_CONNECTION', mongooseConnectFile, { leadingBlankLine: true });
        })
        .then(() => {
          let pkg = packages.database.mongodb;
          return addPackageDependencies(pkg, params);
        });
      break;
    case 'hapi':
      // TODO: not implemented
      return Promise.resolve();
      break;
    case 'sails':
      // TODO: not implemented
      return Promise.resolve();
      break;
    default:
      return Promise.reject('Unsupported Framework');
  }
}

function generateDatabase(params) {
  return new Promise((resolve, reject) => {
    switch (params.database) {
      case 'mongodb':
        return generateMongodbDatabase(params).then(() => {
          resolve(params);
        });
        break;
      case 'mysql':
        // TODO: not implemented
        reject();
        break;
      case 'postgresql':
        // TODO: not implemented
        reject();
        break;
      case 'rethinkdb':
        // TODO: not implemented
        reject();
        break;
      case 'none':
        resolve(params);
        break;
      default:
        reject('Unsupported Database');
    }
  });
}

function cleanupEmailAuthenticationString(params) {
  if (params.framework === 'express') {
    let appFile = path.join(__dirname, 'build', params.uid, 'app.js');

    return removeCode(appFile, 'EXPRESS_TEMPLATE_ENGINE_CONFIG');
  } else if (params.framework === 'hapi') {
    // TODO: not implemented
  } else if (params.framework === 'sails') {
    // TODO: not implemented
  }
}

function generateEmailAuthentication(params) {
  return new Promise((resolve, reject) => {
      switch (params.framework) {
        case 'express':
          let config = path.join(__dirname, 'build', params.uid, 'config', 'passport.js');
          let require = path.join(__dirname, 'modules', 'authentication', 'email', 'passport-require.js');
          let strategy = path.join(__dirname, 'modules', 'authentication', 'email', 'passport-strategy.js');
          let routes = path.join(__dirname, 'modules', 'authentication', 'email', 'passport-routes.js');

          if (params.authentication.indexOf('email') > -1) {

            let updatePassportFile = new Promise((resolve, reject) => {
                return replaceCode(config, 'PASSPORT_LOCAL_REQUIRE', require).then(() => {
                  return replaceCode(config, 'PASSPORT_LOCAL_STRATEGY', strategy);
                });
            });

            return Promise.all([
              addPackageDependencies(packages.authentication.email, params),
              updatePassportFile
            ]).then(() => {
              resolve(params);
            });
          } else {
            return removeCode(config, 'PASSPORT_LOCAL_REQUIRE');
          }

          resolve(params);
          break;
        case 'hapi':
          // TODO: not implemented
          return Promise.resolve();
          break;
        case 'sails':
          // TODO: not implemented
          return Promise.resolve();
          break;
        default:
          return Promise.reject('Unsupported Framework');
      }

  });
}

function generateCommonAuthentication(params) {
  return new Promise((resolve, reject) => {
    switch (params.framework) {
      case 'express':
        let appFile = path.join(__dirname, 'build', params.uid, 'app.js');
        let passportConfigModuleFile = path.join(__dirname, 'modules', 'authentication', 'common', 'passport-config.js');
        let passportRequireFile = path.join(__dirname, 'modules', 'authentication', 'common', 'passport-require.js');
        let passportMiddlewareFile = path.join(__dirname, 'modules', 'authentication', 'common', 'passport-middleware.js');
        let passportSerializerFile = path.join(__dirname, 'modules', 'authentication', 'common', 'passport-serializer.js');
        let passportDeserializerFile = path.join(__dirname, 'modules', 'authentication', 'common', 'passport-deserializer.js');
        let passportUserModelFile = path.join(__dirname, 'modules', 'authentication', 'common', 'passport-user-model.js');

        let updateAppFile = new Promise((resolve, reject) => {
          return replaceCode(appFile, 'PASSPORT_REQUIRE', passportRequireFile).then(() => {
            return replaceCode(appFile, 'PASSPORT_MIDDLEWARE', passportMiddlewareFile).then(() => {
              resolve();
            });
          });
        });

        let createAndUpdatePassportFile = new Promise((resolve, reject) => {
          let passportConfigFile = path.join(__dirname, 'build', params.uid, 'config', 'passport.js');
          return copy(passportConfigModuleFile, passportConfigFile).then(() => {
            return replaceCode(passportConfigFile, 'PASSPORT_USER_MODEL', passportUserModelFile).then(() => {
              return replaceCode(passportConfigFile, 'PASSPORT_SERIALIZER', passportSerializerFile, { leadingBlankLine: true }).then(() => {
                return replaceCode(passportConfigFile, 'PASSPORT_DESERIALIZER', passportDeserializerFile, { leadingBlankLine: true }).then(() => {
                  resolve();
                });
              });
            });
          });
        });

        return Promise.all([
          addPackageDependencies(packages.authentication.common, params),
          updateAppFile,
          createAndUpdatePassportFile
        ]).then(() => {
          resolve(params);
        });
        break;
      case 'hapi':
        // TODO: not implemented
        return Promise.resolve();
        break;
      case 'sails':
        // TODO: not implemented
        return Promise.resolve();
        break;
      default:
        return Promise.reject('Unsupported Framework');
    }
  });
}

function generateFacebookAuthentication(params) {
  return new Promise((resolve, reject) => {
    // TODO
    if (params.authentication.indexOf('facebook') > -1) {

      let updatePassportFile = new Promise((resolve, reject) => {
        return replaceCode(config, 'PASSPORT_LOCAL_REQUIRE', require).then(() => {
          return replaceCode(config, 'PASSPORT_LOCAL_STRATEGY', strategy);
        });
      });

      return Promise.all([
        addPackageDependencies(packages.authentication.email, params),
        updatePassportFile
      ]).then(() => {
        resolve(params);
      });
    } else {
      return removeCode(config, 'PASSPORT_FACEBOOK_REQUIRE');
    }
  });
}
function generateGoogleAuthentication(params) {
  return new Promise((resolve, reject) => {
    // TODO
    if (params.authentication.indexOf('google') > -1) {

      let updatePassportFile = new Promise((resolve, reject) => {
        return replaceCode(config, 'PASSPORT_LOCAL_REQUIRE', require).then(() => {
          return replaceCode(config, 'PASSPORT_LOCAL_STRATEGY', strategy);
        });
      });

      return Promise.all([
        addPackageDependencies(packages.authentication.email, params),
        updatePassportFile
      ]).then(() => {
        resolve(params);
      });
    } else {
      return removeCode(config, 'PASSPORT_GOOGLE_REQUIRE');
    }
  });
}

function generateTwitterAuthentication(params) {
  return new Promise((resolve, reject) => {
    // TODO
    if (params.authentication.indexOf('twitter') > -1) {

      let updatePassportFile = new Promise((resolve, reject) => {
        return replaceCode(config, 'PASSPORT_LOCAL_REQUIRE', require).then(() => {
          return replaceCode(config, 'PASSPORT_LOCAL_STRATEGY', strategy);
        });
      });

      return Promise.all([
        addPackageDependencies(packages.authentication.email, params),
        updatePassportFile
      ]).then(() => {
        resolve(params);
      });
    } else {
      return removeCode(config, 'PASSPORT_TWITTER_REQUIRE')
    }
  });
}

function generateAuthentication(params) {
  return new Promise((resolve, reject) => {
    if (_.includes(params.authentication, 'none')) {
      resolve(params);
    } else {
      return generateCommonAuthentication(params)
        .then(generateEmailAuthentication)
        .then(generateFacebookAuthentication)
        .then(generateGoogleAuthentication)
        .then(generateTwitterAuthentication);
    }
  });
}

/**
 *
 * @param srcFile {buffer} - where to replace
 * @param subStr {string} - what to replace
 * @param newSrcFile {string} - replace it with this
 * @param [opts] {object} - options
 * @returns {string}
 */
function replaceCode(srcFile, subStr, newSrcFile, opts) {
  return readFile(srcFile).then((srcData) => {
    return readFile(newSrcFile).then((newSrcData) => {
      opts = opts || {};
      let array = srcData.toString().split('\n');

      array.forEach((line, index) => {
        if (line.includes(subStr)) {
          if (opts.indentLevel) {
            newSrcData = indentCode(newSrcData, opts.indentLevel);
          }

          newSrcData = newSrcData.toString().split('\n').filter(Boolean).join('\n');

          if (opts.leadingBlankLine) {
            newSrcData = '\n' + newSrcData;
          }

          array[index] = newSrcData;
        }
      });

      srcData = array.join('\n');

      return writeFile(srcFile, srcData);
    });
  });
}

/**
 *
 * @param srcFile {buffer} - where to remove
 * @param subStr {string} - what to remove
 * @returns {string}
 */
function removeCode(srcFile, subStr) {
  return readFile(srcFile).then((srcData) => {
    let array = srcData.toString().split('\n');
    array.forEach((line, index) => {
      if (line.includes(subStr)) {
        array.splice(index, 1);
      }
    });
    srcData = array.join('\n');
    return writeFile(srcFile, srcData);
  });
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

function cleanup(params) {
  return new Promise((resolve, reject) => {
    let location = path.join(__dirname, 'build', params.uid);
    return remove(location);
  });
}

function prepare(params) {
  return new Promise((resolve, reject) => {
    params.uid = shortid.generate();
    let location = path.join(__dirname, 'build', params.uid);
    return mkdirs(location).then(() => {
      resolve(params);
    });
  });
}
