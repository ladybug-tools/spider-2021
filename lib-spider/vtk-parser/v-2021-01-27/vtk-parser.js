const VTK = {};

VTK.init = function ( url ) {

	//console.log( "", 23 );
	if ( VTK.vtkLoader === undefined ) {

		VTK.vtkLoader = document.body.appendChild( document.createElement( 'script' ) );
		VTK.vtkLoader.onload = () => VTK.loadUrl( url );
		VTK.vtkLoader.src = "https://cdn.rawgit.com/mrdoob/three.js/r124/examples/js/loaders/VTKLoader.js";

	} else {

		VTK.loadUrl( url );

	}

};


VTK.readVTK = function ( inpFiles ) {

	if ( VTK.vtkLoader === undefined ) {

		VTK.vtkLoader = document.body.appendChild( document.createElement( 'script' ) );
		VTK.vtkLoader.onload = () => VTK.readFile( inpFiles );
		VTK.vtkLoader.src = "https://cdn.rawgit.com/mrdoob/three.js/r124/examples/js/loaders/VTKLoader.js";

	} else {

		VTK.readFile( file );

	}


}


VTK.readFile = function ( inpFiles ) {

	console.log( "23", inpFiles );
	const reader = new FileReader();

	reader.addEventListener( "load", () => VTK.loadUrl( reader.result ), false );

	if ( inpFiles.files[ 0 ] ) { reader.readAsDataURL( inpFiles.files[ 0 ] ); }

}


VTK.loadUrl = function ( url ) {

	const loader = new THREE.VTKLoader();

	loader.load( url, function ( geometry ) {

		geometry.center();
		geometry.computeVertexNormals();

		const material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
		const mesh = new THREE.Mesh( geometry, material );
		//mesh.position.set( - 0.075, 0.005, 0 );
		mesh.scale.multiplyScalar( 50 );
		scene.add( mesh );

	} );

}
VTK.parseString = function ( file ) {

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
	//console.log( "VTK.asset", VTK.asset );

	//THR.updateScene();

	//THR.zoomObjectBoundingSphere();

};