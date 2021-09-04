/* global THREE, THR */

//let alcatraz = `"latitude":37.8270,&longitude":-122.423&"zoom":16&"offsetUTC":-420`;
//let coit = "latitude=37.8024&longitude=-122.4058&zoom=16&offsetUTC=-420";


const MAP = {};


//alcatraz;
// MAP.latitude = 37.8270;
// MAP.longitude = -122.423;

// San Francisco Bay
MAP.latitude = MAP.defaultLatitude = 37.796;
MAP.longitude = MAP.defaultLongitude = -122.398;

MAP.mapOverlays = [

	[ "Google Maps", "https://mt1.google.com/vt/x=", "maps" ],
	//[ "Google Maps Terrain", "https://mt1.google.com/vt/lyrs=t&x=" ],
	[ "Google Maps Satellite", "https://mt1.google.com/vt/lyrs=s&x=", "satellite" ],
	[ "Google Maps Hybrid", "https://mt1.google.com/vt/lyrs=y&x=", "hybrid" ],
	[ "Open Street Map", "https://tile.openstreetmap.org/", "osm" ],
	//[ "Open Street Map topo", "http://tile.opentopomap.org/" ],
	[ "Open Cycle Map", "http://tile.opencyclemap.org/cycle/", "cycle" ],
	//		["MapQuest OSM", "https://otile3.mqcdn.com/tiles/1.0.0/osm/"],
	//		["MapQuest Satellite", "https://otile3.mqcdn.com/tiles/1.0.0/sat/"],
	[ "Stamen terrain background", "http://tile.stamen.com/terrain-background/", "stamen" ],
	[ "Esri Satellite", "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/", "esri" ]

];

MAP.defaultOverlayIndex = 0;

MAP.zoom = MAP.defaultZoom = 11;
MAP.heightScale = MAP.defaultHeightScale = 50;

MAP.rows = MAP.defaultRows = 3;
MAP.cols = MAP.defaultCols = 3;

MAP.deltaX = 0;
MAP.deltaY = 0;

MAP.metersPerPixelPerZoom = [ 156412, 78206, 39103, 19551, 9776, 4888, 2444, 1222, 610.984, 305.492, 152.746, 76.373, 38.187, 19.093, 9.547, 4.773, 2.387, 1.193, 0.596, 0.298 ];
MAP.mapboxToken = 'pk.eyJ1IjoidGhlb2EiLCJhIjoiY2o1YXFra3V2MGIzbzJxb2lneDUzaWhtZyJ9.7bYFAQabMXiYmcqW8NLfwg';

MAP.pixelsPerTile = 256;
MAP.unitsPerTile = 50;  // controls size of Three.js PlaneBufferGeometry

MAP.tileBitmapsLoaded = 0;
MAP.tileHeightMapsLoaded = 0;


MAP.init = function () {

	MAP.latitude = MAP.defaultLatitude;
	MAP.longitude = MAP.defaultLongitude;

	MAP.zoom = MAP.defaultZoom;
	MAP.overlayIndex = MAP.defaultOverlayIndex;
	MAP.heightScale = MAP.defaultHeightScale;

	MAP.cols = MAP.defaultCols;
	MAP.rows = MAP.defaultRows;

	MAP.deltaX = 0;
	MAP.deltaY = 0;

};


MAP.update = function () {

	THR.scene.traverse( child => {

		if ( child.isMesh || child.isLine || child.isSprite ) {

			child.geometry.dispose();
			child.material.dispose();

		}

	} );

	if ( MAP.geometry ) {

		MAP.geometry.dispose();
		MAP.geometry = undefined;

		MAP.material.dispose();
		MAP.material = undefined;
	}

	THR.scene.remove( THR.group );
	THR.group = new THREE.Group();
	THR.scene.add( THR.group );

	THRU.setSceneNew();

	MAP.getTilesHeightMaps();

	MAP.getTilesBitmaps();

};



