const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('autoprefixer');
const postcssCustomProperties = require('postcss-custom-properties');
const browserSync = require('browser-sync').create();
const config = require('./config.js');
const devUrl = config.devUrl();

const style = () => {
	return gulp.src(['./scss/**/*.scss'])
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(postcss([
			autoprefixer(),
			postcssCustomProperties(),
		]))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.stream());
};

const script = () => {
	return gulp.src([
		'./lib/js/Core.js',
		'./js/Header.js',
		'./js/Navigation.js',
		'./js/App.js',
	])
		.pipe(sourcemaps.init())
		.pipe(concat("./script.js"))
		.pipe(babel({
			presets: ["@babel/preset-env"],
			ignore: ['./js/vendor']
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./dist/js'))
		.pipe(browserSync.stream({match: '**/*.js'}));
};

const watch = () => {
	browserSync.init({
		files: [
			'./**/*.php',
			'../../plugins/fiesta-blocks/src/**/*.php',
		],
		proxy: devUrl,
		open: false,
		snippetOptions: {
			blacklist: ['/wp-admin/**']
		},
	});

	gulp.watch(['./scss/**/*.scss', './lib/scss/**/*.scss', '../../plugins/fiesta-blocks/src/**/*.scss'], gulp.series(style));
	gulp.watch(['./js/**/*.js', './lib/js/**/*.js'], gulp.series(script));
};

const minify = () => {
	gulp.src(['./dist/css/style.css'])
		.pipe(cleanCSS())
		.pipe(gulp.dest('./dist/css'));

	return gulp.src([
		'./dist/js/script.js',
	])
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./dist/js'));
};

exports.default = gulp.series(style, script, watch);
exports.build = gulp.series(style, script, minify);
