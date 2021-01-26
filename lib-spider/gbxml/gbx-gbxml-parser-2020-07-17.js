const GBX = {};

GBX.colorsDefault = {
	Air: 0xffff00,
	Ceiling: 0xff8080,
	ExposedFloor: 0x40b4ff,
	ExteriorWall: 0xffb400,
	EmbeddedColumn: 0x80806e,
	FreestandingColumn: 0x808080,
	InteriorFloor: 0x80ffff,
	InteriorWall: 0x008000,
	RaisedFloor: 0x4b417d,
	Roof: 0x800000,
	Shade: 0xffce9d,
	SlabOnGrade: 0x804000,
	UndergroundWall: 0xa55200,
	UndergroundSlab: 0x804000,
	UndergroundCeiling: 0x408080,
	Undefined: 0x88888888,
};

GBX.colors = Object.assign({}, GBX.colorsDefault); // create working copy of default colors
GBX.surfaceTypes = Object.keys(GBX.colors);

GBX.init = function() {

	//document.body.addEventListener("onloadFileXml", GBX.onLoad );

	//window.addEventListener( "onloadFRX", GBX.onLoad, false );

};




GBX.parseResponse = function () {
	GBX.string = FOO.string.replace(/[\t\n\r]/gm, "");
	//console.log( 'GBX.string', GBX.string );

	GBX.getElements();

	const meshes = GBX.getSurfaceMeshes(GBX.surfaces);
	//console.log( 'meshes', meshes );
	
	// meshes.forEach( mesh => {

	// 	length = mesh.geometry.faces.length

	// 	if ( length === 0) {

	// 		//console.log( "0 faces", mesh, length );

	// 	}

	// } );

	THR.group.add(...meshes);
};

GBX.getElements = function () {
	const reSurface = /<Surface(.*?)<\/surface>/gi;
	GBX.surfaces = GBX.string.match(reSurface);
	//console.log( 'GBX.surfaces', GBX.surfaces );

	const reSpaces = /<Space(.*?)<\/Space>/gi;
	GBX.spaces= GBX.string.match(reSpaces);
	GBX.spaces = Array.isArray(GBX.spaces) ? GBX.spaces : [];
	//console.log( 'GBX.spaces', GBX.spaces );

	const reStoreys = /<BuildingStorey(.*?)<\/BuildingStorey>/gi;
	GBX.storeys = GBX.string.match(reStoreys);
	GBX.storeys = Array.isArray(GBX.storeys) ? GBX.storeys : [];
	//console.log( 'GBX.storeys', GBX.storeys );

	const reZones = /<Zone(.*?)<\/Zone>/gi;
	GBX.zones = GBX.string.match(reZones);
	GBX.zones = Array.isArray(GBX.zones) ? GBX.zones : [];
	//console.log( 'GBX.zones', GBX.zones );
};

GBX.getSurfaceMeshes = function (surfaces) {
	//console.log( 'GBX.surfaces', surfaces );

	const meshes = surfaces.map((surface, index) => {
		const polyLoops = GBX.getPolyLoops(surface);
		//console.log( 'polyLoops', polyLoops );

		let coordinates = GBX.getCoordinates(polyLoops[0]);
		//console.log( "coordinates", coordinates );

		let verticesSurfaces = [];

		for (let i = 0; i < coordinates.length; ) {
			verticesSurfaces.push(new THREE.Vector3(coordinates[i++], coordinates[i++], coordinates[i++]));
		}

		//verticesSurfaces = THREE.ShapeUtils.isClockWise(verticesSurfaces) ? verticesSurfaces.reverse() : verticesSurfaces;
		//console.log( 'verticesSurfaces', verticesSurfaces );

		const coordinatesArray = polyLoops.slice(1).map(polyLoop => GBX.getCoordinates(polyLoop));
		//console.log( 'coordinates2', coordinates2 );

		const openings = [];

		for (coordinates2 of coordinatesArray) {
			
			const opening = [];

			for (let i = 0; i < coordinates2.length; ) {
				opening.push(
					new THREE.Vector3(coordinates2[i++], coordinates2[i++], coordinates2[i++])
				);
			}

			openings.push(opening);
		}
		//console.log( 'openings', openings );

		let verticesOpenings = GBX.parseOpenings(openings);
		//console.log( 'verticesOpenings', verticesOpenings );

		//verticesOpenings = !THREE.ShapeUtils.isClockWise(verticesOpenings) ? verticesOpenings.reverse() : verticesOpenings;


		const surfaceType = surface.match('surfaceType="(.*?)"')[1];
		const color = new THREE.Color(GBX.colors[surfaceType]);
		//console.log( 'color', color );

		const mesh = GBX.getShape3d(verticesSurfaces, verticesOpenings, color);
		mesh.userData.index = index;
		mesh.userData.type = surfaceType;
		//console.log( 'mesh', mesh );

		return mesh;
	});

	return meshes;
};

GBX.getPolyLoops = function (surface) {
	//console.log( 'surface', surface );

	const re = /<PlanarGeometry(.*?)<polyloop(.*?)<\/polyloop>/gi;
	const polyloopText = surface.match(re);

	//if ( !polyloopText ) { console.log( 'polyloopText', polyloopText, surface ) }

	const polyloops = polyloopText.map(polyloop => polyloop.replace(/<\/?polyloop>/gi, ""));

	return polyloops;
};

