

const GJS = {

	groupGeoJson: undefined,

}; // GeoJson lines



GJS.initGeoJson = function () {

	timeStart = performance.now();

	scene.remove( GJS.groupGeoJson );
	GJS.groupGeoJson = new THREE.Group();
	GJS.groupGeoJson.name = "geoJson";

	//const urlGeoJson = "../../assets/naturalearth/gz_2010_us_050_00_20m.json";
	//const urlGeoJson = "../../opendata/us-county-boundaries-ca.geojson";
	//const urlGeoJson = "./json/ca-cbsa.json";

	const urlGeoJson = "../cb_2019_us_county_20m.geojson";

	//GJS.requestFile( urlGeoJson, GJS.onLoadGeoJson );

	scene.add( GJS.groupGeoJson );

	//console.log( "msGeoJ", performance.now() - timeStart );

};



GJS.bbbbbonLoadGeoJson = function ( string ) {

	const json = string

	let geometries = json.features.map( feature => feature.geometry );
	//console.log( "geometries", geometries );

	let points = geometries.flatMap( geometry => {

		if ( [ "MultiPolygon", "Polygon", "MultiLineString" ].includes( geometry.type ) ) {

			return [ ... geometry.coordinates ];

		} else if ( geometry.type === "LineString" ) {

			return [ geometry.coordinates ];

		}

	} );
	//console.log( "points", points );

	const vertices = points.map( pairs => pairs.map( pair => GJS.latLonToXYZ( 50, pair[ 1 ], pair[ 0 ] ) ) );
	//console.log( "vertices", vertices );

	//const vertices = points.map( pairs => pairs.map( pair => new THREE.Vector3( pair[ 0 ], pair[ 1 ], 0 )  ) );

	const line = GJS.addLineSegments( vertices );

	GJS.groupGeoJson.add( line );

};



GJS.onLoadGeoJson = function ( string ) {
	// Much may be simplified here

	const json = string;

	const geometries = json.features.map( feature => feature.geometry );
	//console.log( "geometries", geometries );

	const points = [];

	geometries.forEach( geometry => {

		if ( geometry?.type === "Polygon" ) {

			polygon = geometry.coordinates[ 0 ];

			vertices = polygon.map( pair => GJS.latLonToXYZ( 50, pair[ 1 ], pair[ 0 ] ) );

			points.push( vertices );

		} else if ( geometry?.type === "LineString" ) {

			//console.log( "lines", geometry );

			polygon = geometry.coordinates;

			vertices = polygon.map( pair => GJS.latLonToXYZ( 50, pair[ 1 ], pair[ 0 ] ) );

			points.push( vertices );

		} else if ( geometry?.type === "MultiPolygon" ) {

			geometry.coordinates.forEach( polygons => {

				polygons.forEach( polygon => {

					vertices = polygon.map( pair => GJS.latLonToXYZ( 50, pair[ 1 ], pair[ 0 ] ) );

					points.push( vertices );

				} );

			} );

		}

	} );
	//console.log( "points", points );

	const line = GJS.addLineSegments( points );

	GJS.groupGeoJson.add( line );

};


GJS.addLineSegments = function ( segments ) {

	//console.log( "segments", segments );

	const geometry = new THREE.BufferGeometry();

	const positions = segments.flatMap( vertices =>

		vertices.slice( 0, - 1 ).flatMap( ( v0, i ) => {

			const v1 = vertices[ i + 1 ];
			return [ v0.x, v0.y, v0.z, v1.x, v1.y, v1.z ];

		} )

	);

	geometry.setAttribute( "position", new THREE.Float32BufferAttribute( positions, 3 ) );

	const material = new THREE.LineBasicMaterial( { color: 0x000ff } );

	return new THREE.LineSegments( geometry, material );

};


GJS.latLonToXYZ = function( radius = 50, lat = 0, lon = 0 ) {

	const phi = ( ( 90 - lat ) * Math.PI ) / 180;
	const theta = ( ( 180 - lon ) * Math.PI ) / 180;
	//console.log( "lat/lon", theta, phi, index);

	const x = radius * Math.sin( phi ) * Math.cos( theta );
	const y = radius * Math.sin( phi ) * Math.sin( theta );
	const z = radius * Math.cos( phi );

	return new THREE.Vector3( - x, y, z );

}


// https://threejs.org/docs/#api/en/loaders/FileLoader
// set response type to JSON

GJS.requestFile = function ( url, callback = GJS.onLoadGeoJson ) {

	const xhr = new XMLHttpRequest();
	xhr.open( "GET", url, true );
	xhr.responseType = "json";
	xhr.onerror = ( xhr ) => console.log( "error:", xhr );
	//xhr.onprogress = ( xhr ) => console.log( 'bytes loaded:', xhr.loaded );
	xhr.onload = ( xhr ) => callback( xhr.target.response );
	xhr.send( null );

}

