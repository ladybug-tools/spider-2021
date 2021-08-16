const IFC = {};

IFC.init = function ( url ) {

	if ( IFC.ifcLoader === undefined ) {

		IFC.ifcLoader = document.body.appendChild( document.createElement( 'script' ) );
		IFC.ifcLoader.onload = () => IFC.loadUrl( url );
		IFC.ifcLoader.src = "https://cdn.rawgit.com/mrdoob/three.js/r131/examples/js/loaders/OBJLoader.js";

	} else {

		IFC.loadUrl( url );

	}


};

IFC.loadIFC = function ( inpFiles ) {

	if ( IFC.ifcLoader === undefined ) {

		IFC.ifcLoader = document.body.appendChild( document.createElement( 'script' ) );
		IFC.ifcLoader.onload = () => IFC.readFile( inpFiles );
		IFC.ifcLoader.src = "https://cdn.rawgit.com/mrdoob/three.js/r131/examples/jsm/loaders/IFCLoader.js";

	} else {

		IFC.readFile( file );

	}


};


IFC.readFile = function ( inpFiles ) {

	const reader = new FileReader();

	reader.addEventListener( "load", () => IFC.loadUrl( reader.result ), false );

	if ( inpFiles.files[ 0 ] ) { reader.readAsDataURL( inpFiles.files[ 0 ] ); }

};


IFC.loadUrl = function ( url ) {

	const loader = new THREE.ifcLoader();

	loader.load(
		// resource URL
		url,
		// called when resource is loaded
		function ( object ) {

			//THR.group.add( object );

			console.log( "object", object );

			COR.reset( object.children );


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


IFC.parseString = function ( file ) {

	console.log( "vtk file", file );

	var meta = THREE.LoaderUtils.decodeText( new Uint8Array( file, 0, 250 ) ).split( '\n' );

	//json = JSON.parse( file );

	console.log( "json", meta );

	const loader = new THREE.VTKLoader();

	geometry = loader.parse( file );

	console.log( "geo", geometry );

	//THR.group = THR.getGroupNew();

	geometry.computeVertexNormals();
	geometry.center();

	const material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
	const mesh = new THREE.Mesh( geometry, material );

	mesh.position.set( - 0.025, 0, 0 );
	mesh.scale.multiplyScalar( 0.01 );

	COR.reset( [ mesh ] );
	//console.log( "IFC.asset", IFC.asset );

	//THR.updateScene();

	//THR.zoomObjectBoundingSphere();

};