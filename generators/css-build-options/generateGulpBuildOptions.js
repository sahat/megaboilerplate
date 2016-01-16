import { join } from 'path';
import { cpy, replaceCode, addNpmPackage } from '../utils';

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

async function generateGulpSass(params) {
  let build = join(__base, 'build', params.uuid);
  let gulpfile = join(__base, 'modules', 'build-tools', 'gulp', 'gulpfile.js');
  let sassGulpRequire = join(__base, 'modules', 'css-build-options', 'sass-gulp-require.js');
  let sassGulpTask = join(__base, 'modules', 'css-build-options', 'sass-gulp-task.js');

  await cpy([gulpfile], build);

  await addNpmPackage({ 'gulp': '^3.9.0' }, params);
  await addNpmPackage({ 'gulp-sass': '^2.1.1' }, params);
  await addNpmPackage({ 'gulp-csso': '^1.0.1' }, params);

  await replaceCode(gulpfile, 'SASS_GULP_REQUIRE', sassGulpRequire);
  await replaceCode(gulpfile, 'SASS_GULP_TASK', sassGulpTask);
}

async function generateGulpLess(params) {

}

export default generateGulpBuildOptions;
