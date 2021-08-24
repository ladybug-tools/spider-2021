// copyright 2021 Theo Armour. MIT license.
/* global COR, FRL, r3DM, GBX, GLTF, HBJ, IDF, OBJ, STL, VTK */
// jshint esversion: 6
// jshint loopfunc: true

const FOP = {};

FOP.path = "lib-spider-08/parsers/v-2021-08-18/";


FOP.handleFiles = function ( fName ) {

	console.log( "fop", fName );

	if ( fName.endsWith( ".3dm" ) ) { FOP.load( r3DM, "3dm-parser.js" ); return; }

	if ( fName.endsWith( "xml" ) ) { FOP.load( GBX, "gbx-gbxml-parser.js" ); return; }

	if ( fName.endsWith( "gltf" ) || fName.endsWith( "glb" ) ) { FOP.load( GLTF, "gltf-parser.js" ); return; }

	if ( fName.endsWith( "hbjson" ) ) { FOP.load( HBJ, "hbj-hbjson-parser.js" ); return; }

	if ( fName.endsWith( ".idf" ) || fName.endsWith( ".osm" ) ) { FOP.load( IDF, "idf-parser.js" ); return; }

	if ( fName.endsWith( ".obj" ) ) { FOP.load( OBJ, "obj-parser.js" ); return; }

	if ( fName.endsWith( ".rad" ) ) { FOP.load( RAD, "rad-parser.js" ); return; }

	if ( fName.endsWith( ".stl" ) ) { FOP.load( STL, "stl-parser.js" ); return; }

	if ( fName.endsWith( ".vtk" ) || fName.endsWith( ".vtp" ) ) { FOP.load( VTK, "vtk-parser.js" ); return; }

	if ( fName.endsWith( ".zip" ) ) {

	}

};


FOP.load = function( obj, parser ) {

	if ( obj === undefined ) {

		scr = document.body.appendChild( document.createElement( 'script' ) );
		scr.src = COR.path + FOP.path + parser;

	} else {

		obj.read( FRL.files );

	}

	FRL.onProgress( FRL.file.size, "Load complete" );

}