MAP.getTilesBitmaps = function () {

	if ( !MAP.canvasBitmap ) { MAP.canvasBitmap = document.createElement( 'canvas' ); }

	MAP.zoomDelta = 2;

	MAP.canvasBitmap.width = MAP.pixelsPerTile * MAP.cols * MAP.zoomDelta;
	MAP.canvasBitmap.height = MAP.pixelsPerTile * MAP.rows * MAP.zoomDelta;
	MAP.canvasBitmap.style.cssText = "width:256px;";
	MAP.contextBitmap = MAP.canvasBitmap.getContext( "2d" );

	MAP.tileBitmapsLoaded = 0;
	MAP.tileHeightMapsLoaded = 0;

	const centerLatMax = MAP.tile2lat( MAP.tileCenterY, MAP.zoom );
	const centerLatMin = MAP.tile2lat( MAP.tileCenterY + 1, MAP.zoom );

	const centerLonMax = MAP.tile2lon( MAP.tileCenterX, MAP.zoom );
	const centerLonMin = MAP.tile2lon( MAP.tileCenterX + 1, MAP.zoom );

	const latDelta = Math.abs( centerLatMax - centerLatMin );
	const lonDelta = Math.abs( centerLonMax - centerLonMin );

	const latOffsetTarget = Math.abs( centerLatMax - MAP.latitude );
	const lonOffsetTarget = Math.abs( centerLonMax - MAP.longitude );

	//THRU.setSceneNew();

	// not required - just for show
	if ( MAP.deltaX === 0 && MAP.deltaY === 0 ) {

		const tt = THRU.addTellTale();
		//const x = - ( MAP.unitsPerTile / 2 ) + ( lonOffsetTarget / lonDelta ) * MAP.unitsPerTile;
		//const y = ( MAP.unitsPerTile / 2 ) - ( latOffsetTarget / latDelta ) * MAP.unitsPerTile;

		const x = ( - 0.5 + ( lonOffsetTarget / lonDelta ) ) * MAP.unitsPerTile;
		const y = ( 0.5 - ( latOffsetTarget / latDelta ) ) * MAP.unitsPerTile;
		tt.position.set( x, y, 0 );
		tt.scale.z = 500;
		tt.castShadow = true;

	} else {

		//THR.scene.remove( THRU.groupTellTale );
	}


	const latDiff = latOffsetTarget / latDelta;
	const lonDiff = lonOffsetTarget / lonDelta;
	let tileOffsetX, tileOffsetY;

	if ( latDiff < 0.5 ) { tileOffsetY = 1; } else { tileOffsetY = 0; }
	//tileOffsetY = 0;

	//if ( lonDiff < 0.5 ) { tileOffsetX = 1; } else { tileOffsetX = 0; }
	tileOffsetX = 0;

	if ( MAP.cols % 2 === 0 ) { tileOffsetX--; }
	if ( MAP.rows % 2 === 0 ) { tileOffsetY--; }

	MAP.tileBitmapCenterX = MAP.lonToTile( MAP.longitude, 1 + MAP.zoom ) + tileOffsetX + MAP.deltaX;
	MAP.tileBitmapCenterY = MAP.latToTile( MAP.latitude, 1 + MAP.zoom ) + tileOffsetY + MAP.deltaY;

	MAP.tileBitmapStartX = MAP.tileBitmapCenterX - Math.floor( MAP.zoomDelta * MAP.cols / 2 ) + MAP.deltaX;
	MAP.tileBitmapStartY = MAP.tileBitmapCenterY - Math.floor( MAP.zoomDelta * MAP.rows / 2 ) + MAP.deltaY;

	const zoom = MAP.zoom + 1;

	let url;

	let getUrl = MAP.getUrlGoogle;

	if ( MAP.overlayIndex < 3 ) {

		getUrl = MAP.getUrlGoogle;

	} else if ( MAP.overlayIndex === 6 ) {

		getUrl = MAP.getUrlEsri;

	} else {

		getUrl = MAP.getUrlOsm;

	}

	for ( let x = 0; x < MAP.zoomDelta * MAP.cols; x++ ) {

		for ( let y = 0; y < MAP.zoomDelta * MAP.rows; y++ ) {

			url = getUrl( x, y, zoom );

			MAP.fetchTileBitmap( url, x, y );

		}

	}

	MAP.stats = `
	<p>
		centerLatMax: ${ centerLatMax }<br>
		centerLatMin: ${ centerLatMin }<br>
		<br>
		centerLonMax: ${ centerLonMax }<br>
		centerLonMin: ${ centerLonMin }<br>
	</p>

	<p>
		latDelta: ${ latDelta }<br>
		lonDelta: ${ lonDelta }<br>
	</p>

	<p>
		latDiff: ${ latDiff }<br>
		lonDiff: ${ lonDiff }<br>
	</p>
	<p>
		tileOffsetY: ${ tileOffsetY }<br>
		tileOffsetX: ${ tileOffsetX }<br>
	</p>
	<p>
		latOffsetTarget: ${ latOffsetTarget }<br>
		lonOffsetTarget: ${ lonOffsetTarget }<br>
	</p>
	`;

};


