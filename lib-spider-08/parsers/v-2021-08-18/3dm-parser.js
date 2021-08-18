// copyright 2021 Theo Armour. MIT license.

const r3DM = {};


// File Reader method

r3DM.read3DM = function ( inpFiles ) {

	if ( r3DM.dmLoader === undefined ) {

		r3DM.dmLoader = document.body.appendChild( document.createElement( 'script' ) );
		r3DM.dmLoader.onload = () => r3DM.readFile( inpFiles );
		r3DM.dmLoader.src = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r131/examples/js/loaders/3DMLoader.js";

	} else {

		r3DM.readFile( inpFiles );

	}

};


r3DM.readFile = function ( inpFiles ) {

	const reader = new FileReader();

	reader.addEventListener( "load", () => r3DM.loadDataUrl( reader.result ), false );

	if ( inpFiles.files[ 0 ] ) { reader.readAsDataURL( inpFiles.files[ 0 ] ); }

};


r3DM.loadDataUrl = function ( url ) {

	const loader = new THREE.Rhino3dmLoader();

	loader.setLibraryPath( 'https://cdn.jsdelivr.net/npm/rhino3dm@0.15.0-beta/' );

	loader.load( url, ( object ) => COR.reset( object.children ) );

};


