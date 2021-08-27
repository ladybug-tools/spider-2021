// copyright 2021 Theo Armour. MIT license.
/* global THREE, COR*/
// jshint esversion: 6
// jshint loopfunc: true

OBJ = {};


OBJ.handle = function () {

	console.log( "FRX.content", FRX.content.slice( 0, 100 ) );
	console.log( "FRX.files ", FRX.file );
	console.log( "FRX.url", FRX.url );

	if ( FRX.content ) { OBJ.onUnZip(); return; }

	if ( FRX.file ) { OBJ.read(); return; }

	if ( FRX.url ) { OBJ.onChange( FRX.url ); return; }

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



OBJ.read = function () {

	if ( OBJ.objLoader === undefined ) {

		OBJ.objLoader = document.body.appendChild( document.createElement( 'script' ) );
		OBJ.objLoader.onload = () => OBJ.readFile();
		OBJ.objLoader.src = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r131/examples/js/loaders/OBJLoader.js";

	} else {

		OBJ.readFile( FRX.file );

	}

};



OBJ.readFile = function () {

	const reader = new FileReader();
	reader.onload = ( event ) => OBJ.loadUrl( event.target.result );
	reader.readAsDataURL( FRX.file );

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



OBJ.loadUrl = function ( url ) {

	const loader = new THREE.OBJLoader();

	loader.load(
		url,

		function ( object ) {

			OBJ.onLoadObj( object );
		},

		function ( xhr ) {

			//console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

		},

		function ( error ) {

			console.log( "error: ", error );

		}
	);


};




OBJ.parse = function () {

	const loader = new THREE.OBJLoader();

		OBJ.onLoadObj( loader.parse( FRX.content ) );

};



OBJ.onLoadObj = function ( object ) {
	//console.log( "object", object );

	object.rotation.x = Math.PI / 2;

	var box = new THREE.Box3().setFromObject( object );
	scale = 200 / box.min.distanceTo( box.max );

	object.scale.set( scale, scale, scale );

	COR.reset( object );

	THRR.getHtm = THRR.getHtmDefault;

};


OBJ.handle();