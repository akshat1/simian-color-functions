'use strict';

const gulp  = require('gulp');
const babel = require('gulp-babel');
const del   = require('del');
const jsdoc = require('gulp-jsdoc');

const Loc = {
  src    : 'src/**/*.js',
  out    : 'lib',
  docSrc : 'lib/*.js',
  docOut : 'docs'
};


gulp.task('clean', function() {
  return del([Loc.out, Loc.docOut]);
});


gulp.task('js', ['clean'], function () {
  return gulp.src(Loc.src)
    .pipe(babel())
    .pipe(gulp.dest(Loc.out));
});


gulp.task('document', ['clean', 'js'], function() {
  return gulp.src(Loc.docSrc)
    .pipe(jsdoc(Loc.docOut))
});


gulp.task('default', ['js', 'document']);
