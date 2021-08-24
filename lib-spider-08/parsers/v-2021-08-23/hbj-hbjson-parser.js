// copyright 2021 Theo Armour. MIT license.
/* global THREE, COR */
// jshint esversion: 6
// jshint loopfunc: true

HBJ = {};


HBJ.colors = {

	Wall: "beige",
	Floor: "brown",
	RoofCeiling: "red",
	AirBoundary: "blue"

};


let geometryShades = [];
let geometryApertures = [];


HBJ.handle = function () {

	if ( FRX.files ) { // file reader

		console.log( "FRX.files ", FRX.files );
		HBJ.read( FRX.files );

	} else if ( FRX.url ) { // location hash

		console.log( "", 23 );
		HBJ.onChange( FRX.url );

	}

}

HBJ.read = function ( files ) {

	console.log( "files", files );

	HBJ.reader = new FileReader();
	HBJ.reader.onload = ( event ) => {

		console.log( "files", files );


		HBJ.parse( JSON.parse( event.target.result ) );
	};

	HBJ.reader.onerror = ( event ) => {

		console.log( "event", event );
	};
	HBJ.reader.readAsText( FRX.files.files[ 0 ] );

};


HBJ.onChange = function ( url ) {

	const xhr = new XMLHttpRequest();
	xhr.responseType = "json";
	xhr.open( "get", url, true );
	xhr.onload = ( xhr ) => HBJ.parse( xhr.target.response );
	xhr.send( null );

};


HBJ.parse = function ( json ) {

	HBJ.json = json;

	geometryShades = [];
	geometryApertures = [];

	if ( [ "Model", "Building", "Story", "Room2D", "ContextShade" ].includes( json.type ) ) {

		HBJ.processJson( json );

	} else {

		console.log( "No Honeybee 3D data" );

	}

}


HBJ.processJson = function ( json ) {

	const roomFaces = json.rooms.map( room => room.faces );

	const keys = Object.keys( HBJ.colors );
	HBJ.types = [ geometryWalls = [], geometryFloors = [], geometryRoofCeilings = [], geometryAirBoundaries = [] ];

	roomFaces.forEach( ( room, i ) => room.forEach(
		face => HBJ.types[ keys.indexOf( face.face_type ) ].push( HBJ.addShape3d( face, room, i ) )
	) );

	meshes = [];

	const bufferGeometryWalls = THREE.BufferGeometryUtils.mergeBufferGeometries( geometryWalls, true );
	const materialWalls = new THREE.MeshPhongMaterial( { color: HBJ.colors[ "Wall" ], opacity: 0.85, side: 2, specular: 0xffffff, transparent: true } );
	const meshWalls = new THREE.Mesh( bufferGeometryWalls, materialWalls );
	meshWalls.receiveShadow = meshWalls.castShadow = true;
	meshWalls.name = "Walls";
	meshWalls.userData.geometry = geometryWalls;
	meshes.push( meshWalls );

	const bufferGeometryFloors = THREE.BufferGeometryUtils.mergeBufferGeometries( geometryFloors, true );
	const materialFloors = new THREE.MeshPhongMaterial( { color: HBJ.colors[ "Floor" ], opacity: 0.85, side: 2, specular: 0xffffff, transparent: true } );
	const meshFloors = new THREE.Mesh( bufferGeometryFloors, materialFloors );
	meshFloors.receiveShadow = meshFloors.castShadow = true;
	meshFloors.name = "Floors";
	meshFloors.userData.geometry = geometryFloors;
	meshes.push( meshFloors );

	const bufferGeometryRoofCeilings = THREE.BufferGeometryUtils.mergeBufferGeometries( geometryRoofCeilings, true );
	const materialRoofCeilings = new THREE.MeshPhongMaterial( { color: HBJ.colors[ "Floor" ], opacity: 0.85, side: 2, specular: 0xffffff, transparent: true } );
	const meshRoofCeilings = new THREE.Mesh( bufferGeometryRoofCeilings, materialRoofCeilings );
	meshRoofCeilings.receiveShadow = meshRoofCeilings.castShadow = true;
	meshRoofCeilings.name = "RoofCeilings";
	meshRoofCeilings.userData.geometry = geometryRoofCeilings;
	meshes.push( meshRoofCeilings );

	if ( geometryAirBoundaries.length ) {

		const bufferGeometryAirBoundaries = THREE.BufferGeometryUtils.mergeBufferGeometries( geometryAirBoundaries );
		const materialAirBoundaries = new THREE.MeshPhongMaterial( { color: HBJ.colors[ "Floor" ], opacity: 0.85, side: 2, specular: 0xffffff, transparent: true } );
		const meshAirBoundaries = new THREE.Mesh( bufferGeometryAirBoundaries, materialAirBoundaries );
		meshAirBoundaries.receiveShadow = meshAirBoundaries.castShadow = true;
		meshAirBoundaries.name = "AirBoundaries";
		meshAirBoundaries.userData.geometry = geometryAirBoundaries;
		meshes.push( meshAirBoundaries );

	}

	if ( geometryShades.length ) {

		const bufferGeometryShades = THREE.BufferGeometryUtils.mergeBufferGeometries( geometryShades );
		const materialShades = new THREE.MeshPhongMaterial( { color: 0x888888, opacity: 0.85, side: 2, specular: 0xffffff, transparent: true } );
		const meshShades = new THREE.Mesh( bufferGeometryShades, materialShades );
		meshShades.receiveShadow = meshShades.castShadow = true;
		meshShades.name = "Shades";
		meshShades.userData.geometry = geometryShades;
		meshes.push( meshShades );
	}

	if ( geometryApertures.length ) {

		const bufferGeometryApertures = THREE.BufferGeometryUtils.mergeBufferGeometries( geometryApertures );
		const materialApertures = new THREE.MeshPhongMaterial( { color: 0x888888, opacity: 0.85, side: 2, specular: 0xffffff, transparent: true } );
		const meshApertures = new THREE.Mesh( bufferGeometryApertures, materialApertures );
		meshes.push( new THREE.Mesh( bufferGeometryApertures, materialApertures ) );
		meshApertures.receiveShadow = meshApertures.castShadow = true;
		meshApertures.name = "Apertures";
		meshApertures.userData.geometry = geometryApertures;
		meshes.push( meshApertures );
	}

	COR.reset( meshes );

	THRR.getHtm = HBJ.getHtm
};


