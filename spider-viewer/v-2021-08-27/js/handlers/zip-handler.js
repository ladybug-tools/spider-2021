// copyright 2021 Theo Armour. MIT license.
/* global THREE, COR, FRX, JSZip, r3DM, GBX, GLTF, HBJ, IDF, IFC, OBJ, RAD, STL, ZIP, FRXdivLog */
// jshint esversion: 6
// jshint loopfunc: true


ZIP = {};


ZIP.handle = function () {

	console.log( "FRX.files ", FRX.file );
	console.log( "FRX.url", FRX.url );



	if ( FRX.file ) { ZIP.loadFile(); return; }

	if ( FRX.url ) { ZIP.fetchZipFile( FRX.url ); return; }

};



ZIP.loadFile = function ( file = FRX.file ) {

	JSZip.loadAsync( file )
		.then( ( zip ) => {

			const names = ZIP.getNames( zip );

			ZIP.getZipContents( names[ 0 ], zip );

		} )

		.catch( error => {
			console.error( "There has been a problem with your file operation:", error );
		} );

};



ZIP.fetchZipFile = function ( url = url2 ) {

	fetch( url )

		.then( response => {

			if ( !response.ok ) { throw new Error( "Error" + response.statusText ); }

			return response.blob();

		} )

		.then( JSZip.loadAsync )

		.then( zip => {

			const names = ZIP.getNames( zip );

			ZIP.getZipContents( names[ 0 ], zip );

		} )

		.catch( error => {
			console.error( "There has been a problem with your fetch operation:", error );
		} );

};




ZIP.getNames = function ( zip ) {

	const names = [];

	zip.forEach( ( relativePath, zipEntry ) => {
		//console.log( "zipEntry.name", zipEntry.name );
		names.push( zipEntry.name );
	} );

	return names;

};


ZIP.getZipContents = function ( fileName, zip ) {

	extension = fileName.split( "." ).pop().toLowerCase();

	if ( [ "glb", "3dm", "vtk" ].includes( extension ) ) {

		alert( "Spider is not yet unzipping this file format. Yet" );
		
		return;
	}

	zip.file( fileName ).async( "uint8array" )

		.then( function ( uint8array ) {

			let text;

			if ( uint8array[ 0 ] !== 255 || uint8array[ 0 ] === 239 || uint8array[ 0 ] === 60 ) {

				text = new TextDecoder( "utf-8" ).decode( uint8array );
				//console.log( 'text', text );

			} else {

				const arr = new Uint8Array( uint8array.length / 2 );
				let index = 0;

				for ( let i = 0; i < uint8array.length; i++ ) {

					if ( i % 2 === 0 ) {

						arr[ index++ ] = uint8array[ i ];

					}

				}

				text = new TextDecoder( "utf-8" ).decode( arr );

			}

			const regex = /encoding="utf-16"/i;

			return text.match( regex ) ? text.slice( 1 ).replace( regex, "" ) : text;

		} )

		.then( text => {
			//divContent.innerText = text;

			FRX.content = text;
			FRX.files = "";
			FRX.url = "";

			console.log( "text", text );

			if ( fileName.endsWith( ".3dm" ) ) { FRX.load( r3DM, "3dm-handler.js" ); return; }

			if ( fileName.endsWith( "xml" ) ) { FRX.load( GBX, "gbx-handler.js" ); return; }

			if ( fileName.endsWith( "gltf" ) || fileName.endsWith( "glb" ) ) { FRX.load( GLTF, "gltf-handler.js" ); return; }

			if ( fileName.endsWith( "hbjson" ) ) { FRX.load( HBJ, "hbj-handler.js" ); return; }

			if ( fileName.endsWith( ".idf" ) || fileName.endsWith( ".osm" ) ) { FRX.load( IDF, "idf-handler.js" ); return; }

			if ( fileName.endsWith( "obj" ) ) { FRX.load( OBJ, "obj-handler.js" ); return; }

			if ( fileName.endsWith( "rad" ) ) { FRX.load( RAD, "rad-handler.js" ); return; }

			if ( fileName.endsWith( "stl" ) ) { FRX.load( STL, "stl-handler.js" ); return; }

			if ( fileName.endsWith( "vtk" ) ) { FRX.load( VTK, "vtk-handler.js" ); return; }

		} )

		.catch( error => {
			console.error( "There has been a problem with your fetch operation:", error );
		} );

};



ZIP.unzip = function ( url ) {

	//console.log( "url", url );

	let zip;
	let fName;

	JSZip.loadAsync( url )
		.then( dataZip => {

			zip = dataZip;
			fName = Object.keys( zip.files )[ 0 ];
			return zip.file( fName ).async( "string" );

		} ).then( text => {

			FRX.content = text;

			//console.log( "text", text );

			if ( fName.endsWith( ".3dm" ) ) { FRX.load( r3DM, "3dm-handler.js" ); return; }

			if ( fName.endsWith( "xml" ) ) { FRX.load( GBX, "gbx-handler.js" ); return; }

			if ( fName.endsWith( "gltf" ) || fileName.endsWith( "glb" ) ) { FRX.load( GLTF, "gltf-handler.js" ); return; }

			if ( fName.endsWith( "hbjson" ) ) { FRX.load( HBJ, "hbj-handler.js" ); return; }

			if ( fName.endsWith( ".idf" ) || fName.endsWith( ".osm" ) ) { FRX.load( IDF, "idf-handler.js" ); return; }

			if ( fName.endsWith( "obj" ) ) { FRX.load( OBJ, "obj-handler.js" ); return; }

			if ( fileName.endsWith( "rad" ) ) { FRX.load( RAD, "rad-handler.js" ); return; }

			if ( fileName.endsWith( "stl" ) ) { FRX.load( STL, "stl-handler.js" ); return; }

			if ( fileName.endsWith( "vtk" ) ) { FRX.load( VTK, "vtk-handler.js" ); return; }

		},

		( event ) => FRXdivLog += `<div>Error reading ${ fName }: ${ event.message }</div>`

	);


};


ZIP.handle();