// copyright 2021 Theo Armour. MIT license.

const HBJ = {}


HBJ.colors = {

	Wall: "beige",
	Floor: "brown",
	RoofCeiling: "red",
	AirBoundary: "blue"

};


HBJ.read = function ( files ) {

	HBJ.timeStart = performance.now();
	HBJ.files = files;
	HBJ.file = HBJ.files.files[ 0 ];
	HBJ.reader = new FileReader();
	HBJ.reader.onload = ( event ) => HBJ.parse( JSON.parse( event.target.result );
	};

	HBJ.reader.readAsText( HBJ.file );
}



HBJ.init = function ( url ) {

	const xhr = new XMLHttpRequest();
	xhr.responseType = "json";
	xhr.open( "get", url, true );
	xhr.onload = ( xhr ) => HBJ.parse( xhr.target.response );
	xhr.send( null );

};


HBJ.parse = function ( json ) {

	//console.log( "json", json);

	if ( [ "Model", "Building", "Story", "Room2D", "ContextShade" ].includes( json.type ) ) {

		HBJ.processJson( json );

	} else {

		console.log( "No Honeybee 3D data" );

	}

}


HBJ.readHbjson = function ( obj ) {

	console.log( "obj ", obj  );
}


HBJ.processJson = function ( json ) {

	//json = JSON.parse( string );
	console.log( "json", json );

	const roomFaces = json.rooms.map( room => room.faces );
	//console.log( "faces", roomFaces );

	meshes = [];

	roomFaces.forEach( room => room.forEach( face => meshes.push( HBJ.addShape3d( face.geometry.boundary, HBJ.colors[ face.face_type ] ) ) ) );
	//console.log( "boundaries", boundaries );

	// meshes = boundaries.map( boundary => HBJ.addShape3d( boundary ) );
	COR.reset( meshes );

};


HBJ.addShape3d = function ( points, color = 0x888888, holes = [] ) {

	//console.log( "points", color );
	const vertices = points.map( pts => new THREE.Vector3().fromArray( pts ) );
	//console.log( "vv", vertices );
	const geom = new THREE.BufferGeometry().setFromPoints( vertices );
	geom.computeVertexNormals();

	const normal = new THREE.Vector3().fromBufferAttribute( geom.attributes.normal, 0 );

	const normalZ = new THREE.Vector3( 0, 0, 1 ); // base normal of xy-plane

	const quaternion = new THREE.Quaternion().setFromUnitVectors( normal, normalZ );

	const vertices2D = vertices.slice().map( v => v.applyQuaternion( quaternion ) );

	const shape = new THREE.Shape( vertices2D );
	const shapeGeometry = new THREE.ShapeGeometry( shape );
	shapeGeometry.attributes.position = geom.attributes.position;

	//const type = HBJ.itemsTypes[ index ];
	//const color = HBJ.colors[ type ];
	const material = new THREE.MeshPhongMaterial( { color: color, opacity: 0.15, side: 2, specular: 0xffffff, transparent: true } );

	mesh = new THREE.Mesh( shapeGeometry, material );

	// if ( [ "door", "glassdoor", "window" ].includes( type ) ) {

	// 	mesh.renderDepth = 1;
	// 	mesh.position.sub( normal.multiplyScalar( -0.1 ) );

	// }

	line = new THREE.LineLoop( geom, new THREE.LineBasicMaterial( { color: "blue" } ) );


	mesh.add( line );
	mesh.castShadow = true;
	mesh.receiveShadow = true;
	//data = mesh.userData;
	//data.fileName = HBJ.fileName;
	// data.index = index;
	// data.text = HBJ.itemsSurfaces[ index ];
	// data.type = HBJ.itemsTypes[ index ];
	// data.url = HBJ.url;
	// data.zone = HBJ.itemsZones[ index ];

	return mesh;

};
