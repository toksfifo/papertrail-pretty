'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const minifyCss = require('gulp-minify-css');
const concat = require('gulp-concat');

gulp.task('default', ['clean-dist', 'copy', 'js', 'js-lib', 'css', 'css-lib']);

// Note: only watching js
gulp.task('watch', () => {
  gulp.watch('src/app.js', ['js']);
});

gulp.task('copy', ['clean-dist'], () => {
  gulp.src(['src/manifest.json'])
    .pipe(gulp.dest('dist'));
});

gulp.task('js', ['clean-dist'], () => {
  gulp.src('src/app.js')
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(uglify({ compress: { drop_console: true }}))
    .pipe(gulp.dest('dist'));
});

gulp.task('js-lib', ['clean-dist'], () => {
  gulp.src('src/lib/**/*.js')
    .pipe(concat('lib.js'))
    .pipe(uglify({ compress: { drop_console: true }}))
    .pipe(gulp.dest('dist'));
});

gulp.task('css-lib', ['clean-dist'], () => {
  gulp.src('src/lib/**/*.css')
    .pipe(concat('lib.css'))
    .pipe(minifyCss({ keepSpecialComments: 0 }))
    .pipe(gulp.dest('dist'));
});

gulp.task('css', ['clean-dist'], () => {
  gulp.src('src/app.css')
    .pipe(autoprefixer())
    .pipe(minifyCss({ keepSpecialComments: 0 }))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean-dist', () => {
	del(['dist/**/*']);
});