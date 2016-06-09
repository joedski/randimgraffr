'use strict';

let path = require( 'path' );

let gulp = require( 'gulp' );
let less = require( 'gulp-less' );
let sourcemaps = require( 'gulp-sourcemaps' );

let LessAutoprefix = require( 'less-plugin-autoprefix' );
let autoprefix = new LessAutoprefix({ browsers: [ 'last 2 versions' ] });

let source = require( 'vinyl-source-stream' );
let buffer = require( 'vinyl-buffer' );
let browserify = require( 'browserify' );
let babelify = require( 'babelify' );



//////// Settings

let sourceDir = 'public-source';
let outputDir = 'public';
let stylesSourceDir = 'styles';
let stylesOutputDir = 'stylesheets';
let scriptsOutputDir = 'javascripts';



//////// General

gulp.task( 'default', [ 'site' ]);
gulp.task( 'watch', [ 'watch-site' ]);

gulp.task( 'site', [
	'site:assets',
	'site:styles',
	'site:scripts',
]);

gulp.task( 'watch-site', () => {
	gulp.watch([ `${ sourceDir }/assets/**/*` ], [
		'site:assets:site',
	]);

	gulp.watch([ `${ sourceDir }/${ stylesSourceDir }/**/*` ], [
		'site:styles',
	]);

	gulp.watch([ `${ sourceDir }/scripts/**/*` ], [
		'site:scripts',
	]);
});



//////// Scripts

gulp.task( 'site:scripts', [
	'site:scripts:main'
]);

gulp.task( 'site:scripts:main', () => {
	return browserify( `${ sourceDir }/scripts/app.js`, { debug: true })
		.transform( babelify, {
			presets: [ 'es2015', 'react' ]
		})
		.bundle()
		.on( 'error', ( err ) => { console.error( err ); this.emit( 'end' ); })
		.pipe( source( 'app.js' ) )
		.pipe( buffer() )
		// .pipe( concat( 'app.js' ) )
		.pipe( sourcemaps.init({ loadmaps: true }) )
		.pipe( sourcemaps.write( './' ) )
		.pipe( gulp.dest( `${ outputDir }/${ scriptsOutputDir }` ) )
		;
});



//////// Assets

gulp.task( 'site:assets', [
	'site:assets:site',
	'site:assets:jquery',
	'site:assets:bootstrap:scripts',
	'site:assets:bootstrap:fonts',
]);

gulp.task( 'site:assets:site', () => {
	return gulp.src([ `${ sourceDir }/assets/**/*` ])
		.pipe( gulp.dest( `${ outputDir }` ) )
		;
});

gulp.task( 'site:assets:jquery', () => {
	return gulp.src([
		'node_modules/jquery/dist/jquery.min.js',
	], { base: 'node_modules/jquery/dist' })
		.pipe( gulp.dest( `${ outputDir }/${ scriptsOutputDir }` ) )
		;
})

gulp.task( 'site:assets:bootstrap:scripts', () => {
	return gulp.src([
		'node_modules/bootstrap/dist/js/bootstrap.min.js',
	], { base: 'node_modules/bootstrap/dist/js' })
		.pipe( gulp.dest( `${ outputDir }/${ scriptsOutputDir }` ) )
		;
});

gulp.task( 'site:assets:bootstrap:fonts', () => {
	return gulp.src([ 'node_modules/bootstrap/dist/fonts/**/*' ])
		.pipe( gulp.dest( `${ outputDir }/fonts` ) )
		;
});



//////// Styles

gulp.task( 'site:styles', () => {
	return gulp.src([ `${ sourceDir }/${ stylesSourceDir }/bootstrap.less` ], { base: `${ sourceDir }/${ stylesSourceDir }` })
		.pipe( sourcemaps.init() )
		.pipe( less({
			paths: [
				path.join( __dirname, 'node_modules', 'bootstrap', 'less' )
			],
			plugins: [ autoprefix ]
		}))
		.on( 'error', ( err ) => { console.error( err ); this.emit( 'end' ); })
		.pipe( sourcemaps.write( './' ) )
		.pipe( gulp.dest( `${ outputDir }/${ stylesOutputDir }` ) )
		;
});
