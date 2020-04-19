const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const minify = require('gulp-minify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
// const browserSync = require('browser-sync').create();

gulp.task('sass', () => {
    return gulp.src(['./scss/**/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([ autoprefixer(), cssnano()]))
        .pipe(gulp.dest('./'))
        // .pipe(browserSync.stream());
});

gulp.task('babel', () => {
    // return gulp.src(['./js-src/**/*.js', ], {base: './js-src/'})
    return gulp.src([
        './js-src/vendor/polyfills.js',
        './js-src/vendor/isMobile.min.js',
        './js-src/vendor/cookieconsent.js',
        './js-src/fiesta/Core.js',
        './js-src/fiesta/Component.js',
        './js-src/Header.js',
        './js-src/Navigation.js',
        './js-src/App.js',
    ])
        .pipe(sourcemaps.init())
        .pipe(babel({
            ignore: ['./js-src/vendor']
        }))
        .pipe(concat("./script.js"))
        .pipe(minify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./js'));	
});

gulp.task('browser-sync', function() {
    
});

gulp.task('watch', () => {
	// browserSync.init({
 //        proxy: "testing.local"
 //    });

    gulp.watch('./scss/**/*.scss', gulp.series('sass'));
    gulp.watch('./js-src/**/*.js', gulp.series(['babel']));
});

gulp.task('default', gulp.series(['sass', 'babel', 'watch']));
gulp.task('build', gulp.series(['sass', 'babel']));