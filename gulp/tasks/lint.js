var config = require('../../config');

var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var handleErrors = require('../util/handleErrors');

gulp.task('lint', function () {
    return gulp.src(config.paths.js)
		   .pipe(jshint())
		   .pipe(jshint.reporter("default"))
		   .on('error', handleErrors);
});