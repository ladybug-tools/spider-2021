VTK = {};


VTK.onChange = function () {

	if ( VTK.loader === undefined ) {

		VTK.loader = document.body.appendChild( document.createElement( 'script' ) );
		VTK.loader.onload = () => VTK.loadUrl( FRX.url );
		VTK.loader.src = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r131/examples/js/loaders/VTKLoader.js";

	} else {

		VTK.loadUrl( FRX.url );

	}

};

VTK.read = function () {

	if ( VTK.loader === undefined ) {

		VTK.loader = document.body.appendChild( document.createElement( 'script' ) );
		VTK.loader.onload = () => VTK.readFile();
		VTK.loader.src = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r131/examples/js/loaders/VTKLoader.js";

	} else {

		VTK.readFile();

	}

};


VTK.readFile = function () {

	const reader = new FileReader();
	reader.onload = () => VTK.loadUrl( reader.result );
	reader.readAsDataURL( FRX.file );

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

		THRR.getHtm = THRR.getHtmDefault;

	} );

};

FRX.handle( VTK );