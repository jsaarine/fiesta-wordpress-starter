const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const postcssPresetEnv = require('postcss-preset-env');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

gulp.task('sass', () => {
    return gulp.src(['./scss/**/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            autoprefixer(),
            postcssPresetEnv()
        ]))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('babel', () => {
    return gulp.src([
        './js/vendor/polyfills.js',
        './lib/js/Core.js',
        './lib/js/Component.js',
        './js/Header.js',
        './js/Navigation.js',
        './js/App.js',
    ])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ["@babel/preset-env"],
            ignore: ['./js/vendor']
        }))
        .pipe(concat("./script.js"))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('watch', () => {
    gulp.watch(['./scss/**/*.scss', './lib/scss/**/*.scss'], gulp.series('sass'));
    gulp.watch(['./js/**/*.js', './lib/js/**/*.js'], gulp.series(['babel']));
});

gulp.task('minify', () => {
    gulp.src(['./dist/css/style.css'])
        .pipe(postcss([
            cssnano(),
        ]))
        .pipe(gulp.dest('./dist/css'));

    return gulp.src([
        './dist/js/script.js',
    ])
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('default', gulp.series(['sass', 'babel', 'watch']));
gulp.task('build', gulp.series(['sass', 'babel', 'minify']));
