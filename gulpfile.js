var gulp = require('gulp');
var tsd  = require('gulp-tsd');
var changed = require('gulp-changed');
var typescript = require('gulp-tsc');
var flatten = require('gulp-flatten');
var uglify = require('gulp-uglify');
var bower = require ('gulp-bower-files');
var clean = require ('gulp-clean');
var Q = require('q');
var exec = require('child_process').exec;
var editJson = require('gulp-json-editor');
var runSequence = require('gulp-run-sequence');

function tag () {
    var q = Q.defer();
    exec('git describe --tags --always --dirty', function (err, stdout, stderr) {
        if (err) {
            q.reject(err);
            return;
        }

        q.resolve(stdout.replace(/\n/, ''));
    });
    return q.promise;
}

function version () {
    return tag().then(function (tag) {
        return tag.replace(/-(\d+)/, '.$1')
            .replace(/-g[0-9a-f]+/, '')
            .replace(/-dirty/, '');
    });
}
gulp.task('default', ['build']);

gulp.task('typescript', function () {
    return gulp.src('src/**/*.ts')
        .pipe(changed('src/js', { extension: '.js' }))
        .pipe(typescript({ emitError: false }))
        .pipe(gulp.dest('src/js'));
});

gulp.task('copy', ['copy-manifest', 'copy-src', 'copy-vendor']);

gulp.task('copy-manifest', function () {
    return gulp.src('src/manifest.json')
        .pipe(gulp.dest('app'));
});

gulp.task('copy-src', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('app/js'));
});

gulp.task('copy-vendor', function () {
    return gulp.src('vendor/*')
        .pipe(gulp.dest('app/vendor'));
});

gulp.task('tsd', function () {
    return gulp.src('./gulp_tsd.json').pipe(tsd());
});

gulp.task('bower', function () {
    return bower().pipe(uglify({preserveComments:'some'}))
        .pipe(flatten())
        .pipe(gulp.dest('vendor'));
});

gulp.task('clean', function () {
    return gulp.src('app')
        .pipe(clean());
});

gulp.task('manifest', function () {
    return version().then(function (version) {
        return gulp.src('src/manifest.json')
            .pipe(editJson({ version: version }))
            .pipe(gulp.dest('app/'));
    });
});

gulp.task('build', function () {
    runSequence('typescript', 'copy');
});

