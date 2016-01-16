import { join } from 'path';
import { cpy, replaceCode, addNpmPackage } from '../utils';

async function generateGulpBuildOptions(params) {
  let build = join(__base, 'build', params.uuid);
  let gulpfile = join(__base, 'modules', 'build-tools', 'gulp', 'gulpfile.js');

  switch (params.cssPreprocessor) {
    case 'sass':
      let sassGulpRequire = join(__base, 'modules', 'css-build-options', 'sass-gulp-require.js');
      let sassGulpTask = join(__base, 'modules', 'css-build-options', 'sass-gulp-task.js');

      await cpy([gulpfile], build);

      await addNpmPackage({ 'gulp': '^3.9.0' }, params);
      await addNpmPackage({ 'gulp-sass': '^2.1.1' }, params);
      await addNpmPackage({ 'gulp-csso': '^1.0.1' }, params);

      await replaceCode(join(build, 'gulpfile.js'), 'SASS_GULP_REQUIRE', sassGulpRequire);
      await replaceCode(join(build, 'gulpfile.js'), 'SASS_GULP_TASK', sassGulpTask);
      break;

    case 'less':
      let lessGulpRequire = join(__base, 'modules', 'css-build-options', 'less-gulp-require.js');
      let lessGulpTask = join(__base, 'modules', 'css-build-options', 'less-gulp-task.js');

      await cpy([gulpfile], build);

      await addNpmPackage({ 'gulp': '^3.9.0' }, params);
      await addNpmPackage({ 'gulp-less': '^3.0.5' }, params);
      await addNpmPackage({ 'gulp-csso': '^1.0.1' }, params);

      await replaceCode(join(build, 'gulpfile.js'), 'LESS_GULP_REQUIRE', lessGulpRequire);
      await replaceCode(join(build, 'gulpfile.js'), 'LESS_GULP_TASK', lessGulpTask);
      break;

    case 'css':
      break;

    default:
  }
}

export default generateGulpBuildOptions;
