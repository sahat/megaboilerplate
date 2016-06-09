gulp.task('stylus', function() {
  return gulp.src('public/css/main.styl')
    .pipe(plumber())
    .pipe(stylus({ use: nib() }))
    .pipe(autoprefixer())
    .pipe(gulpif(argv.production, csso()))
    .pipe(gulp.dest('public/css'));
});
