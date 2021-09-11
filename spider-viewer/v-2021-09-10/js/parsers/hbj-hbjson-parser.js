
HBJ.colors = {

	Wall: "beige",
	Floor: "brown",
	RoofCeiling: "red",
	AirBoundary: "blue",
	
	Apertures: "orange",
	Shades: "yellow"

};

//const faceShades = [ "indoorShades", "outdoor-shades" ];

HBJ.parse = function ( json ) {

	HBJ.json = json;
	console.log( "HBJ.json", HBJ.json );

	HBJ.geometryShades = [];
	HBJ.meshes = [];

	HBJ.processOrphanShades();

	HBJ.processRoomFaces();

	COR.reset( HBJ.meshes );

}



HBJ.processOrphanShades = function () {

	HBJ.orphans = [ "orphaned_apertures", "orphaned_doors", "orphaned_faces", "orphaned_shades" ];

	const orphansInUse = HBJ.orphans.filter( schema => HBJ.json[ schema ] && HBJ.json[ schema ].length > 0 );

	orphansInUse.forEach( type => {

		const orphanShades = HBJ.json[ type ];
		//console.log( "orphanShades", type, orphanShades.length );

		orphanShades.forEach( ( shade, i ) => HBJ.geometryShades.push( HBJ.addShape3d( shade, i ) ) );

	} );
	//console.log( "HBJ.geometryShades", HBJ.geometryShades );

	if ( HBJ.geometryShades.length ) {

		const bufferGeometryShades = THREE.BufferGeometryUtils.mergeBufferGeometries( HBJ.geometryShades );
		const materialShades = new THREE.MeshPhongMaterial( { color: 0xffffff, side: 2, specular: 0xffffff, } );
		meshShades = new THREE.Mesh( bufferGeometryShades, materialShades );
		meshShades.name = "Shade";
		HBJ.meshes.push( meshShades );

	}

};





