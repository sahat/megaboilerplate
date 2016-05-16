
gulp.task('angular', function() {
  return gulp.src([
      'app/app.js',
      'app/controllers/*.js',
      'app/services/*.js'
    ])
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(gulpif(argv.production, uglify()))
    .pipe(gulp.dest('public/js'));
});

gulp.task('templates', function() {
  return gulp.src('app/partials/**/*.html')
    .pipe(templateCache({ root: 'partials', module: 'MyApp' }))
    .pipe(gulp.dest('public/js'));
});
