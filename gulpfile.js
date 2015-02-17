var gulp = require('gulp'),
    server = require('gulp-express'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css');

gulp.task('js', function () {
    return gulp.src(['app/public/src/js/lib/angular/angular.min.js',
                     'app/public/src/js/lib/angular/angular-route.min.js',
                     'app/public/src/js/lib/angular/ngStorage.js',
                     'app/public/src/js/lib/angular/angular-md5.js',
                     'app/public/src/js/lib/vendor/loading-bar.js',
                     'app/public/src/js/app.js',
                     'app/public/src/js/controllers/*.js',
                     'app/public/src/js/services/*.js',
                     'app/public/src/js/utils/*.js'])
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('app/public/build/js'))
        .pipe(server.notify())
        .pipe(notify({
            message: 'Finished minifying JavaScript'
        }));
});

gulp.task('css', function () {
    return gulp.src('app/public/src/sass/**/*.scss')
        .pipe(sass())
        .pipe(minifycss())
        .pipe(gulp.dest('app/public/build/css/'))
        .pipe(server.notify())
        .pipe(notify({
            message: 'Finished minifying SASS'
        }));
});

gulp.task('html', function () {
    gulp.src('app/public/build/**/*.html')
        .pipe(server.notify());
});

gulp.task('node', function () {
    gulp.watch('app/server/routes/**/*.js', ['default']);
    gulp.watch('app/server/views/**/*.html', ['default']);
    gulp.watch('app/server/models/**/*.js', ['default']);
    gulp.watch('app/server/services/**/*.js', ['default']);
    gulp.watch('app/server/config/**/*.js', ['default']);
});

gulp.task('server', function () {
    // Start the server at the beginning of the task
    server.run({
        file: 'bin/www'
    });
});

gulp.task('default', ['js', 'css', 'server']);