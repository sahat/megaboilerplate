import { join } from 'path';
import { copy, replaceCode, addNpmPackage } from '../utils';

async function generateGulpBuildOptions(params) {
  switch (params.cssPreprocessor) {
    case 'sass':
      await generateGulpSass(params);
      break;
    case 'less':
      await generateGulpLess(params);
      break;
    case 'css':
      break;
    default:
  }
}

async function generateGulpSass(params, app) {
  let gulpfile = join(__base, 'modules', 'build-tools', 'gulpfile.js');
  let sassGulpRequire = join(__base, 'modules', 'css-build-options', 'sass-gulp-require.js');
  let sassGulpTask = join(__base, 'modules', 'css-build-options', 'sass-gulp-task.js');

  await addNpmPackage({ 'gulp': '*' }, params);
  await addNpmPackage({ 'gulp-sass': '*' }, params);
  await addNpmPackage({ 'gulp-csso': '*' }, params);

  await replaceCode(gulpfile, 'SASS_GULP_REQUIRE', sassGulpRequire);
  await replaceCode(app, 'SASS_GULP_TASK', sassGulpTask);
}

async function generateGulpLess(params, app) {
  let lessMiddlewareRequire = join(__base, 'modules', 'css-build-options', 'less-middleware-require.js');
  let lessMiddleware = join(__base, 'modules', 'css-build-options', 'less-middleware.js');

  await addNpmPackage({ 'less-middleware': 'latest' }, params);

  await replaceCode(app, 'LESS_MIDDLEWARE_REQUIRE', lessMiddlewareRequire);
  await replaceCode(app, 'LESS_MIDDLEWARE', lessMiddleware);
}

export default generateGulpBuildOptions;
