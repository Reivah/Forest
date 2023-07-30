const { src, dest, series, parallel, watch } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const cssnano = require('gulp-cssnano')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')
const sourcemaps = require('gulp-sourcemaps')
const browserSync = require('browser-sync').create()
const clean = require('gulp-clean')
const kit = require('gulp-kit');
const reload = browserSync.reload

const paths = {
	html: './html/**/*.kit',
	sass: './src/sass/**/*.scss',
	java: './src/js/**/*.js',
	img: './src/img/*',
	dist: './dist',
	sassDest: './dist/css',
	javaDest: './dist/js',
	imgDest: './dist/img',
}

function sassCompiler(cb) {
	src(paths.sass)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cssnano())
		.pipe(rename({ suffix: '.mini' }))
		.pipe(sourcemaps.write())
		.pipe(dest(paths.sassDest))
	cb()
}

function javaScript(cb) {
	src(paths.java)
		.pipe(sourcemaps.init())
		.pipe(
			babel({
				presets: ['@babel/env'],
			})
		)
		.pipe(uglify())
		.pipe(rename({ suffix: '.mini' }))
		.pipe(sourcemaps.write())
		.pipe(dest(paths.javaDest))
	cb()
}

function imageConverter(cb) {
	src(paths.img)
		.pipe(imagemin())
		.pipe(rename({ suffix: '.convertered' }))
		.pipe(dest(paths.imgDest))
	cb()
}

function startBrowserSync(cb) {
	browserSync.init({
		server: {
			baseDir: './',
		},
		browser: 'chrome'
	})
	cb()
}

function cleanStuff(cb) {
	src('./page.html', { read: false }).pipe(clean())
	cb()
}

function handleKits(cb){
	src(paths.html)
	.pipe(kit())
	.pipe(dest('./'))
	cb()
}



function watchForChanges(cb) {
	watch('./*.html').on('change', reload)
	watch([paths.html, paths.sass, paths.java], parallel(handleKits, sassCompiler, javaScript)).on('change', reload)
	watch(paths.img, imageConverter).on('change', reload)
	cb()
}

const mainFunctions = parallel(handleKits, sassCompiler, javaScript, imageConverter)
exports.default = series(mainFunctions, startBrowserSync, watchForChanges)
exports.cleanStuff = cleanStuff
