// copyright 2021 Theo Armour. MIT license.
/* global THREE, COR*/
// jshint esversion: 6
// jshint loopfunc: true


ZIP = {};



ZIP.handle = function () {

	console.log( "FRX.files ", FRX.file );
	console.log( "FRX.url", FRX.url );

	if ( FRX.file ) { ZIP.read(); return; }

	if ( FRX.url ) { ZIP.onChange( FRX.url ); return; }

};



ZIP.read = function () {

	if ( ZIP.loader === undefined ) {

		ZIP.loader = document.body.appendChild( document.createElement( 'script' ) );
		ZIP.loader.onload = () => ZIP.readFile();
		ZIP.loader.src = "https://cdn.jsdelivr.net/npm/jszip@3.7.1/dist/jszip.min.js";

	} else {

		ZIP.readFile();

	}

};


ZIP.readFile = function ( inpFiles ) {

	console.log( "", 23 );
	const reader = new FileReader();
	reader.onload = ( event ) => ZIP.unzip( event.target.files );
	reader.readAsText( FRX.file );

};


ZIP.onChange = function () {

	console.log( "", 23 );
	if ( ZIP.loader === undefined ) {

		ZIP.loader = document.body.appendChild( document.createElement( 'script' ) );
		ZIP.loader.onload = () => ZIP.unzip();
		ZIP.loader.src = "https://cdn.jsdelivr.net/npm/jszip@3.7.1/dist/jszip.min.js";

	} else {

		ZIP.loadUrl();

	}

};



ZIP.loadUrl = function () {

	const xhr = new XMLHttpRequest();
	xhr.open( "get", FRX.url , true );
	xhr.onload = ( xhr ) => ZIP.unzip( xhr.target.response );
	xhr.send( null );

};



ZIP.unzip = function ( url) {

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

			if ( fName.endsWith( ".idf" ) || fName.endsWith( ".osm" ) ) { FRX.load( IDF, "idf-handler.js" ); return; }


		},

		( event ) => FRXdivLog += `<div>Error reading ${ fName }: ${ event.message }</div>`

	);


};


ZIP.handle();