var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var argv = require('yargs').argv;
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');


gulp.task('react', function() {
  return browserify({ entries: 'app/main.js', debug: true })
    .transform('babelify', { presets: ['es2015', 'react'] })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(gulpif(argv.production, uglify()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('watchify', function() {
  var bundler = watchify(browserify({ entries: 'app/main.js', debug: true }, watchify.args));
  bundler.transform('babelify', { presets: ['es2015', 'react'] });
  bundler.on('update', rebundle);
  return rebundle();

  function rebundle() {
    var start = Date.now();
    return bundler.bundle()
      .on('error', function(err) {
        gutil.log(gutil.colors.red(err.toString()));
      })
      .on('end', function() {
        gutil.log(gutil.colors.green('Finished rebundling in', (Date.now() - start) + 'ms'));
      })
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('public/js'));
  }
});

gulp.task('watch', function() {
});

gulp.task('build', ['react']);
gulp.task('default', ['build', 'watch', 'watchify']);
