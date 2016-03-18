import { join } from 'path';
import { cpy, replaceCode, addNpmPackage } from '../utils';

async function generateGulpBuildTool(params) {
  const build = join(__base, 'build', params.uuid);
  const gulpfile = join(__dirname, 'modules', 'gulp', 'gulpfile.js');

  await cpy([gulpfile], build);

  await addNpmPackage('gulp', params, true);
  await addNpmPackage('gulp-if', params, true);
  await addNpmPackage('yargs', params, true);
  await addNpmPackage('gulp-sourcemaps', params, true);
  await addNpmPackage('gulp-uglify', params, true);
  await addNpmPackage('vinyl-buffer', params, true);
  await addNpmPackage('gulp-plumber', params, true);
  await addNpmPackage('gulp-csso', params, true);
  await addNpmPackage('gulp-autoprefixer', params, true);

  switch (params.cssPreprocessor) {
    case 'sass':
      const sassGulpRequire = join(__dirname, 'modules', 'gulp', 'sass-gulp-require.js');
      const sassGulpTask = join(__dirname, 'modules', 'gulp', 'sass-gulp-task.js');

      await addNpmPackage('gulp-sass', params, true);

      await replaceCode(join(build, 'gulpfile.js'), 'CSS_PREPROCESSOR_GULP_REQUIRE', sassGulpRequire);
      await replaceCode(join(build, 'gulpfile.js'), 'CSS_PREPROCESSOR_GULP_TASK', sassGulpTask);
      break;

    case 'less':
      const lessGulpRequire = join(__dirname, 'modules', 'gulp', 'less-gulp-require.js');
      const lessGulpTask = join(__dirname, 'modules', 'gulp', 'less-gulp-task.js');

      await addNpmPackage('gulp-less', params, true);

      await replaceCode(join(build, 'gulpfile.js'), 'CSS_PREPROCESSOR_GULP_REQUIRE', lessGulpRequire);
      await replaceCode(join(build, 'gulpfile.js'), 'CSS_PREPROCESSOR_GULP_TASK', lessGulpTask);
      break;

    case 'css':
      const cssGulpRequire = join(__dirname, 'modules', 'gulp', 'css-gulp-require.js');
      const cssGulpTask = join(__dirname, 'modules', 'gulp', 'css-gulp-task.js');

      await replaceCode(join(build, 'gulpfile.js'), 'CSS_PREPROCESSOR_GULP_REQUIRE', cssGulpRequire);
      await replaceCode(join(build, 'gulpfile.js'), 'CSS_PREPROCESSOR_GULP_TASK', cssGulpTask);
      break;

    default:
      break;
  }

  switch (params.jsFramework) {
    case 'react':
      const reactGulpRequire = join(__dirname, 'modules', 'gulp', 'react-gulp-require.js');
      const reactGulpTask = join(__dirname, 'modules', 'gulp', 'react-gulp-task.js');

      await addNpmPackage('vinyl-source-stream', params, true);
      await addNpmPackage('babelify', params, true);
      await addNpmPackage('browserify', params, true);

      await replaceCode(join(build, 'gulpfile.js'), 'JS_FRAMEWORK_GULP_REQUIRE', reactGulpRequire);
      await replaceCode(join(build, 'gulpfile.js'), 'JS_FRAMEWORK_GULP_TASK', reactGulpTask, { leadingBlankLine: true });

      break;

    case 'angular':
      break;

    default:
      break;
  }
}

export default generateGulpBuildTool;
