VTK = {};


VTK.read = function ( inpFiles ) {

	if ( VTK.vtkLoader === undefined ) {

		VTK.vtkLoader = document.body.appendChild( document.createElement( 'script' ) );
		VTK.vtkLoader.onload = () => VTK.readFile( inpFiles );
		VTK.vtkLoader.src = "https://cdn.jsdelivr.net/npm/three@0.131/examples/js/loaders/VTKLoader.js";

	} else {

		VTK.readFile( file );

	}

};


VTK.readFile = function ( files ) {

	const reader = new FileReader();
	reader.onload = () => VTK.loadUrl( reader.result );
	reader.readAsDataURL( files.files[ 0 ] );

};


VTK.loadUrl = function ( url ) {

	const loader = new THREE.VTKLoader();

	loader.load( url, function ( geometry ) {

		geometry.center();
		geometry.computeVertexNormals();

		const material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
		const mesh = new THREE.Mesh( geometry, material );
		mesh.scale.multiplyScalar( 50 );
		scene.add( mesh );

		COR.reset( [ mesh ] );

	} );

};

if ( FRL.files ) {

	console.log( "FRL.files", FRL.files );
	VTK.read( FRL.files );

}