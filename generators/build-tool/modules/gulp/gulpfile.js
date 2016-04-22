var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var argv = require('yargs').argv;
//= JS_FRAMEWORK_GULP_REQUIRE
//= CSS_PREPROCESSOR_GULP_REQUIRE
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');

//= CSS_PREPROCESSOR_GULP_TASK
//= JS_FRAMEWORK_GULP_TASK

gulp.task('watch', function() {
  gulp.watch('public/css/**/*.scss', gulp.series('sass'));
  //= JS_FRAMEWORK_GULP_WATCH_INDENT1
});
gulp.task('build', gulp.parallel('<%= buildTasks %>'));
gulp.task('default', gulp.parallel('<%= defaultTasks %>'));
