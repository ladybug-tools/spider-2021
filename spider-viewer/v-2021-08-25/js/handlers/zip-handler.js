// copyright 2021 Theo Armour. MIT license.
/* global THREE, COR*/
// jshint esversion: 6
// jshint loopfunc: true


ZIP = {};

ZIP.handle = function () {

	if ( FRX.file ) {

		ZIP.read();

		console.log( "FRX.files", FRX.file );

	} else if ( FRX.files ) {

		ZIP.read();
		console.log( "FRX.files ", FRX.files );

	} else if ( FRX.url ) {

		ZIP.onChange();
		console.log( "FRX.url", FRX.url );

	}

};

ZIP.onChange = function () {


	if ( ZIP.loader === undefined ) {

		ZIP.loader = document.body.appendChild( document.createElement( 'script' ) );
		ZIP.loader.onload = () => ZIP.handle( FRX.url );
		ZIP.loader.src = "https://cdn.jsdelivr.net/npm/jszip@3.7.1/dist/jszip.min.js";

	} else {

		ZIP.loadUrl( FRX.url );

	}

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


ZIP.loadUrl = function ( url ) {

	const xhr = new XMLHttpRequest();
	xhr.open( "get", url, true );
	xhr.onload = ( xhr ) => ZIP.unzip( xhr.target.response );
	xhr.send( null );

};

ZIP.unzip = function () {

	let zip;
	let fName;

	JSZip.loadAsync( FRX.file )
		.then( dataZip => {

			zip = dataZip;
			fName = Object.keys( zip.files )[ 0 ];
			return zip.file( fName ).async( "string" );

		} ).then( text => {

			FRX.content = text;

			//console.log( "text", text );

			if ( fName.endsWith( "xml" ) ) { FRX.load( GBX, "gbx-handler.js" ); return; }

			if ( fName.endsWith( ".idf" ) || fName.endsWith( ".osm" ) ) { FRX.load( IDF, "idf-handler.js" ); return; }


		},

		( event ) => FRXdivLog += `<div>Error reading ${ fName }: ${ event.message }</div>`

	);


};


ZIP.handle();