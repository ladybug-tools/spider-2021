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

GBX.colors = Object.assign( {}, GBX.colorsDefault ); // create working copy of default colors
GBX.surfaceTypes = Object.keys( GBX.colors );
GBX.opacity = 0.85;

GBX.triangle = new THREE.Triangle(); // used by GBX.getPlane
GBX.referenceObject = new THREE.Object3D();
GBX.parser = new DOMParser();




GBX.init = function () {

	GBX.string = FOO.string.replace( /[\t\n\r]/gm, "" );

	GBX.surfaces = GBX.string.match( /<Surface(.*?)<\/surface>/gi );

	GBX.meshes = GBX.getSurfaceMeshes();
	//console.log( 'meshes', GBX.meshes );

	THR.group.add( ...GBX.meshes );

	//GBX.doit();

	console.log( "gbx init", performance.now() - FOO.timeStart );

	//showPaintTimings();

};

GBX.doit = function() {

	GBX.xml = GBX.parser.parseFromString( GBX.string, "application/xml" ).documentElement;

}

function showPaintTimings () {

	if ( window.performance ) {
		let performance = window.performance;
		let performanceEntries = performance.getEntriesByType( 'paint' );
		performanceEntries.forEach( ( performanceEntry, i, entries ) => {
			console.log( "The time to " + performanceEntry.name + " was " + performanceEntry.startTime + " milliseconds." );
		} );
	} else {
		console.log( 'Performance timing isn\'t supported.' );
	}
}

GBX.getSurfaceMeshes = function () {
	// console.log( 'surfaces', surfaces );

	GBX.materialType = THR.scene.getObjectByName( 'lightAmbient' ) ?
		THREE.MeshPhongMaterial : THREE.MeshBasicMaterial;
	//GBX.materialType = THREE.MeshBasicMaterial;

	const getCoordinates = text => text.match( /<Coordinate>(.*?)<\/Coordinate>/gi ).map( coordinate => + coordinate.replace( /<\/?coordinate>/gi, "" ) );

	const meshes = GBX.surfaces.map( ( surface, index ) => {

		const polyloops = surface.match( /<PlanarGeometry(.*?)<polyloop(.*?)<\/polyloop>/gi )
			.map( polyloop => polyloop.replace( /<\/?polyloop>/gi, "" ) );

		const coordinates = getCoordinates( polyloops[ 0 ] );

		const openings = polyloops.slice( 1 ).map( polyLoop => getCoordinates( polyLoop ) );

		const mesh = GBX.getSurfaceMesh( coordinates, index, openings );

		return mesh;

	} );

	return meshes;

};



GBX.getSurfaceMesh = function ( arr, index, holes ) {
	//console.log( 'array', arr, 'index', index );

	const surface = GBX.surfaces[ index ];

	const v = arr => new THREE.Vector3().fromArray( arr );
	let geometry;

	if ( arr.length < 10 ) {

		const points = [ v( arr.slice( 0, 3 ) ), v( arr.slice( 3, 6 ) ), v( arr.slice( 6 ) ) ];

		geometry = GBX.getBufferGeometry( points );

	} else if ( arr.length === 12 && holes.length === 0 ) {

		const points = [

			v( arr.slice( 0, 3 ) ), v( arr.slice( 3, 6 ) ), v( arr.slice( 6, 9 ) ),
			v( arr.slice( 0, 3 ) ), v( arr.slice( 6, 9 ) ), v( arr.slice( 9, 12 ) )

		];

		geometry = GBX.getBufferGeometry( points );

	} else {

		const points = [];

		for ( let i = 0; i < ( arr.length / 3 ); i++ ) {

			points.push( v( arr.slice( 3 * i, 3 * i + 3 ) ) );

		}

		const pointsHoles = holes.map( hole => {

			const points = [];

			for ( let i = 0; i < ( hole.length / 3 ); i++ ) {

				points.push( v( hole.slice( 3 * i, 3 * i + 3 ) ) );

			}

			return points;

		} );

		geometry = GBX.getBufferGeometryShape( points, pointsHoles );

	}

	const surfaceType = surface.match( 'surfaceType="(.*?)"' )[ 1 ];
	const color = new THREE.Color( GBX.colors[ surfaceType ] );
	const material = new GBX.materialType( { color: color, opacity: GBX.opacity, side: 2, transparent: true } );

	const mesh = new THREE.Mesh( geometry, material );
	mesh.castShadow = mesh.receiveShadow = true;
	mesh.userData.index = index;
	mesh.userData.surfaceType = surfaceType;

	return mesh;

};



GBX.getBufferGeometry = function ( points ) {

	const geometry = new THREE.BufferGeometry().setFromPoints( points );
	geometry.computeVertexNormals();
	return geometry;

};



