var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('exec', [], shell.task("node script.js"))