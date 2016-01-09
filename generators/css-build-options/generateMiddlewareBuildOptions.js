import { join } from 'path';
import { copy, replaceCode, addDependencies } from '../utils';

let dependencies = require('../../modules/dependencies');

async function generateMiddlewareBuildOptions(params) {
  switch (params.framework) {
    case 'express':
      let appPath = path.join(__base, 'build', params.uuid, 'app.js');

      if (params.cssPreprocessor === 'sass') {
        await generateSassMiddleware(params, appPath);
      } else if (params.cssPreprocessor === 'less') {
        await generateLessMiddleware(params, appPath);
      } else {

      }
      break;
    case 'hapi':
      break;
    case 'meteor':
      break;
    default:
  }
}

async function generateSassMiddleware(params, app) {
  let sassMiddlewareRequire = join(__base, 'modules', 'css-build-options', 'sass-middleware-require.js');
  let sassMiddleware = join(__base, 'modules', 'css-build-options', 'sass-middleware.js');

  await addDependencies(dependencies.cssBuildOptions.sass.middleware, params);
  await replaceCode(app, 'SASS_MIDDLEWARE_REQUIRE', sassMiddlewareRequire);
  await replaceCode(app, 'SASS_MIDDLEWARE', sassMiddleware);
}

async function generateLessMiddleware(params, app) {
  let lessMiddlewareRequire = join(__base, 'modules', 'css-build-options', 'less-middleware-require.js');
  let lessMiddleware = join(__base, 'modules', 'css-build-options', 'less-middleware.js');

  await addDependencies(dependencies.cssBuildOptions.less.middleware, params);
  await replaceCode(app, 'LESS_MIDDLEWARE_REQUIRE', lessMiddlewareRequire);
  await replaceCode(app, 'LESS_MIDDLEWARE', lessMiddleware);
}

module.exports = generateMiddlewareBuildOptions;
