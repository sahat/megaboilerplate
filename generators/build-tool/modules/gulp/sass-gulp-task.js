gulp.task('sass', function() {
  gulp.src('public/stylesheets/main.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(gulp.dest('public/stylesheets'));
});
