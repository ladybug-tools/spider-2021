const r3DM = {};

r3DM.init = function ( file ) {

	if ( r3DM.vtkLoader === undefined ) {

		r3DM.vtkLoader = document.body.appendChild( document.createElement( 'script' ) );
		r3DM.vtkLoader.onload = () => r3DM.parseString( file );
		r3DM.vtkLoader.src = "https://cdn.rawgit.com/mrdoob/three.js/r124/examples/js/loaders/3DMLoader.js";

	} else {

		r3DM.parseString( file );

	}

};


r3DM.read3DM = function ( inpFiles ) {

	if ( r3DM.vtkLoader === undefined ) {

		r3DM.vtkLoader = document.body.appendChild( document.createElement( 'script' ) );
		r3DM.vtkLoader.onload = () => r3DM.readFile( inpFiles );
		r3DM.vtkLoader.src = "https://cdn.rawgit.com/mrdoob/three.js/r124/examples/js/loaders/3DMLoader.js";

	} else {

		r3DM.readFile( file );

	}


}


r3DM.readFile = function ( inpFiles ) {

	console.log( "23", inpFiles );
	const reader = new FileReader();

	reader.addEventListener( "load", () => r3DM.loadUrl( reader.result ), false );

	if ( inpFiles.files[ 0 ] ) { reader.readAsDataURL( inpFiles.files[ 0 ] ); }

}


r3DM.loadUrl = function ( url ) {

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




r3DM.parseString = function ( file ) {

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
	//console.log( "r3DM.asset", r3DM.asset );

	//THR.updateScene();

	//THR.zoomObjectBoundingSphere();

};