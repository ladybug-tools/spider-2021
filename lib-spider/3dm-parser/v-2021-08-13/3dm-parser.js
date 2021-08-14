// copyright 2021 Theo Armour. MIT license.

const r3DM = {};

r3DM.init = function ( file ) {

	console.log( "file", file );
	
	if ( r3DM.dmLoader === undefined ) {

		r3DM.dmLoader = document.body.appendChild( document.createElement( 'script' ) );
		r3DM.dmLoader.onload = () => r3DM.loadUrl( file );
		r3DM.dmLoader.src = "https://cdn.rawgit.com/mrdoob/three.js/r131/examples/js/loaders/3DMLoader.js";

	} else {

		r3DM.loadUrl( file );

	}

};


r3DM.read3DM = function ( inpFiles ) {

	if ( r3DM.dmLoader === undefined ) {

		r3DM.dmLoader = document.body.appendChild( document.createElement( 'script' ) );
		r3DM.dmLoader.onload = () => r3DM.readFile( inpFiles );
		r3DM.dmLoader.src = "https://cdn.rawgit.com/mrdoob/three.js/r131/examples/js/loaders/3DMLoader.js";

	} else {

		r3DM.readFile( file );

	}


}


r3DM.readFile = function ( inpFiles ) {

	//console.log( "23", inpFiles );
	const reader = new FileReader();

	reader.addEventListener( "load", () => r3DM.loadUrl( reader.result ), false );

	if ( inpFiles.files[ 0 ] ) { reader.readAsDataURL( inpFiles.files[ 0 ] ); }

}


r3DM.loadUrl = function ( url ) {

	const loader = new THREE.Rhino3dmLoader();

	loader.setLibraryPath( 'https://cdn.jsdelivr.net/npm/rhino3dm@0.15.0-beta/' );

	loader.load( url, function ( object ) {

		// console.log( "", geometry );
		// geometry.center();
		// geometry.computeVertexNormals();

		// const material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
		// const mesh = new THREE.Mesh( geometry, material );
		// //mesh.position.set( - 0.075, 0.005, 0 );
		// mesh.scale.multiplyScalar( 50 );
		//scene.add( object );

		COR.reset( object.children );

	} );

}




r3DM.parseString = function ( file ) {

	console.log( "vtk file", file );

	var meta = THREE.LoaderUtils.decodeText( new Uint8Array( file, 0, 250 ) ).split( '\n' );

	//json = JSON.parse( file );

	console.log( "json", meta );

	const loader = new THREE.Rhino3dmLoader();

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

	//console.log( "r3DM.asset", r3DM.asset );

	//THR.updateScene();


};