gulp.task('build', function() {
  return browserify({ entries: 'public/javascripts/main.jsx', extensions: ['.jsx'], debug: true })
    .transform(babelify, { presets: ['react'] })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('public/javascripts'));
});
