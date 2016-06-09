import { set } from 'lodash';
import { getModule, replaceCodeMemory, templateReplaceMemory, addNpmScriptMemory, addNpmPackageMemory } from '../utils';

export default async function generateGulpBuildTool(params) {
  set(params, ['build', 'gulpfile.js'], await getModule('build-tool/gulp/gulpfile.js'));

  await addNpmScriptMemory('build', 'gulp build', params);
  await addNpmScriptMemory('build:production', 'gulp build --production', params);
  await addNpmScriptMemory('postinstall', 'npm run build:production', params);
  await addNpmScriptMemory('watch', 'gulp', params);

  await addNpmPackageMemory('gulp', params);
  await addNpmPackageMemory('gulp-if', params);
  await addNpmPackageMemory('yargs', params);
  await addNpmPackageMemory('gulp-sourcemaps', params);
  await addNpmPackageMemory('gulp-uglify', params);
  await addNpmPackageMemory('vinyl-buffer', params);
  await addNpmPackageMemory('gulp-plumber', params);
  await addNpmPackageMemory('gulp-csso', params);
  await addNpmPackageMemory('gulp-autoprefixer', params);

  const buildTasks = [];
  const defaultTasks = ['build', 'watch'];

  switch (params.cssPreprocessor) {
    case 'sass':
      await replaceCodeMemory(params, 'gulpfile.js', 'CSS_PREPROCESSOR_GULP_REQUIRE', await getModule('build-tool/gulp/sass-gulp-require.js'));
      await replaceCodeMemory(params, 'gulpfile.js', 'CSS_PREPROCESSOR_GULP_TASK', await getModule('build-tool/gulp/sass-gulp-task.js'));
      await replaceCodeMemory(params, 'gulpfile.js', 'CSS_PREPROCESSOR_GULP_WATCH', await getModule('build-tool/gulp/sass-gulp-watch.js'));
      await addNpmPackageMemory('gulp-sass', params);
      buildTasks.push('sass');
      break;
    case 'less':
      await replaceCodeMemory(params, 'gulpfile.js', 'CSS_PREPROCESSOR_GULP_REQUIRE', await getModule('build-tool/gulp/less-gulp-require.js'));
      await replaceCodeMemory(params, 'gulpfile.js', 'CSS_PREPROCESSOR_GULP_TASK', await getModule('build-tool/gulp/less-gulp-task.js'));
      await replaceCodeMemory(params, 'gulpfile.js', 'CSS_PREPROCESSOR_GULP_WATCH', await getModule('build-tool/gulp/less-gulp-watch.js'));
      await addNpmPackageMemory('gulp-less', params);
      buildTasks.push('less');
      break;
    case 'stylus':
      await replaceCodeMemory(params, 'gulpfile.js', 'CSS_PREPROCESSOR_GULP_REQUIRE', await getModule('build-tool/gulp/stylus-gulp-require.js'));
      await replaceCodeMemory(params, 'gulpfile.js', 'CSS_PREPROCESSOR_GULP_TASK', await getModule('build-tool/gulp/stylus-gulp-task.js'));
      await replaceCodeMemory(params, 'gulpfile.js', 'CSS_PREPROCESSOR_GULP_WATCH', await getModule('build-tool/gulp/stylus-gulp-watch.js'));
      await addNpmPackageMemory('gulp-stylus', params);
      await addNpmPackageMemory('nib', params);
      buildTasks.push('stylus');
      break;
    default:
      break;
  }

  switch (params.jsFramework) {
    case 'react':
      await replaceCodeMemory(params, 'gulpfile.js', 'GULP_UTIL_REQUIRE', await getModule('build-tool/gulp/gutil-require.js'));
      await replaceCodeMemory(params, 'gulpfile.js', 'JS_FRAMEWORK_GULP_REQUIRE', await getModule('build-tool/gulp/react/react-gulp-require.js'));
      await replaceCodeMemory(params, 'gulpfile.js', 'JS_FRAMEWORK_GULP_TASK', await getModule('build-tool/gulp/react/react-gulp-task.js'));
      await addNpmPackageMemory('gulp-util', params);
      await addNpmPackageMemory('vinyl-source-stream', params);
      await addNpmPackageMemory('babelify', params);
      await addNpmPackageMemory('browserify', params);
      await addNpmPackageMemory('watchify', params);
      await addNpmPackageMemory('babel-preset-es2015', params);
      await addNpmPackageMemory('babel-preset-react', params);
      buildTasks.push('react');
      defaultTasks.push('watchify');
      break;
    case 'angularjs':
      await replaceCodeMemory(params, 'gulpfile.js', 'JS_FRAMEWORK_GULP_REQUIRE', await getModule('build-tool/gulp/angularjs/angularjs-require.js'));
      await replaceCodeMemory(params, 'gulpfile.js', 'JS_FRAMEWORK_GULP_TASK', await getModule('build-tool/gulp/angularjs/angularjs-task.js'));
      await replaceCodeMemory(params, 'gulpfile.js', 'JS_FRAMEWORK_GULP_WATCH', await getModule('build-tool/gulp/angularjs/angularjs-watch.js'));
      await addNpmPackageMemory('gulp-concat', params);
      await addNpmPackageMemory('gulp-ng-annotate', params);
      await addNpmPackageMemory('gulp-angular-templatecache', params);
      buildTasks.push('angular', 'vendor', 'templates');
      break;
    default:
      break;
  }

  await templateReplaceMemory(params, 'gulpfile.js', {
    buildTasks: buildTasks.join("', '"),
    defaultTasks: defaultTasks.join("', '")
  });
}
