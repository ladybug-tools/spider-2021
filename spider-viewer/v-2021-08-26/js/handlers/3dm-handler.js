// copyright 2021 Theo Armour. MIT license.
/* global THREE, COR */
// jshint esversion: 6
// jshint loopfunc: true

r3DM = {};


r3DM.handle = function () {

	//console.log( "FRX.content", FRX.content.slice( 0, 100 ) );
	console.log( "FRX.files ", FRX.file );
	console.log( "FRX.url", FRX.url );

	if ( FRX.content ) { r3DM.onUnZip(); return; }

	if ( FRX.file ) { r3DM.read(); return; }

	if ( FRX.url ) { r3DM.onChange(); return; }

};



r3DM.onUnZip = function () {

	if ( r3DM.loader === undefined ) {

		r3DM.loader = document.body.appendChild( document.createElement( 'script' ) );
		r3DM.loader.onload = () => r3DM.loadDataUrl( FRX.content  );
		r3DM.loader.src = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r131/examples/js/loaders/3DMLoader.js";

	} else {

		r3DM.loadDataUrl( FRX.content  );

	}

};


r3DM.read = function () {

	if ( r3DM.loader === undefined ) {

		r3DM.loader = document.body.appendChild( document.createElement( 'script' ) );
		r3DM.loader.onload = () => r3DM.readFile();
		r3DM.loader.src = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r131/examples/js/loaders/3DMLoader.js";

	} else {

		r3DM.readFile();

	}

};



r3DM.readFile = function () {

	const reader = new FileReader();
	reader.onload = () => r3DM.loadDataUrl( reader.result );
	reader.readAsDataURL( FRX.file );

};



r3DM.onChange = function () {

	if ( r3DM.loader === undefined ) {

		r3DM.loader = document.body.appendChild( document.createElement( 'script' ) );
		r3DM.loader.onload = () => r3DM.loadDataUrl( FRX.url );
		r3DM.loader.src = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r131/examples/js/loaders/3DMLoader.js";

	} else {

		r3DM.loadDataUrl( FRX.url );

	}
};




r3DM.loadDataUrl = function ( url ) {

	const loader = new THREE.Rhino3dmLoader();
	loader.setLibraryPath( 'https://cdn.jsdelivr.net/npm/rhino3dm@0.15.0-beta/' );
	loader.load( url, ( object ) => COR.reset( object.children ) );

};


r3DM.parseContent = function ( content ) {

	console.log( "content", content );
	const loader = new THREE.Rhino3dmLoader();
	loader.setLibraryPath( 'https://cdn.jsdelivr.net/npm/rhino3dm@0.15.0-beta/' );

	//loader.onload( object => COR.reset( object.children ) );
	loader.parse( content, ( object ) => COR.reset( object.children ) )

};


r3DM.handle();