HBJ.processRoomFaces = function () {

	//if ( json.rooms?.length ) {

	const geometryFaces = [];
	const roomFaces = HBJ.json.rooms.map( room => room.faces );

	console.log( "roomFaces", roomFaces );

	roomFaces.forEach( ( room, i ) => room.forEach(
		face => geometryFaces.push( HBJ.addShape3d( face, i ) )
	) );

	if ( geometryFaces.length ) {

		const bufferGeometryShades = THREE.BufferGeometryUtils.mergeBufferGeometries( geometryFaces );
		const materialShades = new THREE.MeshPhongMaterial( { color: 0xffffff, side: 2, specular: 0xffffff, } );
		meshShades = new THREE.Mesh( bufferGeometryShades, materialShades );
		meshShades.name = "Shade";
		HBJ.meshes.push( meshShades );

	}

		// const bufferGeometryWalls = THREE.BufferGeometryUtils.mergeBufferGeometries( HBJ.types[ 0 ], true );
		// const materialWalls = new THREE.MeshPhongMaterial( { color: HBJ.colors[ "Wall" ], opacity: 0.85, side: 2, specular: 0xffffff, transparent: true } );
		// const meshWalls = new THREE.Mesh( bufferGeometryWalls, materialWalls );
		// meshWalls.receiveShadow = meshWalls.castShadow = true;
		// meshWalls.name = "Walls";
		// meshWalls.userData.geometry = geometryWalls;
		// meshes.push( meshWalls );

		// const bufferGeometryFloors = THREE.BufferGeometryUtils.mergeBufferGeometries( geometryFloors, true );
		// const materialFloors = new THREE.MeshPhongMaterial( { color: HBJ.colors[ "Floor" ], opacity: 0.85, side: 2, specular: 0xffffff, transparent: true } );
		// const meshFloors = new THREE.Mesh( bufferGeometryFloors, materialFloors );
		// meshFloors.receiveShadow = meshFloors.castShadow = true;
		// meshFloors.name = "Floors";
		// meshFloors.userData.geometry = geometryFloors;
		// meshes.push( meshFloors );

		// const bufferGeometryRoofCeilings = THREE.BufferGeometryUtils.mergeBufferGeometries( geometryRoofCeilings, true );
		// const materialRoofCeilings = new THREE.MeshPhongMaterial( { color: HBJ.colors[ "Floor" ], opacity: 0.85, side: 2, specular: 0xffffff, transparent: true } );
		// const meshRoofCeilings = new THREE.Mesh( bufferGeometryRoofCeilings, materialRoofCeilings );
		// meshRoofCeilings.receiveShadow = meshRoofCeilings.castShadow = true;
		// meshRoofCeilings.name = "RoofCeilings";
		// meshRoofCeilings.userData.geometry = geometryRoofCeilings;
		// meshes.push( meshRoofCeilings );

		// if ( geometryAirBoundaries.length ) {

		// 	const bufferGeometryAirBoundaries = THREE.BufferGeometryUtils.mergeBufferGeometries( geometryAirBoundaries );
		// 	const materialAirBoundaries = new THREE.MeshPhongMaterial( { color: HBJ.colors[ "Floor" ], opacity: 0.85, side: 2, specular: 0xffffff, transparent: true } );
		// 	const meshAirBoundaries = new THREE.Mesh( bufferGeometryAirBoundaries, materialAirBoundaries );
		// 	meshAirBoundaries.receiveShadow = meshAirBoundaries.castShadow = true;
		// 	meshAirBoundaries.name = "AirBoundaries";
		// 	meshAirBoundaries.userData.geometry = geometryAirBoundaries;
		// 	meshes.push( meshAirBoundaries );

		// }

		// if ( geometryAperturesDoors.length ) {

		// 	const bufferGeometryAperturesDoors = THREE.BufferGeometryUtils.mergeBufferGeometries( geometryAperturesDoors );
		// 	const materialApertures = new THREE.MeshPhongMaterial( { color: 0x888888, opacity: 0.85, side: 2, specular: 0xffffff, transparent: true } );
		// 	const meshApertures = new THREE.Mesh( bufferGeometryAperturesDoors, materialApertures );
		// 	meshes.push( new THREE.Mesh( bufferGeometryAperturesDoors, materialApertures ) );
		// 	meshApertures.receiveShadow = meshApertures.castShadow = true;
		// 	meshApertures.name = "Apertures";
		// 	meshApertures.userData.geometry = geometryAperturesDoors;
		// 	meshes.push( meshApertures );

		// }

		// if ( geometryFaceShades.length ) {

		// 	const bufferGeometryFaceShades = THREE.BufferGeometryUtils.mergeBufferGeometries( geometryFaceShades );
		// 	const materialApertures = new THREE.MeshPhongMaterial( { color: 0x888888, opacity: 0.85, side: 2, specular: 0xffffff, transparent: true } );
		// 	const meshApertures = new THREE.Mesh( bufferGeometryFaceShades, materialApertures );
		// 	meshes.push( new THREE.Mesh( bufferGeometryFaceShades, materialApertures ) );
		// 	meshApertures.receiveShadow = meshApertures.castShadow = true;
		// 	meshApertures.name = "Apertures";
		// 	meshApertures.userData.geometry = geometryFaceShades;
		// 	meshes.push( meshApertures );

		// }

	//}

	//COR.reset( meshes );

	//THRR.getHtm = HBJ.getHtm;

};


