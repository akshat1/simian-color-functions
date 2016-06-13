'use strict';

const gulp   = require('gulp');
const babel  = require('gulp-babel');
const del    = require('del');
const jsdoc  = require('gulp-jsdoc');
const mocha  = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

const Loc = {
  src        : 'src/**/*.js',
  srcForTest : 'lib/**/*.js',
  test       : 'test/**/*.js',
  out        : 'lib',
  docSrc     : 'lib/*.js',
  docOut     : 'docs'
};


gulp.task('clean', function() {
  return del([Loc.out, Loc.docOut]);
});


gulp.task('js', ['clean'], function () {
  return gulp.src(Loc.src)
    .pipe(babel())
    .pipe(gulp.dest(Loc.out));
});


gulp.task('document', ['clean', 'js'], function () {
  return gulp.src(Loc.docSrc)
    .pipe(jsdoc(Loc.docOut))
});


gulp.task('test', ['js'], function () {
  return gulp.src(Loc.srcForTest)
    .pipe(istanbul({
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire())
    .on('finish', function() {
      return gulp.src([Loc.test])
        .pipe(mocha({}))
        .pipe(istanbul.writeReports({
          dir: Loc.coverage
        }));
    });
});


gulp.task('default', ['js', 'document']);
