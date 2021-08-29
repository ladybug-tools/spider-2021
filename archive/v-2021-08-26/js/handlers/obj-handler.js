// copyright 2021 Theo Armour. MIT license.
/* global THREE, COR*/
// jshint esversion: 6
// jshint loopfunc: true

OBJ = {};


OBJ.handle = function () {

	//console.log( "FRX.content", FRX.content.slice( 0, 100 ) );
	console.log( "FRX.files ", FRX.file );
	console.log( "FRX.url", FRX.url.split( "/" ).pop()  );

	if ( FRX.content ) { OBJ.onUnZip(); return; }

	if ( FRX.file ) { OBJ.read(); return; }

	if ( FRX.url ) { OBJ.onChange( FRX.url ); return; }

};


OBJ.read = function () {

	if ( OBJ.objLoader === undefined ) {

		OBJ.objLoader = document.body.appendChild( document.createElement( 'script' ) );
		OBJ.objLoader.onload = () => OBJ.readFile();
		OBJ.objLoader.src = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r131/examples/js/loaders/OBJLoader.js";

	} else {

		OBJ.readFile( FRX.file );

	}

};

OBJ.onChange = function ( url ) {

	if ( OBJ.objLoader === undefined ) {

		OBJ.objLoader = document.body.appendChild( document.createElement( 'script' ) );
		OBJ.objLoader.onload = () => OBJ.loadUrl( url );
		OBJ.objLoader.src = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r131/examples/js/loaders/OBJLoader.js";

	} else {

		OBJ.loadUrl( url );

	}

};






OBJ.onUnZip = function () {

	if ( OBJ.loader === undefined ) {

		OBJ.loader = document.body.appendChild( document.createElement( 'script' ) );
		OBJ.loader.onload = () => OBJ.parse();
		OBJ.loader.src = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r131/examples/js/loaders/OBJLoader.js";

	} else {

		OBJ.parse();

	}

};


OBJ.readFile = function () {

	const reader = new FileReader();
	reader.onload = ( event ) => OBJ.loadUrl( event.target.result );
	reader.readAsDataURL( FRX.file );

};


OBJ.loadUrl = function ( url ) {

	const loader = new THREE.OBJLoader();

	loader.load(
		url,

		function ( object ) {

			//console.log( "object", object );

			COR.reset( object.children );

			THRR.getHtm = THRR.getHtmDefault;

		},

		function ( xhr ) {

			//console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

		},

		function ( error ) {

			console.log( 'An error happened' );

		}
	);

};


OBJ.parse = function() {

	const loader = new THREE.OBJLoader();

	object = loader.parse( FRX.content );

	//console.log( "obj", object );

	COR.reset( object.children );

	THRR.getHtm = THRR.getHtmDefault;

}

OBJ.handle();