GBX.getBufferGeometryShape = function ( points, holes = [] ) {

	//assume points are coplanar but at an arbitrary rotation and position in space
	const normal = GBX.getNormal( points );

	// rotate points to lie on XY plane
	GBX.referenceObject.lookAt( normal ); // copy the rotation of the plane
	GBX.referenceObject.quaternion.conjugate(); // figure out the angle it takes to rotate the points so they lie on the XY plane
	GBX.referenceObject.updateMatrixWorld();

	const pointsFlat = points.map( point => GBX.referenceObject.localToWorld( point ) );
	const holesFlat = holes.map( pointsHoles => pointsHoles.map( point => GBX.referenceObject.localToWorld( point ) ) );

	// points must be coplanar with the XY plane for Earcut.js to triangulate a set of points
	const triangles = THREE.ShapeUtils.triangulateShape( pointsFlat, holesFlat );
	const pointsAll = points.slice( 0 ).concat( ...holesFlat );
	const pointsTriangles = [];

	for ( let triangle of triangles ) {

		for ( let i = 0; i < 3; i++ ) {

			const point = pointsAll[ triangle[ i ] ];

			pointsTriangles.push( point );

		}

	}
	//console.log( { pointsTriangles } );

	const geometry = new THREE.BufferGeometry();
	geometry.setFromPoints( pointsTriangles );
	geometry.lookAt( normal );
	geometry.computeVertexNormals();

	return geometry;

};



GBX.getNormal = function ( points, start = 0 ) {
	//console.log( 'points', points, start );

	GBX.triangle.set( points[ start ], points[ start + 1 ], points[ start + 2 ] );

	if ( GBX.triangle.getArea() === 0 && ( ++start < points.length - 2 ) ) { // looks like points are colinear and do not form a plane therefore try next set of points

		GBX.getNormal( points, start );

	}

	return GBX.triangle.getNormal( new THREE.Vector3() );

};


//////////


GBX.toggleSpaceTitles = function () {

	if ( !GBX.texts ) {

		const floors = GBX.meshes.filter( mesh => [ "InteriorFloor", "RaisedFloor", "SlabOnGrade" ].includes( mesh.userData.surfaceType ) );
		//console.log( "floors", floors );

		const spaceNames = floors.map( floor => floor.userData.spaceName );
		//console.log( "spaceNames", spaceNames );
		//.map( id => Array.isArray( id ) ? id[ 0 ][ "@attributes" ].spaceIdRef : id[ "@attributes" ].spaceIdRef );

		GBX.texts = floors.map( ( floor, i ) => floor.add( THRU.drawPlacard( spaceNames[ i ], THR.radius / 2000, 0xffffff,
			floor.geometry.boundingSphere.center.add( new THREE.Vector3( 0, 0, 2 ) ) ) ) );

		return;

	}

	GBX.texts.forEach( child => child.visible = !child.visible );

};


