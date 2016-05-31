gulp.watch('app/views/**/*.html', gulp.series('templates'));
gulp.watch('app/**/*.js', gulp.series('angular'));
