import { join } from 'path';
import { cpy, exists, replaceCode, addNpmPackage } from '../utils';

async function generateGulpBuildTool(params) {
  const build = join(__base, 'build', params.uuid);
  const gulpfile = join(__base, 'modules', 'build-tool', 'gulp', 'gulpfile.js');

  switch (params.cssPreprocessor) {
    case 'sass':
      const sassGulpRequire = join(__base, 'modules', 'build-tool', 'gulp', 'sass-gulp-require.js');
      const sassGulpTask = join(__base, 'modules', 'build-tool', 'gulp', 'sass-gulp-task.js');

      await cpy([gulpfile], build);

      await addNpmPackage('gulp', params);
      await addNpmPackage('gulp-sass', params);
      await addNpmPackage('gulp-csso', params);
      await addNpmPackage('gulp-autoprefixer', params);

      await replaceCode(join(build, 'gulpfile.js'), 'CSS_PREPROCESSOR_GULP_REQUIRE', sassGulpRequire);
      await replaceCode(join(build, 'gulpfile.js'), 'CSS_PREPROCESSOR_GULP_TASK', sassGulpTask, { leadingBlankLine: true });
      break;

    case 'less':
      const lessGulpRequire = join(__base, 'modules', 'build-tool', 'gulp', 'less-gulp-require.js');
      const lessGulpTask = join(__base, 'modules', 'build-tool', 'gulp', 'less-gulp-task.js');

      await cpy([gulpfile], build);

      await addNpmPackage('gulp', params);
      await addNpmPackage('gulp-less', params);
      await addNpmPackage('gulp-csso', params);
      await addNpmPackage('gulp-autoprefixer', params);

      await replaceCode(join(build, 'gulpfile.js'), 'CSS_PREPROCESSOR_GULP_REQUIRE', lessGulpRequire);
      await replaceCode(join(build, 'gulpfile.js'), 'CSS_PREPROCESSOR_GULP_TASK', lessGulpTask, { leadingBlankLine: true });
      break;

    case 'css':

    default:
      break;
  }


  switch (params.jsFramework) {
    case 'react':
      const reactGulpRequire = join(__base, 'modules', 'css-build-options', 'sass-gulp-require.js');
      const reactGulpTask = join(__base, 'modules', 'css-build-options', 'sass-gulp-task.js');

      // Check if gulpfile.js already exists
      if (!exists(gulpfile)) {
        await cpy([gulpfile], build);
      }

      await addNpmPackage({ 'gulp': '^3.9.0' }, params);
      await addNpmPackage({ 'gulp-sass': '^2.1.1' }, params);
      await addNpmPackage({ 'gulp-csso': '^1.0.1' }, params);

      await replaceCode(join(build, 'gulpfile.js'), 'CSS_PREPROCESSOR_GULP_REQUIRE', sassGulpRequire);
      await replaceCode(join(build, 'gulpfile.js'), 'CSS_PREPROCESSOR_GULP_TASK', sassGulpTask, { leadingBlankLine: true });

      break;

    case 'angular':
      break;

    default:
      break;
  }
}

export default generateGulpBuildTool;