GBX.setSurfacesMetadata = function () {

	const timeStart = performance.now();

	//GBX.xml = GBX.parser.parseFromString( GBX.string, "application/xml" ).documentElement;

	const typesArr = GBX.surfaces.map( surface => surface.match( /surfaceType="(.*?)"/ )[ 1 ] );
	GBX.surfaceTypes = [ ... new Set( typesArr ) ];
	//console.log( "GBX.surfaceTypes ", GBX.surfaceTypes  );

	GBX.spaces = GBX.string.match( /<Space(.*?)<\/Space>/gi );
	GBX.spaces = Array.isArray( GBX.spaces ) ? GBX.spaces : [];
	//console.log( "GBX.spaces", GBX.spaces );

	GBX.spaceNames = GBX.spaces.map( space => space.match( /<Name>(.*?)<\/Name>/i )[ 1 ] );
	GBX.spaceIds = GBX.spaces.map( space => space.match( / id="(.*?)"/i )[ 1 ] );
	//console.log( "spaceIds", GBX.spaceIds );

	GBX.storeys = GBX.string.match( /<BuildingStorey(.*?)<\/BuildingStorey>/gi );
	GBX.storeys = Array.isArray( GBX.storeys ) ? GBX.storeys : [];
	//console.log( 'GBX.storeys', GBX.storeys );

	GBX.storeyNames = GBX.storeys.map( storey => storey.match( /<Name>(.*?)<\/Name>/i )[ 1 ] );
	GBX.storeyIds = GBX.storeys.map( storey => storey.match( / id="(.*?)"/i )[ 1 ] );
	//console.log( "storeyNames", GBX.storeyNames );


	GBX.zones = GBX.string.match( /<Zone(.*?)<\/Zone>/gi );
	GBX.zones = GBX.zones || [];
	GBX.zones = Array.isArray( GBX.zones ) ? GBX.zones : [];
	//console.log( 'GBX.zones', GBX.zones );

	GBX.zoneIds = GBX.zones.map( zone => zone.match( /id="(.*?)"/i )[ 1 ] );
	GBX.zoneNames = GBX.zones.map( zone => zone.match( /<Name>(.*?)<\/Name>/i )[ 1 ] );

	GBX.CADObjectIds = GBX.surfaces.map( surface => surface.match( /<CADObjectId>(.*?)<\/CADObjectId>/i ) );
	//console.log( "GBX.CADObjectIds", GBX.CADObjectIds );

	GBX.CADObjectIds = GBX.CADObjectIds.map( text => text ? text : [ "", "" ] ).map( text => text[ 1 ].replace( / \[(.*)\]/, "" ) );

	GBX.CADObjects = [ ... new Set( GBX.CADObjectIds ) ];
	//console.log( "GBX.CADObjects", GBX.CADObjects );


	GBX.meshes.forEach( ( mesh, index ) => {

		const surface = GBX.surfaces[ index ];
		mesh.userData.id = surface.match( / id="(.*?)"/ )[ 1 ];
		const name = surface.match( /<Name>(.*?)<\/Name>/i );
		mesh.userData.name = name ? name[ 1 ] : mesh.userData.id;

		let cadObjectId = surface.match( /<CADObjectId>(.*?)<\/CADObjectId>/i );
		cadObjectId = cadObjectId ? cadObjectId[ 1 ] : "";
		mesh.userData.cadObjectId = cadObjectId;
		mesh.userData.cadObject = cadObjectId.replace( / \[.*\]/, "" );

		let spaceIds = surface.match( / spaceIdRef="(.*?)"/gi );
		//console.log( "spaceIds", spaceIds );
		spaceId0 = spaceIds ? spaceIds[ 0 ] : "";
		id = spaceId0.match( /spaceIdRef="(.*?)"/i )
		spaceId = id ? id[ 1 ] : "";
		//console.log( "spaceId", spaceId);
		//spaceId = spaceId ? spaceId[ 1 ] : "";

		//let regex = new RegExp( `${ spaceId }`, "i" );
		const space = spaceId ? GBX.spaces[ GBX.spaceIds.indexOf( spaceId ) ] : "";

		mesh.userData.spaceId = spaceId;
		mesh.userData.spaceName = space ? space.match( /<Name>(.*?)<\/Name>/i )[ 1 ] : "";

		let zoneId = space.match( / zoneIdRef="(.*?)"/i )
		zoneId = zoneId ? zoneId[ 1 ] : "";
		let zone = GBX.zones.find( zone => zone.includes( zoneId ) );
		zone = zone || "";
		const zoneName = zone ? zone.match( /<Name>(.*?)<\/Name>/i )[ 1 ] : "";
		mesh.userData.zoneId = zoneId;
		mesh.userData.zoneName = zoneName;

		let storeyId = space.match( / buildingStoreyIdRef="(.*?)"/i );
		storeyId = storeyId ? storeyId[ 1 ] : "";
		const regex = new RegExp( `${ storeyId }`, "i" );
		const storey = GBX.storeys.find( storey => storey.match( regex ) );
		const storeyName = storey ? storey.match( /<Name>(.*?)<\/Name>/i )[ 1 ] : "";
		mesh.userData.storeyId = storeyId;
		mesh.userData.storeyName = storeyName;

	} );
	//console.log( "data", GBX.meshes[ 9 ].userData );

	//console.log( performance.now() - timeStart );

};


GBX.parseElement = function( string ) {

	const parser = new DOMParser();
	const element = parser.parseFromString( string, "application/xml" ).documentElement;

	const attributes = element.attributes;
	const children = element.children;
	//console.log( "children", children );

	const attributesHtm = Array.from( element.attributes ).map( att => `${ att.name }: ${ att.value } <br>` ).join( "" );

	let childrenHtm = Array.from( children )
		.filter( child => ["Opening","PlanarGeometry","RectangularGeometry","ShellGeometry","SpaceBoundary"].includes( child.tagName ) === false )
		.map( child => {

			let htm;

			if ( child.tagName === "AdjacentSpaceId" ) {
				//console.log( "child", child.attributes[ 0 ].value );
				htm = `${ child.tagName }: ${ child.attributes[ 0 ].value }<br> `;

			} else {

				htm = `${ child.tagName }: ${ child.textContent }<br> `;

			}

			return htm;

		} ).join( "" );

	childrenHtm = children[ 0 ].nodeName === "body" ? "No zones in file" : childrenHtm;

	return { attributes, attributesHtm, children, childrenHtm };

}