// copyright 2021 Theo Armour. MIT license.
/* global THREE, COR */
// jshint esversion: 6
// jshint loopfunc: true

HTM = {};


HTM.handle = function () {

	//console.log( "FRX.content", FRX.content.slice( 0, 100 ) );
	console.log( "FRX.file", FRX.file.name );
	console.log( "FRX.url", FRX.url.split( "/" ).pop() );

	if ( FRX.content ) { HTM.onUnZip(); return; }

	if ( FRX.file ) { HTM.read(); return; }

	if ( FRX.url ) { HTM.request(); return; }

};



HTM.onUnZip = function () {

	if ( HTM.loader === undefined ) {

		HTM.loader = document.body.appendChild( document.createElement( 'script' ) );
		HTM.loader.onload = () => HTM.display( FRX.content );
		HTM.loader.src = "https://cdnjs.cloudflare.com/ajax/libs/showdown/1.9.1/showdown.min.js";

	} else {

		HTM.loadDataUrl( FRX.content );

	}

};



HTM.read = function () {

	// if ( HTM.loader === undefined ) {

	// 	HTM.loader = document.body.appendChild( document.createElement( 'script' ) );
	// 	HTM.loader.onload = () => HTM.readFile();
	// 	HTM.loader.src = "https://cdnjs.cloudflare.com/ajax/libs/showdown/1.9.1/showdown.min.js";

	// } else {

		HTM.readFile();

	//}

};



HTM.readFile = function () {

	const reader = new FileReader();
	reader.onload = ( event ) => HTM.display( event.target.result );
	reader.readAsText( FRX.file );

};



HTM.onChange = function () {

	// if ( HTM.loader === undefined ) {

	// 	HTM.loader = document.body.appendChild( document.createElement( 'script' ) );
	// 	HTM.loader.onload = () => HTM.display( FRX.url );
	// 	HTM.loader.src = FRX.url;

	// } else {

		HTM.request( FRX.url );

	//}
};



HTM.request = function ( url ) {

	const xhr = new XMLHttpRequest();
	xhr.open( "get", FRX.url, true );
	xhr.onload = () => { HTM.display( xhr.responseText ); };
	xhr.send( null );

	return;

};



HTM.display = function ( content ) {

	//console.log( "url", url );

	// divMainContent.innerHTML =
	// 	`<iframe srcdoc="${ url }" height=${ window.innerHeight } style="border:none;width:100%;" ></iframe>`;

	divMainContent.innerHTML = `
<div style="border:0px solid red; margin: 0 auto; padding: 0 1rem; max-width: 40rem;" >
${ content }
</div>`;
};



HTM.handle();