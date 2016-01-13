var gulp = require('gulp'),
	scss = require('gulp-sass');

gulp.task('scss', function () {
  gulp.src('./app/scss/*.scss')
    .pipe(scss().on('error', scss.logError))
    .pipe(gulp.dest('./app'));
});
 
gulp.task('scss-watch', function () {
  gulp.watch('./app/scss/*.scss', ['scss']);
});

gulp.task('default', ['scss-watch']);