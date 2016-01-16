gulp.task('less', function() {
  gulp.src('public/stylesheets/main.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(csso())
    .pipe(gulp.dest('public/stylesheets'));
});
