'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');

gulp.task('default', ['clean-dist', 'copy', 'js']);

// Only watching js
gulp.task('watch', () => {
  gulp.watch('src/app.js', ['js']);
});

gulp.task('copy', () => {
  gulp.src(['src/**/*', '!src/app.js'])
    .pipe(gulp.dest('dist'));
});

gulp.task('js', () => {
  gulp.src('src/app.js')
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean-dist', () => {
	del(['dist/**/*']);
});