import { set } from 'lodash';
import { getModule, replaceCodeMemory, templateReplaceMemory, addNpmScriptMemory, addNpmPackageMemory } from '../utils';

export default async function generateGulpBuildTool(params) {
  set(params, ['build', 'gulpfile.js'], await getModule('build-tool/gulp/gulpfile.js'));

  await addNpmScriptMemory('postinstall', 'gulp build', params);
  await addNpmScriptMemory('build', 'gulp build', params);
  await addNpmScriptMemory('watch', 'gulp', params);

  await addNpmPackageMemory('gulp', params, true);
  await addNpmPackageMemory('gulp-if', params, true);
  await addNpmPackageMemory('gulp-util', params, true);
  await addNpmPackageMemory('yargs', params, true);
  await addNpmPackageMemory('gulp-sourcemaps', params, true);
  await addNpmPackageMemory('gulp-uglify', params, true);
  await addNpmPackageMemory('vinyl-buffer', params, true);
  await addNpmPackageMemory('gulp-plumber', params, true);
  await addNpmPackageMemory('gulp-csso', params, true);
  await addNpmPackageMemory('gulp-autoprefixer', params, true);

  const buildTasks = [];
  const defaultTasks = ['build', 'watch'];

  switch (params.cssPreprocessor) {
    case 'sass':
      await replaceCodeMemory(params, 'gulpfile.js', 'CSS_PREPROCESSOR_GULP_REQUIRE', await getModule('build-tool/gulp/sass-gulp-require.js'));
      await replaceCodeMemory(params, 'gulpfile.js', 'CSS_PREPROCESSOR_GULP_TASK', await getModule('build-tool/gulp/sass-gulp-task.js'));
      await replaceCodeMemory(params, 'gulpfile.js', 'CSS_PREPROCESSOR_GULP_WATCH', await getModule('build-tool/gulp/sass-gulp-watch.js'));
      await addNpmPackageMemory('gulp-sass', params, true);
      buildTasks.push('sass');
      break;
    case 'less':
      await replaceCodeMemory(params, 'gulpfile.js', 'CSS_PREPROCESSOR_GULP_REQUIRE', await getModule('build-tool/gulp/less-gulp-require.js'));
      await replaceCodeMemory(params, 'gulpfile.js', 'CSS_PREPROCESSOR_GULP_TASK', await getModule('build-tool/gulp/less-gulp-task.js'));
      await replaceCodeMemory(params, 'gulpfile.js', 'CSS_PREPROCESSOR_GULP_WATCH', await getModule('build-tool/gulp/less-gulp-watch.js'));
      await addNpmPackageMemory('gulp-less', params, true);
      buildTasks.push('less');
      break;
    default:
      break;
  }

  switch (params.jsFramework) {
    case 'react':
      await replaceCodeMemory(params, 'gulpfile.js', 'JS_FRAMEWORK_GULP_REQUIRE', await getModule('build-tool/gulp/react/react-gulp-require.js'));
      await replaceCodeMemory(params, 'gulpfile.js', 'JS_FRAMEWORK_GULP_TASK', await getModule('build-tool/gulp/react/react-gulp-task.js'));
      await addNpmPackageMemory('vinyl-source-stream', params, true);
      await addNpmPackageMemory('babelify', params, true);
      await addNpmPackageMemory('browserify', params, true);
      await addNpmPackageMemory('watchify', params, true);
      await addNpmPackageMemory('babel-preset-es2015', params, true);
      await addNpmPackageMemory('babel-preset-react', params, true);
      buildTasks.push('react');
      defaultTasks.push('watchify');
      break;
    case 'angularjs':
      await replaceCodeMemory(params, 'gulpfile.js', 'JS_FRAMEWORK_GULP_REQUIRE', await getModule('build-tool/gulp/angularjs/angularjs-require.js'));
      await replaceCodeMemory(params, 'gulpfile.js', 'JS_FRAMEWORK_GULP_TASK', await getModule('build-tool/gulp/angularjs/angularjs-task.js'));
      await replaceCodeMemory(params, 'gulpfile.js', 'JS_FRAMEWORK_GULP_WATCH', await getModule('build-tool/gulp/angularjs/angularjs-watch.js'));
      await addNpmPackageMemory('gulp-concat', params, true);
      await addNpmPackageMemory('gulp-ng-annotate', params, true);
      await addNpmPackageMemory('gulp-angular-templatecache', params, true);
      buildTasks.push('angular', 'templates');
      break;
    default:
      break;
  }

  await templateReplaceMemory(params, 'gulpfile.js', {
    buildTasks: buildTasks.join("', '"),
    defaultTasks: defaultTasks.join("', '")
  });
}
