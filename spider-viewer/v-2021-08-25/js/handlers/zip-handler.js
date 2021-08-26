// copyright 2021 Theo Armour. MIT license.
/* global THREE, COR*/
// jshint esversion: 6
// jshint loopfunc: true


ZIP = {};

ZIP.handle = function () {

	if ( FRX.file ) {

		ZIP.read();

		console.log( "FRX.files ", FRX.file );

	} else if ( FRX.files ) {

		ZIP.read();
		console.log( "FRX.files ", FRX.files );

	} else if ( FRX.url ) {

		ZIP.onChange();
		console.log( "FRX.url", FRX.url );

	}

};

ZIP.onChange = function () {

	console.log( "", 23 );

	if ( ZIP.loader === undefined ) {

		ZIP.loader = document.body.appendChild( document.createElement( 'script' ) );
		ZIP.loader.onload = () => ZIP.loadUrl( FRX.url );
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

	const reader = new FileReader();
	reader.onload = ( event ) => ZIP.unzip( event.target.result );
	reader.readAsText( files.files[ 0 ] );

};


ZIP.loadUrl = function ( url ) {

	const xhr = new XMLHttpRequest();
	xhr.open( "get", url, true );
	xhr.onload = ( xhr ) => ZIP.unzip( xhr.target.response );
	xhr.send( null );

};

ZIP.unzip = function ( dataZip ) {

	console.log( "dataZip", dataZip );

	ZIP.timeStart = performance.now();

	const zip = new JSZip();
	const files = [];
	let fileName;

	zip.loadAsync( dataZip )

		.then( zip =>
			//console.log( 'zip', zip );
			zip.file( Object.keys( zip.files )[ 0 ] ).async( "string" )

		).then( text => {

			ZIPdivFileOpenZip.innerHTML = `
<p>
	bytes loaded: ${ text.length.toLocaleString() }<br>
	time elapsed ${ ( performance.now() - ZIP.timeStart ).toLocaleString() } ms<br>
	file: ${ Object.keys( zip.files )[ 0 ] }
</p>`;

			//ZIP.lines = text.split( /\r\n/ ).map( line => line.split( "|" ).map( item => item.trim() ) );

			//divContent.innerText = ZIP.lines.slice( 0, 100 );

			console.log( "text", text );
		} );

};


ZIP.handle();