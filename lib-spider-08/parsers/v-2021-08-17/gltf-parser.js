// copyright 2021 Theo Armour. MIT license.

const GLTF = {};


GLTF.readGltf = function ( inpFiles ) {

	if ( GLTF.gltfLoader === undefined ) {

		GLTF.gltfLoader = document.body.appendChild( document.createElement( 'script' ) );
		GLTF.gltfLoader.onload = () => GLTF.readFile( inpFiles );
		GLTF.gltfLoader.src = "https://cdn.rawgit.com/mrdoob/three.js/r131/examples/js/loaders/GLTFLoader.js";

	} else {

		GLTF.readFile( inpFiles );

	}

};



GLTF.readFile = function ( inpFiles ) {

	//console.log( "inpFiles", inpFiles );
	const reader = new FileReader();

	reader.addEventListener( "load", () => GLTF.loadDataUrl( reader.result ), false );

	if ( inpFiles.files[ 0 ] ) { reader.readAsDataURL( inpFiles.files[ 0 ] ); }

};



GLTF.loadDataUrl = function ( url = GLTF.defaultFile ) {

	const loader = new THREE.GLTFLoader();

	const dracoLoader = new THREE.DRACOLoader();
	dracoLoader.setDecoderPath( './' );
	loader.setDRACOLoader( dracoLoader );

	loader.load(
		url,
		( gl ) => {

			gltf = gl;
			//console.log( "gltf", gltf );

			const bbox = new THREE.Box3().setFromObject( gltf.scene.children[ 0 ] );

			if ( bbox.max.x !== Infinity ) {
				const sphere = bbox.getBoundingSphere( new THREE.Sphere() );

				THR.center = sphere.center;
				THR.radius = sphere.radius;
				THR.bottom = bbox.min.z;
			}

			if ( THR.radius < 1 ) {

				gltf.scene.children[ 0 ].scale.set( 10 / THR.radius, 10 / THR.radius, 10 / THR.radius );

			}

			COR.reset( gltf.scene.children );

		},

		( xhr ) => {

			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

		},

		( error ) => {

			console.log( 'An error happened', error );

		}
	);

};