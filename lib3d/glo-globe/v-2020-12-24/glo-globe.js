// copyright 2020 Theo Armour. MIT license.


const GLO = {
	globe: undefined,
	size: 50,
	url: "../../../lib3d/assets/bitmaps/natural-earth-4096-2048-col.jpg",
	urlHeightmap: "../../../lib3d/assets/bitmaps/bathymetry_bw_composite_2k.png"

};



GLO.initGlobeWithBitmap = function () {

	GLO.timeStart = performance.now();

	scene.remove( GLO.globe );

	const geometry = new THREE.SphereBufferGeometry( GLO.size, 32, 32 );
	geometry.applyMatrix4( new THREE.Matrix4().makeRotationX( 0.5 * Math.PI ) );

	const loader = new THREE.TextureLoader();
	const texture = loader.load( GLO.url );
	const material = new THREE.MeshBasicMaterial( {
		map: texture
	} );

	GLO.globe = new THREE.Mesh( geometry, material );
	GLO.globe.matrixAutoUpdate = false;
	GLO.globe.name = "globeBitmap";

	scene.add( GLO.globe );

	GLO.timeEnd = performance.now();

	//console.log( "msGlo", GLO.timeEnd - GLO.timeStart );

};



GLO.setGlobeElevation3D = function ( value = 50 ) {

	GLO.timeStart = performance.now();

	const scale = + value / 5;

	//if ( GLO.globe.name === "globeFlat" ) {

	scene.remove( GLO.globe );

	const geometry = new THREE.SphereBufferGeometry( GLO.size, 2048, 1024 );
	geometry.applyMatrix4( new THREE.Matrix4().makeRotationX( 0.5 * Math.PI ) );

	const loader = new THREE.TextureLoader();
	const texture = loader.load( GLO.url );
	const heightmap = loader.load( GLO.urlHeightmap, );
	const material = new THREE.MeshPhongMaterial( {
		map: texture,
		displacementMap: heightmap,
		displacementScale: scale
	} );

	GLO.globe = new THREE.Mesh( geometry, material );
	GLO.globe.matrixAutoUpdate = false;
	GLO.globe.name = "globeElevation";


	const geometrySea = new THREE.SphereBufferGeometry( GLO.size + 5.5, 25, 25 );
	const materialSea = new THREE.MeshNormalMaterial( { opacity: 0.7, transparent: true } );
	const globeSea = new THREE.Mesh( geometrySea, materialSea );
	GLO.globe.add( globeSea );

	scene.add( GLO.globe );

	GLO.timeEnd = performance.now();

	//console.log( "msGlo", GLO.timeEnd - GLO.timeStart );

	// } else {

	// 	GLO.globe.material.displacementScale = scale;

	// }

};
