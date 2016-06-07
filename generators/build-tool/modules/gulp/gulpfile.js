var gulp = require('gulp');
//= GULP_UTIL_REQUIRE
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
  //= CSS_PREPROCESSOR_GULP_WATCH_INDENT1
  //= JS_FRAMEWORK_GULP_WATCH_INDENT1
});

gulp.task('build', ['<%= buildTasks %>']);
gulp.task('default', ['<%= defaultTasks %>']);