HBJ.addShape3d = function ( face, room, index ) {

	shapeGeometry = HBJ.getShape( face.geometry.boundary )
	shapeGeometry.userData.face = face;
	shapeGeometry.userData.room = room;
	shapeGeometry.name = index;

	if ( face.apertures ) {

		const apertures = face.apertures.filter( aperture => aperture.geometry );

		let shapes = apertures.map( shade => HBJ.getShape( shade.geometry.boundary, true ) );

		geometryApertures.push( ...shapes );

		const shades = apertures.filter( aperture => aperture.outdoor_shades );

		shapes = shades.map( shade => HBJ.getShape( shade.geometry.boundary, true ) );

		geometryShades.push( ...shapes );

	}

	return shapeGeometry;

};


HBJ.getArea = function ( contour ) {

	const n = contour.length;
	let a = 0.0;

	for ( let p = n - 1, q = 0; q < n; p = q++ ) {

		a += contour[ p ].x * contour[ q ].y - contour[ q ].x * contour[ p ].y;

	}

	return a * 0.5;
};



HBJ.getShape = function ( points, offset ) {

	const vertices = points.map( pts => new THREE.Vector3().fromArray( pts ) );
	//console.log( "vv", vertices );
	const geometry = new THREE.BufferGeometry().setFromPoints( vertices );

	geometry.computeVertexNormals();

	const normal = new THREE.Vector3().fromBufferAttribute( geometry.attributes.normal, 0 );

	const normalZ = new THREE.Vector3( 0, 0, 1 ); // base normal of xy-plane

	const quaternion = new THREE.Quaternion().setFromUnitVectors( normal, normalZ );

	const vertices2D = vertices.slice().map( v => v.applyQuaternion( quaternion ) );

	const area = HBJ.getArea( vertices2D )
	//console.log( "are", area );

	if ( area < 0 ) {

		vertices2D.reverse();
		//console.log( "reversed", HBJ.getArea( vertices2D ) );
	}

	const shape = new THREE.Shape( vertices2D );
	const shapeGeometry = new THREE.ShapeGeometry( shape );
	shapeGeometry.attributes.position = geometry.attributes.position;
	shapeGeometry.userData.area = area;

	if ( offset ) {

		const trans = normal.multiplyScalar( 0.1 );
		shapeGeometry.translate( trans.x, trans.y, trans.z )

	}

	return shapeGeometry;

};



