gulp.task('sass', function() {
  gulp.src('public/stylesheets/main.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(csso())
    .pipe(gulp.dest('public/stylesheets'));
});
