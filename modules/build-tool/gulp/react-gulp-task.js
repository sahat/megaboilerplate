gulp.task('build', function() {
  return browserify('public/javascripts/main.jsx')
    .transform(babelify, { presets: ['react'] })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('public/javascripts'));
});
