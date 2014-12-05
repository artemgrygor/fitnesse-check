var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('unit', function () {
    return gulp.src('test/*.spec.js', {read: false})
        .pipe(mocha({reporter: 'nyan'}));
});