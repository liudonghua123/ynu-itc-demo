var gulp = require('gulp');
var inject = require('gulp-inject');
var bowerFiles = require('main-bower-files');
var es = require('event-stream');
var gls = require('gulp-live-server');
var watch = require('gulp-watch');
var del = require('del');

gulp.task('clean', function () {
  return del(['dist']);
});

// Copy all static bower files
gulp.task('bower', function () {
  return gulp.src(bowerFiles(), { base: 'bower_components' })
    .pipe(gulp.dest('./src/vendor/'));
});

gulp.task('inject', ['bower'], function () {
  return gulp.src('./src/index.html')
  .pipe(inject(gulp.src(['./src/vendor/**/*.js', './src/vendor/**/*.css'], {read: false}), {name: 'bower', relative: true}))
  .pipe(inject(gulp.src(['./src/**/*.js', './src/**/*.css', '!./src/vendor/**/*.js', '!./src/vendor/**/*.css'], {read: false}), {relative: true}))
  .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function () {
  return gulp.watch('./src/index.html', function (file) {
      gulp.start('inject');
    });
});

gulp.task('resources', function () {
    gulp.src(['./src/**/*', '!./src/index.html'], {base: 'src'})
        .pipe(gulp.dest('./dist/'));
    return gulp.watch(['./src/**/*'], function (file) {
      gulp.src(['./src/**/*', '!./src/index.html'], {base: 'src'})
            .pipe(gulp.dest('./dist/'));
      });
});

gulp.task('serve', ['resources'], function() {
    var server = gls.static(['dist'], 8000);
    server.start();
    //use gulp.watch to trigger server actions(notify, start or stop)
    return gulp.watch(['./dist/**/*'], function (file) {
      server.notify.apply(server, [file]);
    });
  });

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['bower', 'inject', 'watch', 'serve']);