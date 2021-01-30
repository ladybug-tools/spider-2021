const OBJ = {};


OBJ.loadOBJ = function ( inpFiles ) {

	if ( OBJ.objLoader === undefined ) {

		OBJ.objLoader = document.body.appendChild( document.createElement( 'script' ) );
		OBJ.objLoader.onload = () => OBJ.readFile( inpFiles );
		OBJ.objLoader.src = "https://cdn.rawgit.com/mrdoob/three.js/r124/examples/js/loaders/OBJLoader.js";

	} else {

		OBJ.readFile( file );

	}


};


OBJ.readFile = function ( inpFiles ) {

	const reader = new FileReader();

	reader.addEventListener( "load", () => OBJ.loadUrl( reader.result ), false );

	if ( inpFiles.files[ 0 ] ) { reader.readAsDataURL( inpFiles.files[ 0 ] ); }

};


OBJ.loadUrl = function ( url ) {

	const loader = new THREE.OBJLoader();

	loader.load(
		// resource URL
		url,
		// called when resource is loaded
		function ( object ) {

			THR.group.add( object );

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


OBJ.parseString = function ( file ) {

	console.log( "vtk file", file );

	var meta = THREE.LoaderUtils.decodeText( new Uint8Array( file, 0, 250 ) ).split( '\n' );

	//json = JSON.parse( file );

	console.log( "json", meta );

	const loader = new THREE.VTKLoader();

	geometry = loader.parse( file );

	console.log( "geo", geometry );

	THR.group = THR.getGroupNew();

	geometry.computeVertexNormals();
	geometry.center();

	const material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
	const mesh = new THREE.Mesh( geometry, material );

	mesh.position.set( - 0.025, 0, 0 );
	mesh.scale.multiplyScalar( 0.01 );


	THR.group.add( mesh );

	THR.zoomObjectBoundingSphere();
	//console.log( "OBJ.asset", OBJ.asset );

	//THR.updateScene();

	//THR.zoomObjectBoundingSphere();

};