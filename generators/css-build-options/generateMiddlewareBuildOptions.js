let path = require('path');
let fs = require('fs-extra');
let Promise = require('bluebird');
let copy = Promise.promisify(fs.copy);
let replaceCode = require('../../utils/replaceCode');
let addDependencies = require('../../utils/addDependencies');
let packages = require('../../modules/packages');


async function generateMiddlewareBuildOptions(params) {
  switch (params.framework) {
    case 'express':
      let app = path.join(__base, 'build', params.uuid, 'app.js');
      if (params.cssPreprocessor === 'sass') {
        generateSassMiddleware(params, app);
      } else if (params.cssPreprocessor === 'less') {
        generateLessMiddleware(params, app);
      } else if (params.cssPreprocessor === 'postcss') {
        // TODO
      }
      break;
    case 'hapi':
      // TODO
      break;
    case 'sails':
      // TODO
      break;
    default:
    // TODO
  }
}

async function generateSassMiddleware(params, app) {
  let sassMiddlewareRequire = path.join(__base, 'modules', 'css-preprocessor', 'sass-middleware-require.js');
  let sassMiddleware = path.join(__base, 'modules', 'css-preprocessor', 'sass-middleware.js');

  await addDependencies(packages.cssBuildOptions.sass.middleware, params);
  await replaceCode(app, 'SASS_MIDDLEWARE_REQUIRE', sassMiddlewareRequire);
  await replaceCode(app, 'SASS_MIDDLEWARE', sassMiddleware);
}

async function generateLessMiddleware(params, app) {
  let lessMiddlewareRequire = path.join(__base, 'modules', 'css-preprocessor', 'less-middleware-require.js');
  let lessMiddleware = path.join(__base, 'modules', 'css-preprocessor', 'less-middleware.js');

  await addDependencies(packages.cssBuildOptions.less.middleware, params);
  await replaceCode(app, 'LESS_MIDDLEWARE_REQUIRE', lessMiddlewareRequire);
  await replaceCode(app, 'LESS_MIDDLEWARE', lessMiddleware);
}

module.exports = generateMiddlewareBuildOptions;
