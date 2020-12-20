const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');
const browserSync = require('browser-sync').create();
const devUrl = "http://localhost:10017";

gulp.task('sass', () => {
	return gulp.src(['./scss/**/*.scss'])
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss([
			postcssPresetEnv()
		]))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.stream());
});

gulp.task('babel', () => {
	return gulp.src([
		'./js/vendor/polyfills.js',
		'./lib/js/Core.js',
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
		.pipe(gulp.dest('./dist/js'))
		.pipe(browserSync.stream({match: '**/*.js'}));
});

gulp.task('watch', () => {
	browserSync.init({
		files: [
			'./**/*.php',
		],
		proxy: devUrl,
		open: false,
		snippetOptions: {
			blacklist: ['/wp-admin/**']
		},
	});

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
