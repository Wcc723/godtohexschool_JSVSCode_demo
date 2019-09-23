const gulp = require('gulp');
const include = require('gulp-include');
const minify = require('gulp-minify');

gulp.task('javascript', (cb) => {
  gulp
    .src('./src/gulp-all.js')
    .pipe(include())
    .on('error', console.log)
    .pipe(minify())
    .pipe(gulp.dest('dist/js'));

  cb();
});

gulp.task('default', gulp.series('javascript'));
