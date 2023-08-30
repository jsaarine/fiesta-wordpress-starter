const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const postcssClamp = require('postcss-clamp');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const fs = require("fs");
const config = require('./config.js');
const devUrl = config.devUrl();

const style = () => {
	return gulp.src(['./scss/**/*.scss'])
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(postcss([
			postcssClamp(),
			autoprefixer(),
		]))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.stream());
};

const script = () => {
	return gulp.src([
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
	gulp.watch(['./js/**/*.js', './lib/js/**/*.js', '../../plugins/fiesta-blocks/src/**/*.js'], gulp.series(script));
};

const minify = () => {
	gulp.src(['./dist/css/style.css'])
		.pipe(cleanCSS())
		.pipe(gulp.dest('./dist/css'));

	gulp.src(['./dist/css/style-editor.css'])
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

const version = (cb) => {
	const pkg = JSON.parse(fs.readFileSync("./package.json", "utf8"));
	let css = fs.readFileSync("./style.css", "utf8");

	fs.writeFileSync("./style.css", css.replace(/Version: (\d+\.)?(\d+\.)?(\*|\d+)/, "Version: " + pkg.version));

	cb();
};

exports.default = gulp.series(style, script, watch);
exports.build = gulp.series(style, script, minify);
exports.version = version;
