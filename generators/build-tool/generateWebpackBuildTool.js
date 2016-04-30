import { join } from 'path';
import { cpy, replaceCode, templateReplace, addNpmPackage, addNpmScript } from '../utils';

async function genereateWebpackBuildTool(params) {
  const build = join(__base, 'build', params.uuid);
  const webpack = join(__dirname, 'modules', 'webpack', 'webpack.config.js');

  await cpy([webpack], build);

  await addNpmScript('postinstall', 'webpack', params);

  await addNpmPackage('webpack', params, true);
  await addNpmPackage('gulp-autoprefixer', params, true);

  let buildTasks = [];
  let defaultTasks = ['build', 'watch'];
  
  switch (params.cssPreprocessor) {
    case 'sass':
      const sassGulpRequire = join(__dirname, 'modules', 'gulp', 'sass-gulp-require.js');
      const sassGulpTask = join(__dirname, 'modules', 'gulp', 'sass-gulp-task.js');
      const sassGulpWatch = join(__dirname, 'modules', 'gulp', 'sass-gulp-watch.js');

      await addNpmPackage('gulp-sass', params, true);

      await replaceCode(join(build, 'gulpfile.js'), 'CSS_PREPROCESSOR_GULP_REQUIRE', sassGulpRequire);
      await replaceCode(join(build, 'gulpfile.js'), 'CSS_PREPROCESSOR_GULP_TASK', sassGulpTask);
      await replaceCode(join(build, 'gulpfile.js'), 'CSS_PREPROCESSOR_GULP_WATCH', sassGulpWatch);

      buildTasks.push('sass');
      break;

    case 'less':
      const lessGulpRequire = join(__dirname, 'modules', 'gulp', 'less-gulp-require.js');
      const lessGulpTask = join(__dirname, 'modules', 'gulp', 'less-gulp-task.js');
      const lessGulpWatch = join(__dirname, 'modules', 'gulp', 'less-gulp-watch.js');

      await addNpmPackage('gulp-less', params, true);

      await replaceCode(join(build, 'gulpfile.js'), 'CSS_PREPROCESSOR_GULP_REQUIRE', lessGulpRequire);
      await replaceCode(join(build, 'gulpfile.js'), 'CSS_PREPROCESSOR_GULP_TASK', lessGulpTask);
      await replaceCode(join(build, 'gulpfile.js'), 'CSS_PREPROCESSOR_GULP_WATCH', lessGulpWatch);

      buildTasks.push('less');
      break;

    default:
      break;
  }

  switch (params.jsFramework) {
    case 'react':
      const reactGulpRequire = join(__dirname, 'modules', 'gulp', 'react', 'react-gulp-require.js');
      const reactGulpTask = join(__dirname, 'modules', 'gulp', 'react', 'react-gulp-task.js');

      await addNpmPackage('vinyl-source-stream', params, true);
      await addNpmPackage('babelify', params, true);
      await addNpmPackage('browserify', params, true);
      await addNpmPackage('watchify', params, true);
      await addNpmPackage('babel-preset-es2015', params, true);
      await addNpmPackage('babel-preset-react', params, true);

      await replaceCode(join(build, 'gulpfile.js'), 'JS_FRAMEWORK_GULP_REQUIRE', reactGulpRequire);
      await replaceCode(join(build, 'gulpfile.js'), 'JS_FRAMEWORK_GULP_TASK', reactGulpTask);

      buildTasks.push('react');
      defaultTasks.push('watchify');
      break;

    case 'angularjs':
      const angularjsGulpRequire = join(__dirname, 'modules', 'gulp', 'angularjs', 'angularjs-require.js');
      const angularjsGulpTask = join(__dirname, 'modules', 'gulp', 'angularjs', 'angularjs-task.js');
      const angularjsGulpWatch = join(__dirname, 'modules', 'gulp', 'angularjs', 'angularjs-watch.js');

      await addNpmPackage('gulp-concat', params, true);
      await addNpmPackage('gulp-ng-annotate', params, true);
      await addNpmPackage('gulp-angular-templatecache', params, true);

      await replaceCode(join(build, 'gulpfile.js'), 'JS_FRAMEWORK_GULP_REQUIRE', angularjsGulpRequire);
      await replaceCode(join(build, 'gulpfile.js'), 'JS_FRAMEWORK_GULP_TASK', angularjsGulpTask);
      await replaceCode(join(build, 'gulpfile.js'), 'JS_FRAMEWORK_GULP_WATCH', angularjsGulpWatch);

      buildTasks.push('angular', 'templates');
      break;

    default:
      break;
  }

  await templateReplace(join(build, 'gulpfile.js'), {
    buildTasks: buildTasks.join("', '"),
    defaultTasks: defaultTasks.join("', '")
  });
}

export default genereateWebpackBuildTool;
