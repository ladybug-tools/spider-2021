// copyright 2021 Theo Armour. MIT license.
/* global THREE, COR */
// jshint esversion: 6
// jshint loopfunc: true

IMG = {};


IMG.handle = function () {

	//console.log( "FRX.content", FRX.content.slice( 0, 100 ) );
	console.log( "FRX.file", FRX.file.name );
	console.log( "FRX.url", FRX.url.split( "/" ).pop() );

	if ( FRX.content ) { IMG.onUnZip(); return; }

	if ( FRX.file ) { IMG.read(); return; }

	if ( FRX.url ) { IMG.display( FRX.url ); return; }

};



IMG.onUnZip = function () {

	if ( IMG.loader === undefined ) {

		IMG.loader = document.body.appendChild( document.createElement( 'script' ) );
		IMG.loader.onload = () => IMG.display( FRX.content );
		IMG.loader.src = "https://cdnjs.cloudflare.com/ajax/libs/showdown/1.9.1/showdown.min.js";

	} else {

		IMG.loadDataUrl( FRX.content );

	}

};



IMG.read = function () {

	if ( IMG.loader === undefined ) {

		IMG.loader = document.body.appendChild( document.createElement( 'script' ) );
		IMG.loader.onload = () => IMG.readFile();
		IMG.loader.src = "https://cdnjs.cloudflare.com/ajax/libs/showdown/1.9.1/showdown.min.js";

	} else {

		IMG.readFile();

	}

};



IMG.readFile = function () {

	const reader = new FileReader();
	reader.onload = ( event ) => IMG.display( event.target.result );
	reader.readAsDataURL( FRX.file );

};



IMG.display = function ( url ) {

	// divMainContent.style.display = "block";
	// main.style.overflow = "auto";

	// divMainContent.style.display = "block";

	// THR.renderer.domElement.style.display = "none";

	divMainContent.innerHTML =
		`<a href=${ FRX.url } title="Open this image in a new window" target="_blank" >
		<img src="${ decodeURI( url ) }" style=max-width:100% >
	</a>`;

};



IMG.handle();