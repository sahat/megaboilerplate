gulp.task('css', function() {
  gulp.src('public/css/main.css')
    .pipe(plumber())
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(gulp.dest('public/css'));
});
