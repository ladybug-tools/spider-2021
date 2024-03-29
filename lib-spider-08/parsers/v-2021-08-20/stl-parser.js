// copyright 2021 Theo Armour. MIT license.
/* global THREE, COR*/
// jshint esversion: 6
// jshint loopfunc: true


STL = {};

STL.onChange = function ( url ) {

	if ( STL.loader === undefined ) {

		STL.loader = document.body.appendChild( document.createElement( 'script' ) );
		STL.loader.onload = () => STL.loadUrl( url );
		STL.loader.src = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r131/examples/js/loaders/STLLoader.js";

	} else {

		STL.loadUrl( url );

	}

};

STL.read = function ( inpFiles ) {

	if ( STL.loader === undefined ) {

		STL.loader = document.body.appendChild( document.createElement( 'script' ) );
		STL.loader.onload = () => STL.readFile( inpFiles );
		STL.loader.src = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r131/examples/js/loaders/STLLoader.js";

	} else {

		STL.readFile( inpFiles );

	}

};


STL.readFile = function ( inpFiles ) {

	const reader = new FileReader();
	reader.onload = () => STL.loadUrl( reader.result );
	reader.readAsDataURL( inpFiles.files[ 0 ] );

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

		},

		( xhr ) => console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ),

		( error ) => console.log( 'An error happened', error )

	);

};

FRX.handle( STL );