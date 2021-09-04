const GLTF = {}

GLTF.init = function ( file ) {

	if ( GLTF.gltfLoader === undefined ) {

		GLTF.gltfLoader = document.body.appendChild( document.createElement( 'script' ) );
		GLTF.gltfLoader.onload = () => GLTF.parseString( file );
		GLTF.gltfLoader.src = "https://cdn.rawgit.com/mrdoob/three.js/r124/examples/js/loaders/GLTFLoader.js";

	} else {

		GLTF.parseString( file );

	}

}


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