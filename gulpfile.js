var gulp = require('gulp');
var tsd  = require('gulp-tsd');
var changed = require('gulp-changed');
var typescript = require('gulp-tsc');
var flatten = require('gulp-flatten');
var uglify = require('gulp-uglify');
var bower = require ('gulp-bower-files');

gulp.task('default', ['build']);

gulp.task('typescript', function () {
    return gulp.src('src/**/*.ts')
        .pipe(changed('src/js', { extension: '.js' }))
        .pipe(typescript({ emitError: false }))
        .pipe(gulp.dest('src/js'));
});

gulp.task('tsd', function () {
    return gulp.src('./gulp_tsd.json').pipe(tsd());
});

gulp.task('bower', function () {
    return bower().pipe(uglify({preserveComments:'some'}))
                  .pipe(flatten())
                  .pipe(gulp.dest('vendor'));
});

