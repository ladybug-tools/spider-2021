const VTK = {};

VTK.init = function ( file ) {

	if ( VTK.vtkLoader === undefined ) {

		VTK.vtkLoader = document.body.appendChild( document.createElement( 'script' ) );
		VTK.vtkLoader.onload = () => VTK.parseString( file );
		VTK.vtkLoader.src = "https://cdn.rawgit.com/mrdoob/three.js/r124/examples/js/loaders/VTKLoader.js";

	} else {

		VTK.parseString( file );

	}

};


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