HBJ.addShape3d = function ( face, data, index ) {

	shapeGeometry = HBJ.getShape( face.geometry.boundary );
	shapeGeometry.userData.face = face;
	shapeGeometry.name = index;

	// if ( face.apertures ) {

	// 	const apertures = face.apertures.filter( aperture => aperture.geometry );
	// 	let shapeApertures = apertures.map( shade => HBJ.getShape( shade.geometry.boundary, true ) );
	// 	shapeApertures.map( shape => shape.userData.face = face );
	// 	geometryAperturesDoors.push( ...shapeApertures );

	// 	const faceShades = apertures.filter( aperture => aperture.indoor_shades || aperture.outdoor_shades );
	// 	//console.log( "faceShades", faceShades );
	// 	shapeFaceShades = faceShades.map( shade => HBJ.getShape( shade.geometry.boundary, true ) );
	// 	shapeFaceShades.map( shape => shape.userData.face = face );
	// 	geometryFaceShades.push( ...shapeFaceShades );

	// }

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

	const area = HBJ.getArea( vertices2D );
	//console.log( "are", area );

	if ( area < 0 ) {  // a < 0: vertices are clockwise, need CCW

		vertices2D.reverse();
		//console.log( "reversed", HBJ.getArea( vertices2D ) );
	}

	const shape = new THREE.Shape( vertices2D );
	const shapeGeometry = new THREE.ShapeGeometry( shape );
	shapeGeometry.attributes.position = geometry.attributes.position;
	shapeGeometry.userData.area = area;

	if ( offset ) {

		const trans = normal.multiplyScalar( 0.1 );
		shapeGeometry.translate( trans.x, trans.y, trans.z );

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
	mesh = intersected.object;
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

	console.log( "mesh", mesh );
	//const faces = mesh.userData.geometry;

	let index = 0;
	let area = 0;
	let items;

	let geo = mesh.userData.geometry;

	if ( geo?.length ) {

		items = geo.map( geo => geo.userData );

	} else {

		items = mesh.geometry.userData.mergedUserData;

	}

	//console.log( "items", items );

	for ( let i = 0; i < items.length; i++ ) {

		const item = items[ i ];
		//console.log( "item", item );

		const boundary = item.face.geometry.boundary;
		//console.log( "boundary", boundary );

		for ( let j = 0; j < boundary.length; j++ ) {

			const joined = boundary.map( point => point[ 0 ].toFixed( 4 ) );

			if ( joined.includes( vertexA.x.toFixed( 4 ) ) &&
				joined.includes( vertexB.x.toFixed( 4 ) ) &&
				joined.includes( vertexC.x.toFixed( 4 ) )

			) {

				const points = boundary.map( item => new THREE.Vector3().fromArray( item ) );

				THRR.line.geometry.dispose();
				THR.group.remove( THRR.line );

				THRR.geometryLine = new THREE.BufferGeometry().setFromPoints( points );

				THRR.materialLine = new THREE.LineBasicMaterial( { color: "magenta", transparent: false } );

				THRR.line = new THREE.LineLoop( THRR.geometryLine, THRR.materialLine );
				THRR.line.name = "THR.linePopUp";

				THR.group.add( THRR.line );

				area = HBJ.getArea( points );

				console.log( "bingo!", i, boundary, "\n", vertexA, vertexB );
				index = i;

				break;

			}

		}

	}


	let item;

	//console.log( "ms:", ( performance.now() - THRR.timeStart ).toLocaleString() );

	if ( items[ index ] ) {

		item = items[ index ];
		console.log( "item", item );

		return `id: ${ index }<br>
type: ${ mesh.name }<br>
area: ${ item.area.toLocaleString() }<br>
name: ${ item.face.identifier }<br>
boundary: ${ item.face.boundary_condition?.type }<br>`;

	} else {

		return "Not found. Try again";
	}

};



// faces = [];
// shades = [];

// HBJ.traverse = function ( o = HBJ.json ) {

// 	let type = typeof o;
// 	if ( type == "object" ) {
// 		for ( let key in o ) {
// 			if ( key === "faces" ) {
// 				faces = o[ key ];
// 				console.log( "key: ", faces );
// 				if ( faces[ 0 ].face_type ) { faces.push( o[ key ] ); };
// 			}

// 			HBJ.traverse( o[ key ] );
// 		}
// 	}

// };

// HBJ.traverse2 = function ( o = HBJ.json ) {

// 	let type = typeof o;
// 	if ( type == "object" ) {
// 		for ( let key in o ) {
// 			if ( key === "Shade" ) {
// 				shade = o[ key ];
// 				console.log( "key: ", shade );
// 				//if ( faces[ 0 ].face_type ) { faces.push( o[ key ] ); };
// 			}

// 			HBJ.traverse2( o[ key ] );
// 		}
// 	}

// };