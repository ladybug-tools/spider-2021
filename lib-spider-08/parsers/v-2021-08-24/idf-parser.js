// copyright 2020 Theo Armour. MIT license.
/* global THREE, COR */
// jshint esversion: 6
// jshint loopfunc: true


IDF = {};

IDF.colors = {
	ceiling: 0xff8080,
	door: 0x00f0000,
	floor: 0x40b4ff,
	glassdoor: 0x8888ff,
	wall: 0xffb400,
	roof: 0x800000,
	roofceiling: 0xaa4444,
	shade: 0x888888,
	window: 0x444444,
	undefined: 0x00ff00,
};

IDF.onChange = function ( url ) {

	const xhr = new XMLHttpRequest();
	xhr.open( "get", url, true );
	xhr.onload = ( xhr ) => IDF.parse( xhr.target.response );
	xhr.send( null );

};


IDF.read = function ( files ) {

	IDF.reader = new FileReader();
	IDF.reader.onload = ( event ) => IDF.parse( event.target.result );
	IDF.reader.readAsText( files.files[ 0 ] );

};


IDF.parse = function ( string ) {
	//console.log( "string",string);

	IDF.string = string;

	const surfaces = IDF.parseType();

	COR.reset( surfaces );

	THRR.getHtm = THRR.getHtmDefault;
	
	//RAY.intersectObjects = meshes;

	//THRU.addText( IDF.items[ 0 ], new THREE.Vector3( THR.axesHelper.position.x, THR.axesHelper.position.y + 5 * THR.radius, THR.axesHelper.position.z + 0.5 * THR.radius ) );

	//VT.init();

};



IDF.parseType = function () {

	IDF.items = IDF.string.split( /\n\n/g );

	if ( IDF.items.length < 3 ) {

		IDF.items = IDF.string.split( /\r\n\r\n/g );

	}
	//console.log( "items", IDF.items );

	IDF.itemsSurfaces = IDF.items.filter( item => item.includes( "Number of Vertices" ) );

	let types = IDF.itemsSurfaces.map( item => item.match( /(.*?)!- Surface Type/ ) || [] );

	IDF.itemsTypes = types.map( typ => typ.length ? typ[ 1 ].split( "," ).shift().trim().toLowerCase() : "shade" );
	//console.log( "IDF.itemsTypes", IDF.itemsTypes);

	IDF.surfaceTypes = [ ...new Set( IDF.itemsTypes ) ];
	//console.log( "surfaceTypes", IDF.surfaceTypes );

	let zones = IDF.itemsSurfaces.map( item => item.match( /(.*?)!- Zone Name/ ) || [] );

	IDF.itemsZones = zones.map( zone => zone.length ? zone[ 1 ].split( "," ).shift().trim() : "shade" );
	//console.log( "IDF.itemsTypes", IDF.itemsTypes);

	IDF.surfaceZones = [ ...new Set( IDF.itemsZones ) ];
	//console.log( "surfaceTypes", IDF.surfaceTypes );

	const coordinates = IDF.itemsSurfaces.map( item => item
		.slice( item.indexOf( "Number of Vertices" ) + 18 ) )
		.map( item => item.replace( /!-(.*?)m}|;/gi, "" ) )
		.map( item => item.split( "," )
			.map( item => + item.trim() )
		);
	//console.log( "coordinates", coordinates[ 9 ] );

	const vertices = coordinates.map( ( points, index ) => {

		const vectors = [];

		for ( let i = 0; i < points.length; i++ ) {
			vectors.push( new THREE.Vector3( points[ i++ ], points[ i++ ], points[ i ] ) );
		}

		if ( vectors.length < 3 ) { console.log( "oops", index, points ); }

		return vectors;

	} );

	const meshes = vertices.map( ( vertices, index ) => IDF.addShape3d( vertices, index ) );
	//console.log( "mesh", meshes );

	return meshes;

};



IDF.addShape3d = function ( vertices, index = 0, holes = [] ) {

	//const vertices = points.map( pts => new THREE.Vector3().fromArray( pts ) );

	const geom = new THREE.BufferGeometry().setFromPoints( vertices );
	geom.computeVertexNormals();

	const normal = new THREE.Vector3().fromBufferAttribute( geom.attributes.normal, 0 );

	const normalZ = new THREE.Vector3( 0, 0, 1 ); // base normal of xy-plane

	const quaternion = new THREE.Quaternion().setFromUnitVectors( normal, normalZ );

	const vertices2D = vertices.slice().map( v => v.applyQuaternion( quaternion ) );

	const shape = new THREE.Shape( vertices2D );
	const shapeGeometry = new THREE.ShapeGeometry( shape );
	shapeGeometry.attributes.position = geom.attributes.position;

	const type = IDF.itemsTypes[ index ];
	const color = IDF.colors[ type ];
	const material = new THREE.MeshPhongMaterial( { color: color, opacity: 0.85, side: 2, specular: 0xffffff, transparent: true } );

	mesh = new THREE.Mesh( shapeGeometry, material );

	if ( [ "door", "glassdoor", "window" ].includes( type ) ) {

		mesh.renderDepth = 1;
		mesh.position.sub( normal.multiplyScalar( -0.1 ) );

	}

	line = new THREE.LineLoop( geom, new THREE.LineBasicMaterial( { color: "blue" } ) );


	mesh.add( line );
	mesh.castShadow = true;
	mesh.receiveShadow = true;
	data = mesh.userData;
	data.fileName = IDF.fileName;
	data.index = index;
	data.text = IDF.itemsSurfaces[ index ];
	data.type = IDF.itemsTypes[ index ];
	data.url = IDF.url;
	data.zone = IDF.itemsZones[ index ];

	return mesh;

};

FRX.handle( IDF );