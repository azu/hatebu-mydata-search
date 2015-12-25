var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var mocha = require('gulp-mocha');
var mochaPhantomJS = require('gulp-mocha-phantomjs');
var webserver = require('gulp-webserver');
var del = require('del');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var licensify = require('licensify');
var derequire = require('gulp-derequire');
var dereserve = require('gulp-dereserve');
var config = {
    jshint: {
        src: './index.js'
    },
    bundle: {
        standalone: 'escallmatch',
        srcFile: './index.js',
        destDir: './build',
        destName: 'escallmatch.js'
    },
    test: {
        base: './test/',
        pattern: '**/*test.js',
        amd: 'test/test-amd.html',
        browser: 'test/test-browser.html'
    }
};

function runMochaSimply() {
    return gulp
        .src(config.test.base + config.test.pattern, {read: false})
        .pipe(mocha({
            ui: 'bdd',
            reporter: 'dot'
        }))
        .on('error', gutil.log);
}

gulp.task('serve', function() {
    gulp.src(__dirname)
        .pipe(webserver({
            port: 9001,
            directoryListing: true
        }));
});

gulp.task('clean_bundle', function (done) {
    del([config.bundle.destDir], done);
});

gulp.task('bundle', ['clean_bundle'], function() {
    var b = browserify({entries: config.bundle.srcFile, standalone: config.bundle.standalone});
    b.plugin(licensify);
    var bundleStream = b.bundle();
    return bundleStream
        .pipe(source(config.bundle.destName))
        .pipe(dereserve())
        .pipe(derequire())
        .pipe(gulp.dest(config.bundle.destDir));
});

gulp.task('lint', function() {
    return gulp.src(config.jshint.src)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('unit', function () {
    return runMochaSimply();
});

gulp.task('watch', function () {
    gulp.watch(['index.js', 'test/**/*.js'], runMochaSimply);
    runMochaSimply();
});

gulp.task('test_amd', ['bundle'], function () {
    return gulp
        .src(config.test.amd)
        .pipe(mochaPhantomJS({reporter: 'dot'}));
});

gulp.task('test_browser', ['bundle'], function () {
    return gulp
        .src(config.test.browser)
        .pipe(mochaPhantomJS({reporter: 'dot'}));
});

gulp.task('clean', ['clean_bundle']);

gulp.task('test', ['lint', 'unit','test_browser','test_amd']);
