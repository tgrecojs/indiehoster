var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var uncss       = require('gulp-uncss');
var nano        = require('gulp-cssnano');



var input = './sass/**/*.scss';	
var output = './public/css';

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./public"
    });

    gulp.watch(input, ['sass']);
    gulp.watch(output).on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(input)
        .pipe(sass())
        .pipe(gulp.dest(output))
        .pipe(browserSync.stream());
});

gulp.task('build', function() {
    return gulp.src('public/css/main.css')
          .pipe(uncss({
            html: ['public/index.html']
        }))
        .pipe(nano())
        .pipe(gulp.dest('./out'));
});

gulp.task('default', ['serve']);
