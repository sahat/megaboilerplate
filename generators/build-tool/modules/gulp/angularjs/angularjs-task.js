
gulp.task('build', function() {
  return gulp.src([
      'app/main.js',
      'app/controllers/*.js',
      'app/services/*.js'
    ])
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(gulpif(argv.production, uglify()))
    .pipe(gulp.dest('public/js'));
});
