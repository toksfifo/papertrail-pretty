'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', ['copy', 'js']);

gulp.task('watch', () => {
  gulp.watch('src/app.js', ['js']);
});

gulp.task('copy', () => {
  gulp.src(['src/*', '!src/app.js'])
    .pipe(gulp.dest('dist'));
});

gulp.task('js', () => {
  gulp.src('src/app.js')
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest('dist'));
});