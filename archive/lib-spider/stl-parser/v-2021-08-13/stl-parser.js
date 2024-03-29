const STL = {};


STL.init = function ( url ) {

	if ( STL.stlLoader === undefined ) {

		STL.stlLoader = document.body.appendChild( document.createElement( 'script' ) );
		STL.stlLoader.onload = () => STL.loadUrl( url );
		STL.stlLoader.src = "https://cdn.rawgit.com/mrdoob/three.js/r131/examples/js/loaders/STLLoader.js";

	} else {

		STL.loadUrl( url );

	}


};

STL.loadSTL = function ( inpFiles ) {

	if ( STL.stlLoader === undefined ) {

		STL.stlLoader = document.body.appendChild( document.createElement( 'script' ) );
		STL.stlLoader.onload = () => STL.readFile( inpFiles );
		STL.stlLoader.src = "https://cdn.rawgit.com/mrdoob/three.js/r131/examples/js/loaders/STLLoader.js";

	} else {

		STL.readFile( file );

	}


};


STL.readFile = function ( inpFiles ) {

	const reader = new FileReader();

	reader.addEventListener( "load", () => STL.loadUrl( reader.result ), false );

	if ( inpFiles.files[ 0 ] ) { reader.readAsDataURL( inpFiles.files[ 0 ] ); }

};


STL.loadUrl = function ( url ) {

	const loader = new THREE.STLLoader();

	loader.load(
		// resource URL
		url,
		// called when resource is loaded
		function ( geometry ) {

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

			//scene.remove( mesh );
			mesh = new THREE.Mesh( geometry, material );
			mesh.castShadow = mesh.receiveShadow = true;
			//THR.group.add( mesh );

			//divMessage.innerHTML = `name: ${ fileName }`;

			COR.reset( [ mesh ] );

		},
		// called when loading is in progresses
		function ( xhr ) {

			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

		},
		// called when loading has errors
		function ( error ) {

			console.log( 'An error happened' );

		}
	);

};
