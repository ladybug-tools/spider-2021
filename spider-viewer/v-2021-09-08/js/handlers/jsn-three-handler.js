// copyright 2021 Theo Armour. MIT license.
/* global THREE, COR*/
// jshint esversion: 6
// jshint loopfunc: true

JSN = {};


JSN.handle = function () {

	console.log( "FRX.content", FRX.content.slice( 0, 100 ) );
	console.log( "FRX.files {...}", FRX.file.name );
	console.log( "FRX.url .../", FRX.url.split( "/" ).pop() );

	if ( FRX.content ) { JSN.onUnZip(); return; }

	if ( FRX.file ) { JSN.read(); return; }

	if ( FRX.url ) { JSN.onChange( FRX.url ); return; }

};




JSN.onUnZip = function () {

	if ( JSN.loader === undefined ) {

		JSN.loader = document.body.appendChild( document.createElement( 'script' ) );
		JSN.loader.onload = () => JSN.parse();
		JSN.loader.src = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r131/examples/js/loaders/ObjectLoader.js";

	} else {

		JSN.parse();

	}

};



JSN.read = function () {

	// if ( JSN.objLoader === undefined ) {

	// 	JSN.objLoader = document.body.appendChild( document.createElement( 'script' ) );
	// 	JSN.objLoader.onload = () => JSN.readFile();
	// 	JSN.objLoader.src = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r131/examples/js/loaders/ObjectLoader.js";

	// } else {

		JSN.readFile( FRX.file );

	//}

};



JSN.readFile = function () {

	const reader = new FileReader();
	reader.onload = ( event ) => JSN.loadUrl( event.target.result );
	reader.readAsDataURL( FRX.file );

};



JSN.onChange = function ( url ) {

	if ( JSN.objLoader === undefined ) {

		JSN.objLoader = document.body.appendChild( document.createElement( 'script' ) );
		JSN.objLoader.onload = () => JSN.loadUrl( url );
		JSN.objLoader.src = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r131/examples/js/loaders/ObjectLoader.js";

	} else {

		JSN.loadUrl( url );

	}
};



JSN.loadUrl = function ( url ) {

	const loader = new THREE.ObjectLoader();

	loader.load(
		url,

		function ( obj ) {

			scene.add( obj );

		},

		function ( xhr ) {

			//console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

		},

		function ( error ) {

			console.log( "error: ", error );

		}
	);


};




JSN.parse = function () {

	const loader = new THREE.OBJLoader();

	JSN.onLoadObj( loader.parse( FRX.content ) );

};



JSN.onLoadObj = function ( group ) {
	//console.log( "object", group );

	const meshes = group.children;

	meshes.forEach( mesh => {

		mesh.rotation.x = Math.PI / 2;

		const box = new THREE.Box3().setFromObject( group );
		const scale = 200 / box.min.distanceTo( box.max );

		mesh.scale.set( scale, scale, scale );

	} );

	COR.reset( meshes );

	THRR.getHtm = THRR.getHtmDefault;

};


JSN.handle();