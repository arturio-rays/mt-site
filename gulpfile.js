const { on } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

function liveReload() {
    browserSync.init({
        server: './src'
    })
    gulp.watch('src/scss/*.scss', compileStyles)
    gulp.watch('src/js/*.js', transpileScript)
    gulp.watch('src/*.html').on('change', browserSync.reload)
}

function compileStyles() {
    return gulp.src('src/scss/main.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream())
}

function transpileScript() {
    return gulp.src('src/js/*.js')
        .pipe(concat('script.js'))
        .pipe(gulp.dest('src/script'))
        .pipe(browserSync.stream());
}

exports.scss = compileStyles;
exports.default = liveReload;