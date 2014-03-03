var gulp = require('gulp');
var stylus = require('gulp-stylus');

gulp.task('stylus', function(){
  gulp.src('./src/stylus/index.styl')
    .pipe(stylus({use: ['nib']}))
    .pipe(gulp.dest('./'));
});