import { join } from 'path';
import { replaceCode, addNpmPackage } from '../utils';

async function generateMiddlewareBuildOptions(params) {
  const server = join(__base, 'build', params.uuid, 'server.js');

  switch (params.framework) {
    case 'express':
      if (params.cssPreprocessor === 'sass') {
        await generateSassMiddleware(params, server);
      } else if (params.cssPreprocessor === 'less') {
        await generateLessMiddleware(params, server);
      }
      break;
    case 'meteor':
      break;
    default:
      break;
  }
}

async function generateSassMiddleware(params, server) {
  let sassMiddlewareRequire = join(__base, 'modules', 'css-build-options', 'sass-middleware-require.js');
  let sassMiddleware = join(__base, 'modules', 'css-build-options', 'sass-middleware.js');

  await addNpmPackage({ 'node-sass-middleware': '^0.9.7' }, params);

  await replaceCode(server, 'SASS_MIDDLEWARE_REQUIRE', sassMiddlewareRequire);
  await replaceCode(server, 'SASS_MIDDLEWARE', sassMiddleware);
}

async function generateLessMiddleware(params, server) {
  let lessMiddlewareRequire = join(__base, 'modules', 'css-build-options', 'less-middleware-require.js');
  let lessMiddleware = join(__base, 'modules', 'css-build-options', 'less-middleware.js');

  await addNpmPackage({ 'less-middleware': 'latest' }, params);

  await replaceCode(server, 'LESS_MIDDLEWARE_REQUIRE', lessMiddlewareRequire);
  await replaceCode(server, 'LESS_MIDDLEWARE', lessMiddleware);
}

export default generateMiddlewareBuildOptions;
