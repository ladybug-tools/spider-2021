// copyright 2021 Theo Armour. MIT license.
/* global THREE, COR*/
// jshint esversion: 6
// jshint loopfunc: true


STL = {};

STL.handle = function () {

	//console.log( "FRX.content", FRX.content.slice( 0, 500 ) );
	console.log( "FRX.file", FRX.file.name );
	console.log( "FRX.url", FRX.url.split( "/" ).pop() );

	if ( FRX.content ) { STL.onUnZip(); return; }

	if ( FRX.file ) { STL.read(); return; }

	if ( FRX.url ) { STL.onChange( FRX.url ); return; }

};



STL.onUnZip = function () {

	if ( STL.loader === undefined ) {

		STL.loader = document.body.appendChild( document.createElement( 'script' ) );
		STL.loader.onload = () => STL.parse();
		STL.loader.src = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r131/examples/js/loaders/STLLoader.js";

	} else {

		STL.parse();

	}

};




STL.read = function () {

	if ( STL.loader === undefined ) {

		STL.loader = document.body.appendChild( document.createElement( 'script' ) );
		STL.loader.onload = () => STL.readFile();
		STL.loader.src = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r131/examples/js/loaders/STLLoader.js";

	} else {

		STL.readFile();

	}

};


STL.readFile = function ( inpFiles ) {

	const reader = new FileReader();
	reader.onload = () => STL.loadUrl( reader.result );
	reader.readAsDataURL( FRX.file );

};


STL.onChange = function () {

	if ( STL.loader === undefined ) {

		STL.loader = document.body.appendChild( document.createElement( 'script' ) );
		STL.loader.onload = () => STL.loadUrl( FRX.url );
		STL.loader.src = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r131/examples/js/loaders/STLLoader.js";

	} else {

		STL.loadUrl( FRX.url );

	}

};



STL.loadUrl = function ( url ) {

	const loader = new THREE.STLLoader();
	loader.load(

		url,

		( geometry ) => {

			//geometry.rotateX( -0.5 * Math.PI );
			geometry.computeFaceNormals();
			geometry.computeVertexNormals();
			geometry.scale( 0.5, 0.5, 0.5 );
			geometry.center();

			// if ( geometry.hasColors ) {

			const material = new THREE.MeshStandardMaterial( { color: 0xcc8888 } );

			// } else {

			//material = new THREE.MeshNormalMaterial( { side: 2 } );

			//}

			mesh = new THREE.Mesh( geometry, material );
			mesh.castShadow = mesh.receiveShadow = true;

			COR.reset( [ mesh ] );

			THRR.getHtm = THRR.getHtmDefault;

		},

		( xhr ) => console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ),

		( error ) => console.log( 'An error happened', error )

	);

};



STL.parse = function () {

	const loader = new THREE.STLLoader();

	console.log( "FRX.content ", FRX.content.slice( 0, 200 ) );

	loader.parse( FRX.content );

	//console.log( "geometry", geometry );

	// COR.reset( object.children );

	// THRR.getHtm = THRR.getHtmDefault;

}



STL.handle();