var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('check', [], shell.task("node script.js"))