MAP.getUrlGoogle = ( x, y, zoom = 1 ) => `${ MAP.mapOverlays[ MAP.overlayIndex ][ 1 ] }${ MAP.tileBitmapStartX + x }&y=${ MAP.tileBitmapStartY + y }&z=${ zoom }`;

MAP.getUrlEsri = ( x, y, zoom = 1 ) => `${ MAP.mapOverlays[ MAP.overlayIndex ][ 1 ] }${ zoom }/${ MAP.tileBitmapStartY + y }/${ MAP.tileBitmapStartX + x }.jpg`;

MAP.getUrlOsm = ( x, y, zoom = 1 ) => `${ MAP.mapOverlays[ MAP.overlayIndex ][ 1 ] }${ zoom }/${ MAP.tileBitmapStartX + x }/${ MAP.tileBitmapStartY + y }.png?`; //access_token=${ MAP.mapboxToken }`;

MAP.setStats = () => {

	const str = JSON.stringify( MAP, null, "<br>" );

	divStats.innerHTML = `
	${ MAP.stats }
	<details>
		<p>${ str }</p>
	</details>`;

};



MAP.fetchTileBitmap = function ( url = "", col = 0, row = 0 ) {

	fetch( new Request( url, { mode: "cors" } ) )
		.then( response => response.blob() )
		.then( blob => MAP.onLoadTileBitmap( URL.createObjectURL( blob ), col, row ) );

};



MAP.onLoadTileBitmap = function ( src, col, row ) {

	const img = new Image(); //document.createElement( "img" );

	img.onload = function () {

		MAP.contextBitmap.drawImage( img, 0, 0, MAP.pixelsPerTile, MAP.pixelsPerTile, col * MAP.pixelsPerTile, row * MAP.pixelsPerTile, MAP.pixelsPerTile, MAP.pixelsPerTile );

		MAP.tileBitmapsLoaded++;

		if ( MAP.tileBitmapsLoaded >= MAP.zoomDelta * MAP.zoomDelta * MAP.rows * MAP.cols ) {

			MAP.onLoadBitmaps( MAP.canvasBitmap );

		}

	};

	img.src = src;

};



MAP.onLoadBitmaps = function ( canvas ) {

	const texture = new THREE.Texture( canvas );
	texture.needsUpdate = true;

	//MAP.material = new THREE.MeshNormalMaterial( { side: 2, transparent: true } );
	MAP.material = new THREE.MeshPhongMaterial( { color: 0xffffff, map: texture, side: 2, transparent: true } );

	MAP.getMesh();

};



/////

MAP.getTilesHeightMaps = function () {

	if ( !MAP.canvasHeightMaps ) { MAP.canvasHeightMaps = document.createElement( "canvas" ); }

	MAP.canvasHeightMaps.width = MAP.cols * MAP.pixelsPerTile;
	MAP.canvasHeightMaps.height = MAP.rows * MAP.pixelsPerTile;
	MAP.canvasHeightMaps.style.cssText = "width:256px;";
	MAP.contextHeightMaps = MAP.canvasHeightMaps.getContext( "2d" );




	MAP.tileCenterX = MAP.lonToTile( MAP.longitude, MAP.zoom ) + MAP.deltaX;
	MAP.tileCenterY = MAP.latToTile( MAP.latitude, MAP.zoom ) + MAP.deltaY;

	MAP.tileStartX = MAP.tileCenterX - Math.floor( MAP.cols / 2 );
	MAP.tileStartY = MAP.tileCenterY - Math.floor( MAP.rows / 2 );

	for ( let x = 0; x < MAP.cols; x++ ) {

		for ( let y = 0; y < MAP.rows; y++ ) {

			const url = `https://api.mapbox.com/v4/mapbox.terrain-rgb/${ MAP.zoom }/${ MAP.tileStartX + x }/${ MAP.tileStartY + y }.pngraw?access_token=${ MAP.mapboxToken }`;

			MAP.fetchTileHeightMap( url, x, y );

		}

	}

};


MAP.fetchTileHeightMap = function ( url = "", col = 0, row = 0 ) {

	// fetch( new Request( url ) )
	// 	.then( response => response.blob() )
	// 	.catch( ( error ) => {
	// 		console.log( error );
	// 		return Promise.reject()
	// 	} )
	// 	.then( blob => MAP.onLoadTileHeightMap( URL.createObjectURL( blob ), col, row ) )

	// 	;

	fetch( url ).then( ( response ) => {
		if ( response.ok ) {
			return response.blob();
		} else {
			console.log( "", 23 );
			MAP.tileHeightMapsLoaded++;
			divMessage.innerHTML = '<p><mark>There was no available height map for for one or more tiles.</mark></p>';

		}
	} )
		.then( blob => MAP.onLoadTileHeightMap( URL.createObjectURL( blob ), col, row ) )
		.catch( ( error ) => {
			console.log( error );
		} );

};


