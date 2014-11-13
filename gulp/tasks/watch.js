var config = require('../../config');

var gulp   = require('gulp');

gulp.task('watch', ['lint'], function() {
	gulp.watch(config.paths.js,['lint']);
});