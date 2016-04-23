var gulp = require("gulp");
var concat = require('gulp-concat');

gulp.task('default', function() {
  return gulp.src('./public/js/*.js')
    .pipe(concat('app.pkgd.js'))
    .pipe(gulp.dest('./public/'));
});
