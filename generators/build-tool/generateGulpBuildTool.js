import { join } from 'path';
import { cpy, replaceCode, addNpmPackage } from '../utils';

async function generateGulpBuildTool(params) {
  const build = join(__base, 'build', params.uuid);
  const gulpfile = join(__dirname, 'modules', 'gulp', 'gulpfile.js');

  await cpy([gulpfile], build);

  await addNpmPackage('gulp', params);
  await addNpmPackage('gulp-sourcemaps', params);
  await addNpmPackage('gulp-uglify', params);
  await addNpmPackage('vinyl-buffer', params);
  await addNpmPackage('gulp-plumber', params);
  await addNpmPackage('gulp-csso', params);
  await addNpmPackage('gulp-autoprefixer', params);

  switch (params.cssPreprocessor) {
    case 'sass':
      const sassGulpRequire = join(__dirname, 'modules', 'gulp', 'sass-gulp-require.js');
      const sassGulpTask = join(__dirname, 'modules', 'gulp', 'sass-gulp-task.js');

      await addNpmPackage('gulp-sass', params);

      await replaceCode(join(build, 'gulpfile.js'), 'CSS_PREPROCESSOR_GULP_REQUIRE', sassGulpRequire);
      await replaceCode(join(build, 'gulpfile.js'), 'CSS_PREPROCESSOR_GULP_TASK', sassGulpTask);
      break;

    case 'less':
      const lessGulpRequire = join(__dirname, 'modules', 'gulp', 'less-gulp-require.js');
      const lessGulpTask = join(__dirname, 'modules', 'gulp', 'less-gulp-task.js');

      await addNpmPackage('gulp-less', params);

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

      await addNpmPackage('vinyl-source-stream', params);
      await addNpmPackage('babelify', params);
      await addNpmPackage('browserify', params);

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
