'use strict';

const gulp    = require('gulp');
const babel   = require('gulp-babel');


const Loc = {
  src: ['src/**/*.js'],
  out: 'lib'
};


gulp.task('js', function () {
  return gulp.src(Loc.src)
    .pipe(babel())
    .pipe(gulp.dest(Loc.out));
});


gulp.task('default', ['js']);
