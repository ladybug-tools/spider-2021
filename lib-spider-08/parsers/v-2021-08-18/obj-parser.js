// copyright 2021 Theo Armour. MIT license.
/* global THREE, COR*/
// jshint esversion: 6
// jshint loopfunc: true

OBJ = {};

OBJ.read = function ( inpFiles ) {

	if ( OBJ.objLoader === undefined ) {

		OBJ.objLoader = document.body.appendChild( document.createElement( 'script' ) );
		OBJ.objLoader.onload = () => OBJ.readFile( inpFiles );
		OBJ.objLoader.src = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r131/examples/js/loaders/OBJLoader.js";

	} else {

		OBJ.readFile( inpFiles );

	}

};


OBJ.readFile = function ( files ) {

	const reader = new FileReader();
	reader.onload = ( event ) => OBJ.loadUrl( event.target.result );
	reader.readAsDataURL( files.files[ 0 ] );

};


OBJ.loadUrl = function ( url ) {

	const loader = new THREE.OBJLoader();

	loader.load(
		url,

		function ( object ) {

			console.log( "object", object );

			COR.reset( object.children );

		},

		function ( xhr ) {

			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

		},

		function ( error ) {

			console.log( 'An error happened' );

		}
	);

};

if ( FRL.files ) {

	console.log( "FRL.files", FRL.files );
	OBJ.read( FRL.files );

}