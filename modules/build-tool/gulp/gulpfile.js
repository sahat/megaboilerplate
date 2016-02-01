var gulp = require('gulp');
//= JS_FRAMEWORK_GULP_REQUIRE
//= CSS_PREPROCESSOR_GULP_REQUIRE
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');

//= CSS_PREPROCESSOR_GULP_TASK
//= JS_FRAMEWORK_GULP_TASK

// Rerun the task when a file changes
//gulp.task('watch', function() {
//  gulp.watch(paths.scripts, ['scripts']);
//  gulp.watch(paths.images, ['images']);
//});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'scripts', 'images']);
