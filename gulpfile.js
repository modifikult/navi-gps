// установка пакетов gulp
// npm i gulp browser-sync del sass gulp-sass gulp-csso gulp-autoprefixer gulp-group-css-media-queries gulp-rename gulp-file-include gulp-uglify-es --save-dev

const {src, dest, watch, series} = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    csso = require('gulp-csso'),
    autoprefixer = require('gulp-autoprefixer'),
    groupMedia = require('gulp-group-css-media-queries'),
    rename = require('gulp-rename'),
    del = require('del'),
    fileInclude = require('gulp-file-include'),
    uglify = require('gulp-uglify-es').default,
    browserSync = require('browser-sync').create();

function browserSyncServe(cb) {
    browserSync.init({
        server: {
            baseDir: 'dist/',
            index: 'index.html'
        },
        port: 3000
    })
    cb();
}

function browserSyncReload(cb) {
    browserSync.reload();
    cb();
}

function html() {
    return src('src/*.html')
        .pipe(fileInclude())
        .pipe(dest('dist/'))
}

function scss() {
    return src('src/scss/style.scss')
        .pipe(sass())
        .pipe(groupMedia())
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(dest('dist/css/'))
        .pipe(csso())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(dest('dist/css/'))
}

function js() {
    return src('src/js/**/*.js')
        .pipe(dest('dist/js/'))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(dest('dist/js/'))
}

function img() {
    return src('src/img/**/*.*')
        .pipe(dest('dist/img/'))
}

function fonts() {
    return src('src/fonts/**/*.*')
        .pipe(dest('dist/fonts/'))
}

function clean() {
    return del('dist/')
}

function watchFiles() {
    watch('src/**/*.html', series(html, browserSyncReload));
    watch('src/scss/**/*.scss', series(scss, browserSyncReload));
    watch('src/js/**/*.js', series(js, browserSyncReload));
    watch('src/img/**/*.*', series(img, browserSyncReload));
    watch('src/fonts/**/*.*', series(fonts, browserSyncReload));
}

exports.default = series(
    clean,
    html,
    scss,
    js,
    img,
    fonts,
    browserSyncServe,
    watchFiles,
)