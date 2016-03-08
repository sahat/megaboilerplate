gulp.task('less', function() {
  gulp.src('public/stylesheets/main.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(gulp.dest('public/stylesheets'));
});
