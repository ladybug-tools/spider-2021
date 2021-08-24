// copyright 2021 Theo Armour. MIT license.
/* global THREE, COR */
// jshint esversion: 6
// jshint loopfunc: true

r3DM = {};

r3DM.handle = function () {

	if ( FRX.files ) {

		r3DM.read( FRX.files );
		console.log( "FRX.files ", FRX.files );

	} else if ( FRX.url ) {

		r3DM.onChange( FRX.url );
		console.log( "FRX.url", FRX.url );

	}

};

r3DM.onChange = function ( url ) {

	if ( r3DM.loader === undefined ) {

		r3DM.loader = document.body.appendChild( document.createElement( 'script' ) );
		r3DM.loader.onload = () => r3DM.loadDataUrl( url );
		r3DM.loader.src = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r131/examples/js/loaders/3DMLoader.js";

	} else {

		r3DM.loadDataUrl( url );

	}
};


r3DM.read = function ( inpFiles ) {

	if ( r3DM.loader === undefined ) {

		r3DM.loader = document.body.appendChild( document.createElement( 'script' ) );
		r3DM.loader.onload = () => r3DM.readFile( inpFiles );
		r3DM.loader.src = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r131/examples/js/loaders/3DMLoader.js";

	} else {

		r3DM.readFile( inpFiles );

	}

};



r3DM.readFile = function ( inpFiles ) {

	const reader = new FileReader();
	reader.onload = () => r3DM.loadDataUrl( reader.result );
	reader.readAsDataURL( inpFiles.files[ 0 ] );

};


r3DM.loadDataUrl = function ( url ) {

	const loader = new THREE.Rhino3dmLoader();
	loader.setLibraryPath( 'https://cdn.jsdelivr.net/npm/rhino3dm@0.15.0-beta/' );
	loader.load( url, ( object ) => COR.reset( object.children ) );

};


console.log( "r3DM", r3DM );

r3DM.handle();