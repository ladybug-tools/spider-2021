// copyright 2021 Theo Armour. MIT license.
/* global THREE, COR */
// jshint esversion: 6
// jshint loopfunc: true

UNK = {};


UNK.handle = function () {

	//console.log( "FRX.content", FRX.content.slice( 0, 100 ) );
	console.log( "FRX.file", FRX.file.name );
	console.log( "FRX.url", FRX.url.split( "/" ).pop() );

	if ( FRX.content ) { UNK.onUnZip(); return; }

	if ( FRX.file ) { UNK.read(); return; }

	if ( FRX.url ) { UNK.display(); return; }

};



UNK.onUnZip = function () {

	if ( UNK.loader === undefined ) {

		UNK.loader = document.body.appendChild( document.createElement( 'script' ) );
		UNK.loader.onload = () => UNK.display( FRX.content );
		UNK.loader.src = "https://cdnjs.cloudflare.com/ajax/libs/showdown/1.9.1/showdown.min.js";

	} else {

		UNK.loadDataUrl( FRX.content );

	}

};



UNK.read = function () {

	// if ( UNK.loader === undefined ) {

	// 	UNK.loader = document.body.appendChild( document.createElement( 'script' ) );
	// 	UNK.loader.onload = () => UNK.readFile();
	// 	UNK.loader.src = "https://cdnjs.cloudflare.com/ajax/libs/showdown/1.9.1/showdown.min.js";

	// } else {

		UNK.readFile();

	//}

};



UNK.readFile = function () {

	const reader = new FileReader();
	reader.onload = ( event ) => UNK.display( event.target.result );
	reader.readAsText( FRX.file );

};



UNK.onChange = function () {

	// if ( UNK.loader === undefined ) {

	// 	UNK.loader = document.body.appendChild( document.createElement( 'script' ) );
	// 	UNK.loader.onload = () => UNK.display( FRX.url );
	// 	UNK.loader.src = FRX.url;

	// } else {

		UNK.request( FRX.url );

	//}
};



UNK.request = function ( url ) {

	const xhr = new XMLHttpRequest();
	xhr.open( "get", FRX.url, true );
	xhr.onload = () => { UNK.display( xhr.responseText ); };
	xhr.send( null );

	return;

};



UNK.display = function ( ) {

	//console.log( "content", content );

	divMainContent.innerHTML =
		`<iframe src="${ decodeURI( FRX.url ) }" height=${ window.innerHeight } style="border:none;width:100%;" ></iframe>`;

// 	divMainContent.innerHTML = `
// <div style="border:0px solid red; margin: 0 auto; padding: 0 1rem; max-width: 40rem;" >
// ${ decodeURI( FRX.url ) }
// </div>`;
};



UNK.handle();