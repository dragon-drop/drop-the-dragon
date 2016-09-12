'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var minify = require('gulp-minify');
var gzip = require('gulp-gzip');

gulp.task('build', function () {
  // dependent on task 'css'
  return gulp.src('src/*.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        }
    }))
    .pipe(gzip())
    .pipe(gulp.dest('./build/'))
});