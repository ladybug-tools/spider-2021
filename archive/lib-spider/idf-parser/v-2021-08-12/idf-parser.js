// copyright 2020 Theo Armour. MIT license.


const IDF = {};

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


IDF.init = function ( url ) {

	//console.log( "", 23 );

	const xhr = new XMLHttpRequest();
	xhr.crossOrigin = 'anonymous';
	xhr.open( 'GET', url, true );
	xhr.onerror = function ( xhr ) { console.log( 'error:', xhr ); };
	//xhr.onprogress = onRequestFileProgress;
	xhr.onload = (xhr ) => IDF.parseString( xhr.target.response )
	xhr.send( null );


};


IDF.parseString= function ( string ) {
	//console.log( "string",string);

	IDF.string = string;

	//ItoJ.init();

	//detView.open = false;
	//detData.open = false;

	//THR.group = THR.setSceneNew();
	THR.group = THR.getGroupNew();

	//FOO.onProgress(IDF.string.length, "Load complete");

	const surfaces = IDF.parseType();

	if (!surfaces) {
		console.log("no surfaces");
		return;
	}

	THR.group.add(...surfaces.lines, ...surfaces.meshes);


	// //ItoJ.checkZones();


	THR.zoomObjectBoundingSphere();
	// THRU.toggleBoundingBoxHelper();

	//RAY.intersectObjects = surfaces.meshes;

	//THRU.addText( IDF.items[ 0 ], new THREE.Vector3( THR.axesHelper.position.x, THR.axesHelper.position.y + 5 * THR.radius, THR.axesHelper.position.z + 0.5 * THR.radius ) );

	//VT.init();

};



IDF.parseType = function () {

	//console.log( "str", IDF.string );

	IDF.items = IDF.string.split(/\n\n/g);

	if ( IDF.items.length < 3 ) {

		IDF.items = IDF.string.split(/\r\n\r\n/g);

	}
	//console.log( "items", IDF.items );

	IDF.itemsSurfaces = IDF.items.filter( item => item.includes( "Number of Vertices" ) );

	let types = IDF.itemsSurfaces.map( item => item.match( /(.*?)!- Surface Type/ ) || [] )

	IDF.itemsTypes = types.map( typ => typ.length ? typ[ 1 ].split( "," ).shift().trim().toLowerCase() : "shade" );
	//console.log( "IDF.itemsTypes", IDF.itemsTypes);

	IDF.surfaceTypes = [ ...new Set( IDF.itemsTypes  ) ];
	//console.log( "surfaceTypes", IDF.surfaceTypes );

	let zones = IDF.itemsSurfaces.map( item => item.match( /(.*?)!- Zone Name/ ) || [] );

	IDF.itemsZones = zones.map( zone => zone.length ? zone[ 1 ].split( "," ).shift().trim() : "shade" );
	//console.log( "IDF.itemsTypes", IDF.itemsTypes);

	IDF.surfaceZones = [ ...new Set( IDF.itemsZones  ) ];
	//console.log( "surfaceTypes", IDF.surfaceTypes );

	const coordinates = IDF.itemsSurfaces.map( item => item
		.slice( item.indexOf( "Number of Vertices" ) + 18 ) )
		.map( item => item.replace( /!-(.*?)m}|;/gi, "") )
		.map( item => item.split( "," )
		.map( item => + item.trim() )
	);
	//console.log( "coordinates", coordinates[ 9 ] );

	const vertices = coordinates.map( ( points, index ) => {

		const vectors = []

		for ( let i = 0; i < points.length; i++ ) {
			vectors.push( new THREE.Vector3( points[ i ++], points[ i ++], points[ i ] ) );
		}

		if ( vectors.length < 3) { console.log( "oops", index, points );}

		return vectors;

	} );

	const lines = vertices.map((vertices, index) => IDF.drawLine(vertices, index));

	const meshes = vertices.map((vertices, index) =>
		IDF.addShape3d(vertices, index ) );
	//console.log( "mesh", meshes );

	return { meshes, lines };
};

IDF.drawLine = function ( vertices, index, color = "blue" ) {
	//console.log( "verti", vertices );
	const geometry = new THREE.BufferGeometry().setFromPoints( vertices )
	const material = new THREE.LineBasicMaterial({ color: color });
	const line = new THREE.LineLoop(geometry, material);
	line.userData.text = IDF.itemsSurfaces[index];
	line.userData.type = IDF.itemsTypes[ index ];

	//console.log( "line", line );

	return line;
};

IDF.addShape3d = function (vertices, index = 0, holes = []) {

	// if ( !IDF.texture ) {
	// 	IDF.texture= new THREE.TextureLoader().load( "../../assets/textures/white-32.png" );
	// }

	const tempVertices = IDF.getTempVertices(vertices);
	const shape = new THREE.Shape(tempVertices);

	//arr = vertices.map( vertex => vertex.toArray() )

	arr = []

	for ( vertex of vertices ) {

		arr.push( ...vertex.toArray() )
	}
	console.log( "arr", arr );


	// if (holes.length) {
	// 	holes.forEach(hole => {
	// 		shape.holes.push(hole.path);
	// 		vertices = vertices.concat(hole.vertices.reverse());
	// 		console.log( 'vertices', vertices );
	// 	});
	// }

	const shapeGeometry = new THREE.ShapeGeometry( shape );

	//shapeGeometry.attributes.position = arr; // replace tempVertices with original vertices
	//console.log( 'vertices', vertices );
	console.log( "shapeGeometry1", shapeGeometry );

	const type = IDF.itemsTypes[ index ] ;
	//console.log( "type", type );
	const color = IDF.colors[ type ];
	//console.log( "color", color );
	const material = new THREE.MeshPhongMaterial({ color: color, opacity: 0.85, side: 2, specular: 0xffffff, transparent: true });
	// if ( type === "window") {

	// 	//console.log( "type", type );
	// 	//material.displacementMap = IDF.texture;
	// 	// material.polygonOffset = true;
	// 	// material.polygonOffsetFactor = 0.1;
	// }
	mesh = new THREE.Mesh(shapeGeometry, material);

	if ( [ "door", "glassdoor", "window"].includes( type ) ) {

		// mesh.renderDepth = 1;
		// shapeGeometry.computeVertexNormals();
		// console.log( "shapeGeometry", shapeGeometry );
		// const normal = shapeGeometry.faces[ 0 ].normal;
		// mesh.position.sub( normal.multiplyScalar( 0.1 ) );

	}
	mesh.castShadow = true;
	mesh.receiveShadow = true;
	data = mesh.userData;
	data.fileName = IDF.fileName;
	data.index = index;
	data.text = IDF.itemsSurfaces[index];
	data.type = IDF.itemsTypes[ index ];
	data.url = IDF.url;
	data.zone = IDF.itemsZones[ index ];

	return mesh;
};


// https://stackoverflow.com/questions/64963710/three-js-how-to-get-normal-of-rotated-plane

IDF.getTempVertices = function ( vertices ) {

	const triangle = new THREE.Triangle(vertices[2], vertices[1], vertices[0]);
	const normal = triangle.getNormal(new THREE.Vector3());
	const baseNormal = new THREE.Vector3(0, 0, 1);
	const quaternion = new THREE.Quaternion().setFromUnitVectors(normal, baseNormal);

	const tempVertices = vertices.map(vertex => vertex.clone().applyQuaternion(quaternion));

	return tempVertices;
};