MAP.onLoadTileHeightMap = function ( src, col = 0, row = 0 ) {

	const img = new Image(); //document.createElement( "img" );
	const size = 256;

	img.onload = function () {

		MAP.contextHeightMaps.drawImage( img, 0, 0, size, size, col * size, row * size, size, size );

		MAP.tileHeightMapsLoaded++;

		if ( MAP.tileHeightMapsLoaded >= MAP.rows * MAP.cols ) {

			MAP.onLoadHeightMaps( MAP.contextHeightMaps );

		}

	};

	img.src = src;

};



MAP.onLoadHeightMaps = function ( context ) {

	const data = context.getImageData( 0, 0, MAP.cols * MAP.pixelsPerTile, MAP.rows * MAP.pixelsPerTile ).data;

	MAP.metersPerPixel = MAP.metersPerPixelPerZoom[ MAP.zoom ];

	// following was by trial and error. An algorithm would be nice
	MAP.scale = [ 0.00003, 0.00005, 0.0001, 0.0001, 0.0002, 0.0003, 0.0005, 0.001, 0.002, 0.001, 0.005, 0.02 ];

	MAP.scaleTerrain = MAP.scale[ MAP.zoom - 7 ] * MAP.heightScale;

	MAP.geometry = new THREE.PlaneBufferGeometry( MAP.cols * MAP.unitsPerTile, MAP.rows * MAP.unitsPerTile, MAP.cols * MAP.pixelsPerTile - 1, MAP.rows * MAP.pixelsPerTile - 1 );

	const vertices = MAP.geometry.attributes.position.array;

	for ( let i = 2, j = 0; i < vertices.length; i += 3 ) {

		const r = data[ j++ ];
		const g = data[ j++ ];
		const b = data[ j++ ];
		j++;

		const height = MAP.scaleTerrain * ( 0.1 * ( r * 65536 + g * 256 + b ) - 10000 );
		vertices[ i ] = height;

		// if ( height === 0 ) {
		// 	console.log( "i", i );
		// 	vertices[ i ] = MAP.scaleTerrain * ( 0.1 * ( data[ j ] * 65536 + data[ j + 1 ]* 256 + data[ j - 2 ] ) - 10000 );
		// }
	}

	MAP.geometry.computeFaceNormals();
	MAP.geometry.computeVertexNormals();

	MAP.getMesh();

};



MAP.getMesh = function () {

	//MAP.geometry = new THREE.PlaneBufferGeometry( MAP.cols * MAP.unitsPerTile, MAP.rows * MAP.unitsPerTile );
	//material = new THREE.MeshBasicMaterial( { map: texture, side: 2 } );
	//material = new THREE.MeshNormalMaterial( { side: 2 } );

	if ( MAP.geometry && MAP.material ) {

		THR.group = THR.setSceneNew();

		const mesh = new THREE.Mesh( MAP.geometry, MAP.material );
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		THR.group.add( mesh );

		THR.updateScene();

		//THR.radius = 141.4;

		// THR.lightDirectional.position.copy(
		//	THR.center.clone().add( new THREE.Vector3( -1.5 * THR.radius, -1.5 * THR.radius, 1.5 * THR.radius ) )
		//);

		THR.camera.position.copy(
			THR.center.clone().add( new THREE.Vector3( 0 * THR.radius, -0.8 * THR.radius, 0.8 * THR.radius ) )
		);

	}

};



////////// Cartography utilities

// https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Resolution_and_Scale

MAP.lonToTile = ( longitude = 0, zoom = 16 ) => Math.floor( ( longitude + 180 ) / 360 * 2 ** zoom );


MAP.latToTile = ( latitude = 51.4934, zoom = 16 ) =>
	Math.floor( ( 1 - Math.log( Math.tan( latitude * Math.PI / 180 ) + 1 / Math.cos( latitude * Math.PI / 180 ) )
		/ Math.PI ) / 2 * 2 ** zoom );


MAP.tile2lon = ( x = 0, zoom = 11 ) => x / 2 ** zoom * 360 - 180;

MAP.tile2lat = ( y = 0, zoom = 11 ) => {

	const pi = Math.PI;
	const n = pi - 2 * pi * y / 2 ** zoom;
	return 180 / pi * Math.atan( 0.5 * ( Math.exp( n ) - Math.exp( -n ) ) );

};