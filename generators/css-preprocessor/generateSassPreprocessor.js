let path = require('path');
let fs = require('fs-extra');
let Promise = require('bluebird');
let copy = Promise.promisify(fs.copy);
let replaceCode = require('../../utils/replaceCode');
let addDependencies = require('../../utils/addDependencies');
let packages = require('../../modules/packages');

async function generateSassPreprocessor(params) {
  let build = path.join(__base, 'build', params.uuid);
  let mainSass = path.join(__base, 'modules', 'css-preprocessor', 'main.scss');
  let sassMiddlewareRequire = path.join(__base, 'modules', 'css-preprocessor', 'sass-middleware-require.js');
  let sassMiddleware = path.join(__base, 'modules', 'css-preprocessor', 'sass-middleware.js');

  switch (params.framework) {
    case 'express':
      let app = path.join(build, 'app.js');
      await copy(mainSass, path.join(build, 'public', 'stylesheets', 'main.scss'));
      await addDependencies(packages.cssBuildOptions.sass.middleware, params);
      await replaceCode(app, 'SASS_MIDDLEWARE_REQUIRE', sassMiddlewareRequire);
      await replaceCode(app, 'SASS_MIDDLEWARE', sassMiddleware);
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

module.exports = generateSassPreprocessor;
