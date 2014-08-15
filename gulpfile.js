/*!
 * obsidian-city - gulpfile.js
 * GNU Public License
 * codenameyau.github.io
 *
 * Description:
 * Generates dist folder for deployment
 *
 * Run: gulp
 */
'use strict';

// Import node packages
var gulp = require('gulp');
var rimraf = require('rimraf');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');

// File paths
var PATHS = {
  images : 'app/assets/img/**',
  index : 'app/index.html',
  favicon : 'app/favicon.ico',
};

// Remove last generated dist folder
gulp.task('clean', function(cb) {
  rimraf('dist/', cb);
});

// Replace build with concat files in index.html
gulp.task('usemin', ['clean'], function() {
  gulp.src(PATHS.index)
    .pipe(usemin({
      css: [rev()],
      js: [uglify(), rev()],
    }))
    .pipe(gulp.dest('dist/'));
});

// Copy static images (todo: gulp-imagemin)
gulp.task('images', ['clean'], function() {
  gulp.src(PATHS.favicon)
    .pipe(gulp.dest('dist/'));
  gulp.src(PATHS.images)
    .pipe(gulp.dest('dist/assets/img'));
});

// Generate dist folder for production
gulp.task('default', ['clean', 'usemin', 'images']);