GBX.getCoordinates = function (text) {
	const re = /<Coordinate>(.*?)<\/Coordinate>/gi;
	const coordinatesText = text.match(re);
	//console.log( 'coordinatesText', coordinatesText );
	const coordinates = coordinatesText
		.map(coordinate => coordinate.replace(/<\/?coordinate>/gi, ""))
		.map(txt => Number(txt));

	return coordinates;
};

GBX.parseOpenings = function (verticesArray) {
	const holes = [];

	for (vertices of verticesArray) {
		const tempVerticesHoles = GBX.getTempVertices(vertices, "hole");
		//console.log( 'tempVerticesHoles', tempVerticesHoles );

		const path = new THREE.Path(tempVerticesHoles);
		//console.log( 'path', path, vertices );

		holes.push({ path, vertices });
	}

	return holes;
};

GBX.getShape3d = function (vertices = [], holes = [], color = 0xff0000) {
	// if (vertices.length < 3) {
	// 	console.log("vs", vertices);
	// }

	const tempVertices = GBX.getTempVertices(vertices, "shape");

	const shape = new THREE.Shape(tempVertices);

	//console.log( "shape", shape );

	if (holes.length) {

		holes.forEach(hole => {
			shape.holes.push(hole.path);

			vertices = vertices.concat(hole.vertices.reverse());
			//console.log( 'vertices', vertices );
		});
	}

	const shapeGeometry = new THREE.ShapeGeometry(shape);

	if ( shapeGeometry.faces.length === 0 ) {

		// const shapeOrig = new THREE.Shape(tempVertices);

		// //console.log( "shape len 0", shapeOrig );

		// const geometryL = new THREE.Geometry();
		// geometryL.vertices = tempVertices;
		// const materialL = new THREE.LineBasicMaterial( { color: 0x000000 } );
		// const line = new THREE.Line( geometryL, materialL );
		// THR.scene.add( line );
	

		// const triangles = THREE.ShapeUtils.triangulateShape( tempVertices, []);
		// console.log( { triangles } );

		//return  ( new THREE.Mesh() );

	}
	

	shapeGeometry.vertices = vertices;  // THE trick!!

	//bufferGeometry = new THREE.BufferGeometry().fromGeometry( shapeGeometry )

	//const material = new THREE.MeshNormalMaterial( { opacity: 0.7, side: THREE.DoubleSide, transparent: true, wireframe: false } );
	const material = new THREE.MeshPhongMaterial({
		color: color,
		opacity: 0.9,
		side: THREE.DoubleSide,
		transparent: true,
		wireframe: false,
	});

	const mesh = new THREE.Mesh(shapeGeometry, material);

	// const box = new THREE.Box3().setFromObject(mesh);
	// const size = new THREE.Vector3();

	// box.getSize(size);

	// mesh.geometry.faceVertexUvs[0].forEach( fvUvs => {
	// 	fvUvs.forEach(fvUv => {
	// 		fvUv.x = (fvUv.x - box.min.x) / size.x; fvUv.y = 1 - (fvUv.y - box.min.y) / size.y;
	// 	});
	// } );

	
	mesh.geometry.computeVertexNormals();
	mesh.geometry.computeFaceNormals();
	mesh.geometry.computeBoundingBox();
	mesh.geometry.computeBoundingSphere();
	
	mesh.castShadow = true;
	mesh.receiveShadow = true;

	//console.log( "mgeo", mesh.geometry);
	mesh.updateMatrixWorld();

	return mesh;
};

GBX.getTempVertices = function (vertices, type) {
	// try using geometry??
	// let triangle = new THREE.Triangle(vertices[2], vertices[1], vertices[0]);

	// if (triangle.getArea() === 0) {
	// 	//console.log( "", area, vertices );
	// 	triangle = new THREE.Triangle( vertices[ 3 ], vertices[ 1 ], vertices[ 0 ] );
	// }

	const normal = GBX.getNormal( vertices );
	//const normal = triangle.getNormal(new THREE.Vector3());
	const baseNormal = new THREE.Vector3(0, 0, 1);
	const quaternion = new THREE.Quaternion().setFromUnitVectors(normal, baseNormal);

	const tempVertices = vertices.map(vertex => vertex.clone().applyQuaternion(quaternion));
	//console.log( 'tempVertices', tempVertices );

	
	// const cw = THREE.ShapeUtils.isClockWise(tempVertices);
	
	// if ( type === "hole" && cw === false ) { tempVertices.reverse(); }
	
	// if ( type === "shape" && cw === true ) { tempVertices.reverse(); }
	
	//console.log( "isCW tmpV", type, THREE.ShapeUtils.isClockWise( tempVertices) );

	return tempVertices;
};


GBX.getNormal = function( points, start = 0 ) {
	//console.log( 'points', points, start );

	GBX.triangle = ( new THREE.Triangle() ).set( points[ start ], points[ start + 1 ], points[ start + 2 ] );

	if ( GBX.triangle.getArea() === 0 && ( ++start < points.length - 2 ) ) { // looks like points are colinear and do not form a plane therefore try next set of points

		GBX.getNormal( points, start );

	}

	return GBX.triangle.getNormal( new THREE.Vector3() );

};