THRR.bbbbbgetHtm = function ( intersected ) {

	console.log( "intersected", THRR.intersected );
	const mesh = THRR.intersected.object;

	console.log( "intersected", intersected.faceIndex );

	//mesh.geometry.attributes.color.needsUpdate = true;
	console.log( "mesh", mesh );
	const htm = `
<div>
	id: ${ THR.group.children.indexOf( mesh ) }<br>
	geometry: ${ mesh.geometry.type }<br>
	name: ${ mesh.name }</br>
	uuid: ${ mesh.uuid }<br>
	<button onclick=THRR.getMeshData(${ THR.group.children.indexOf( mesh ) }); >view mesh data</button>
</div>`;

	return htm;
};




THRR.xxxgetHtm = function ( intersected ) {
	console.log( "intersected", intersected );

	//if ( !geo ) { geo = new THREE.Geometry().fromBufferGeometry( intersected.object.geometry ); }
	//console.log( "geo", geo );

	let item;
	let index = intersected.faceIndex;

	for ( item = 0; item <= HBJ.json.rooms.length; item++ ) {

		const limit = item * 12;

		if ( index < limit ) { break; }



	}

	htm = `
faceIndex: ${ intersected.faceIndex + 1 }<br>
item: ${ item }<br>
${ intersected.object.geometry.userData.mergedUserData[ item ].room[ 0 ].identifier }
`;

	return htm;

};




HBJ.getHtm = function ( intersected ) {

	//console.log( "intersected", intersected );
	THRR.timeStart = performance.now();
	//scene.updateMatrixWorld();
	const mesh = intersected.object;
	//mesh.updateMatrix();
	//console.log( "mesh", mesh );

	const meshPosition = mesh.geometry.attributes.position;
	const face = intersected.face;
	const vertexA = new THREE.Vector3().fromBufferAttribute( meshPosition, face.a );
	//console.log( "vertex", vertexA );
	const vertexB = new THREE.Vector3().fromBufferAttribute( meshPosition, face.b );
	const vertexC = new THREE.Vector3().fromBufferAttribute( meshPosition, face.c );


	// THRR.geometryLine = new THREE.BufferGeometry().setFromPoints( [ vertexA, vertexB, vertexC] );
	// //geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( 3 * 3 ), 3 ) );

	// THRR.materialLine = new THREE.LineBasicMaterial( { color: 0xffffff, transparent: true } );

	// THR.scene.remove( THRR.line );
	// THRR.line = new THREE.LineLoop( THRR.geometryLine, THRR.materialLine );
	// THR.scene.add( THRR.line );

	//mesh.children.forEach( ( mesh, index ) => {

	const rooms = mesh.userData.geometry;
	//console.log( "mesh", mesh.userData.geometry );


	let index = 0;
	let area = 0;

	for ( let i = 0; i < rooms.length; i++ ) {

		//console.log( "room", i, rooms[ i ] );
		const boundary = rooms[ i ].userData.face.geometry.boundary;

		for ( let j = 0; j < boundary.length; j++ ) {

			const joined = boundary.map( point => point[ 0 ].toFixed( 4 ) );

			if ( joined.includes( vertexA.x.toFixed( 4 ) ) &&
				joined.includes( vertexB.x.toFixed( 4 ) ) &&
				joined.includes( vertexC.x.toFixed( 4 ) )

			) {

				const points = boundary.map( item => new THREE.Vector3().fromArray( item ) );

				THRR.line.geometry.dispose();
				THR.scene.remove( THRR.line );

				THRR.geometryLine = new THREE.BufferGeometry().setFromPoints( points );

				THRR.materialLine = new THREE.LineBasicMaterial( { color: 0xffffff, transparent: true } );

				THRR.line = new THREE.LineLoop( THRR.geometryLine, THRR.materialLine );
				THR.scene.add( THRR.line );

				area = HBJ.getArea( points );
				//console.log( "bingo!", i, boundary, "\n", vertexA, vertexB );
				index = i;
				break;

			}

		}

	}


	let data;

	//console.log( "ms:", ( performance.now() - THRR.timeStart ).toLocaleString() );

	if ( rooms[ index ] ) {

		data = rooms[ index ].userData;
		//console.log( "data", data );

		return `id: ${ index }<br>
type: ${ mesh.name }<br>
area: ${ data.area.toLocaleString() }<br>
name: ${ data.room[ 0 ].display_name }<br>
boundary: ${ data.face.boundary_condition.type }<br>`;

	} else {

		return "Not found. Try again";
	}

};



FRX.handle( HBJ );
