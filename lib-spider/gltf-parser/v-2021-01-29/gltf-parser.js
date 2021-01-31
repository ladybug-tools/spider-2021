const GLTF = {}

//
GLTF.defaultFile = "../../../3d-models/gltf-sample-files/2021/Box.gltf"

GLTF.init = function ( file ) {

	console.log( "file", file );
	if ( GLTF.gltfLoader === undefined ) {

		GLTF.gltfLoader = document.body.appendChild( document.createElement( 'script' ) );
		GLTF.gltfLoader.onload = () => GLTF.loadUrl( file );
		GLTF.gltfLoader.src = "https://cdn.rawgit.com/mrdoob/three.js/r124/examples/js/loaders/GLTFLoader.js";

	} else {

		GLTF.loadUrl( file );

	}

}


GLTF.readGltf = function ( inpFiles ) {

	if ( GLTF.gltfLoader === undefined ) {

		GLTF.gltfLoader = document.body.appendChild( document.createElement( 'script' ) );
		GLTF.gltfLoader.onload = () => GLTF.readFile( inpFiles );
		GLTF.gltfLoader.src = "https://cdn.rawgit.com/mrdoob/three.js/r124/examples/js/loaders/GLTFLoader.js";

	} else {

		GLTF.readFile( file );

	}


}



GLTF.readFile = function ( inpFiles ) {

	console.log( "23", inpFiles );
	const reader = new FileReader();

	reader.addEventListener( "load", () => GLTF.loadUrl( reader.result ), false );

	if ( inpFiles.files[ 0 ] ) { reader.readAsDataURL( inpFiles.files[ 0 ] ); }

}



GLTF.loadUrl = function ( url = GLTF.defaultFile ) {

	const loader = new THREE.GLTFLoader();

	// Optional: Provide a DRACOLoader instance to decode compressed mesh data
	const dracoLoader = new THREE.DRACOLoader();
	dracoLoader.setDecoderPath( './' );
	loader.setDRACOLoader( dracoLoader );

	// Load a glTF resource
	loader.load(
		// resource URL
		url,
		// called when the resource is loaded
		function ( gl ) {

			gltf = gl;
			console.log( "gltf", gltf );

			if ( chkNewFile.checked ) { THR.group = THR.getGroupNew(); }

			//THR.scene.add( gltf.scene );

			const bbox = new THREE.Box3().setFromObject( gltf.scene.children[ 0 ] );
			//console.log( 'bbox', bbox );

			if ( bbox.max.x !== Infinity ) {
				const sphere = bbox.getBoundingSphere( new THREE.Sphere() );

				THR.center = sphere.center;
				THR.radius = sphere.radius;
				THR.bottom = bbox.min.z;
			}

			if ( THR.radius < 1 ) {

				gltf.scene.children[ 0 ].scale.set( 10 / THR.radius, 10 / THR.radius, 10 / THR.radius );

			}


			THR.group.add( ...gltf.scene.children );

			//THR.zoomObjectBoundingSphere();

			// gltf.animations; // Array<THREE.AnimationClip>
			// gltf.scene; // THREE.Group
			// gltf.scenes; // Array<THREE.Group>
			// gltf.cameras; // Array<THREE.Camera>
			// gltf.asset; // Object

		},
		// called while loading is progressing
		function ( xhr ) {

			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

		},
		// called when loading has errors
		function ( error ) {

			console.log( 'An error happened' );

		}
	);

};

GLTF.parseString = function ( file ) {

	console.log( "gltf file", file );

	//json = JSON.parse( file );

	//console.log( "json", file );

	const loader = new THREE.GLTFLoader();

	loader.parse( file, "../../../3d-models/gltf-sample-files/2021/", GLTF.onLoad )

};

GLTF.onLoad = function ( gltf ) {

	THR.group = THR.getGroupNew();

	THR.scene.add( gltf.scene );

	gltf.animations; // Array<THREE.AnimationClip>
	gltf.scene; // THREE.Group
	gltf.scenes; // Array<THREE.Group>
	gltf.cameras; // Array<THREE.Camera>
	gltf.asset; // Object

	THR.zoomObjectBoundingSphere();
	console.log( "gltf.asset", gltf.asset );

			//THR.updateScene();

			//THR.zoomObjectBoundingSphere();

}