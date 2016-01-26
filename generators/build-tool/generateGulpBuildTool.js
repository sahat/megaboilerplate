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
      const cssGulpRequire = join(__base, 'modules', 'build-tool', 'gulp', 'css-gulp-require.js');
      const cssGulpTask = join(__base, 'modules', 'build-tool', 'gulp', 'css-gulp-task.js');

      await cpy([gulpfile], build);

      await addNpmPackage('gulp', params);
      await addNpmPackage('gulp-csso', params);
      await addNpmPackage('gulp-autoprefixer', params);

      await replaceCode(join(build, 'gulpfile.js'), 'CSS_PREPROCESSOR_GULP_REQUIRE', cssGulpRequire);
      await replaceCode(join(build, 'gulpfile.js'), 'CSS_PREPROCESSOR_GULP_TASK', cssGulpTask, { leadingBlankLine: true });
      break;

    default:
      break;
  }

  switch (params.jsFramework) {
    case 'react':
      const reactGulpRequire = join(__base, 'modules', 'build-tool', 'gulp', 'react-gulp-require.js');
      const reactGulpTask = join(__base, 'modules', 'build-tool', 'gulp', 'react-gulp-task.js');

      await addNpmPackage('gulp-util', params);
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
