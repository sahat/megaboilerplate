gulp.task('css', function() {
  gulp.src('public/stylesheets/main.css')
    .pipe(plumber())
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(gulp.dest('public/stylesheets'));
});
