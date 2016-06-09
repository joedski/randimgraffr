/**
 * Animals!
 *
 * Currently this is unfancy and dumb, only really works one level deep,
 * but that's currently what I want.
 */

var path = require( 'path' );
var fs = require( 'fs' );
var async = require( 'async' );

var express = require( 'express' );
var router = express.Router();

var animalsDir = path.join( '/', 'Users', 'Joe', 'Dropbox', 'Animal Photos' );



////////

router.get( '/', function redirectRoot( req, res, next ) {
	// I know that technically "foo.com/bar" is different from "foo.com/bar/",
	// and they result in different behavior here...
	// but both req.baseUrl and req.path return the same value in either case,
	// BUT but, using redirect( './practice' ) does NOT do the same thing in either case!
	// In "foo.com/bar", it goes to "foo.com/practice",
	// while "foo.com/bar/" goes to "foo.com/bar/practice"!
	// req.baseUrl has th evalue of "/bar" for both of these, so just using that
	// works here.
	res.redirect( `${ req.baseUrl }/practice` );
});

router.get( '/practice', function render( req, res, next ) {
	res.render( 'animals', { title: "Animals!" });
});

// Beh.
router.get( '/files/*', handleFileList );
router.get( '/dirs/*', handleDirList );

router.use( '/images', express.static( animalsDir ) );

module.exports = router;



////////

function handleDirList( req, res, next ) {
	var decodedPathParts = normalizePathParts( req.path );
	var animalsSubDir = path.join.apply( path, [ animalsDir ].concat( decodedPathParts ) );

	return handleList( listDirishes( animalsSubDir ), req, res, next );
}

function handleFileList( req, res, next ) {
	var decodedPathParts = normalizePathParts( req.path );
	var animalsSubDir = path.join.apply( path, [ animalsDir ].concat( decodedPathParts ) );

	return handleList( listFilishes( animalsSubDir ), req, res, next );
}



////////

function normalizePathParts( reqPath ) {
	var reqPathParts = reqPath.split( '/' );

	// drop '/list'
	reqPathParts = reqPathParts.slice( 2 );

	var decodedPathParts = reqPathParts
		.map( decodeURIComponent )
		.filter( function( part ) { return Boolean( part ); })
		;

	return decodedPathParts;
}

function handleList( lister, req, res, next ) {
	async.waterfall([
		lister
	], function( error, list ) {
		if( error ) {
			next( error );
			return;
		}

		if( list ) {
			res.send( JSON.stringify( list ) );
			return;
		}

		var error = new Error( 'Unknown error occurred: Did not get animals even though no other errors occurred.' );
		next( error );
		return;
	});
}

function listDirishes( dir ) {
	return function listDirishesBound( next ) {
		fs.readdir( dir, function( error, animalsListRaw ) {
			// Note: Should really just run stat and check if they're dirs.
			var animalsList = animalsListRaw
				.filter( filterOutDotFiles )
				.filter( filterOutFilesEndingWithSpaces )
				.filter( filterOutFilesWithExtensions )
				;

			next( null, animalsList );
		});
	}
}

function listFilishes( dir ) {
	return function listFilishesBound( next ) {
		fs.readdir( dir, function( error, animalsListRaw ) {
			// Note: Should really just run stat and check if they're dirs.
			var animalsList = animalsListRaw
				.filter( filterInFilesWithExtensions )
				.filter( filterOutDotFiles )
				.filter( filterOutFilesEndingWithSpaces )
				;

			next( null, animalsList );
		});
	}
}



////////

function filterOutDotFiles( fileName ) {
	if( fileName.indexOf( '.' ) === 0 ) return false;
	return true;
}

function filterOutFilesWithExtensions( fileName ) {
	if( (/\.\w+$/).test( fileName ) ) return false;
	return true;
}

function filterOutFilesEndingWithSpaces( fileName ) {
	if( (/\s$/).test( fileName ) ) return false;
	return true;
}

function filterInFilesWithExtensions( fileName ) {
	return ! filterOutFilesWithExtensions( fileName );
}
