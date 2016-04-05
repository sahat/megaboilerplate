import { join } from 'path';
import { copy, replaceCode, addNpmPackage } from '../utils';

async function generateMiddlewareBuildOptions(params) {
  let server;

  switch (params.framework) {
    case 'express':
      server = join(__base, 'build', params.uuid, 'server.js');

      if (params.cssPreprocessor === 'sass') {
        await generateSassMiddleware(params, server);
      } else if (params.cssPreprocessor === 'less') {
        await generateLessMiddleware(params, server);
      }
      break;
    case 'hapi':
      server = join(__base, 'build', params.uuid, 'server.js');

      if (params.cssPreprocessor === 'sass') {
        await generateSassMiddleware(params, server);
      } else if (params.cssPreprocessor === 'less') {
        await generateLessMiddleware(params, server);
      }
      break;
    case 'meteor':
      break;
    default:
  }
}

async function generateSassMiddleware(params, app) {
  let sassMiddlewareRequire = join(__base, 'modules', 'css-build-options', 'sass-middleware-require.js');
  let sassMiddleware = join(__base, 'modules', 'css-build-options', 'sass-middleware.js');

  await addNpmPackage({ 'node-sass-middleware': '^0.9.7' }, params);

  await replaceCode(app, 'SASS_MIDDLEWARE_REQUIRE', sassMiddlewareRequire);
  await replaceCode(app, 'SASS_MIDDLEWARE', sassMiddleware);
}

async function generateLessMiddleware(params, app) {
  let lessMiddlewareRequire = join(__base, 'modules', 'css-build-options', 'less-middleware-require.js');
  let lessMiddleware = join(__base, 'modules', 'css-build-options', 'less-middleware.js');

  await addNpmPackage({ 'less-middleware': 'latest' }, params);

  await replaceCode(app, 'LESS_MIDDLEWARE_REQUIRE', lessMiddlewareRequire);
  await replaceCode(app, 'LESS_MIDDLEWARE', lessMiddleware);
}

export default generateMiddlewareBuildOptions;
