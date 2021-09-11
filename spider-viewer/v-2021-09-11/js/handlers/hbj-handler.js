// copyright 2021 Theo Armour. MIT license.
/* global THREE, COR */
// jshint esversion: 6
// jshint loopfunc: true

HBJ = {};

HBJ.handle = function () {

	//console.log( "FRX.content", FRX.content.slice( 0, 100 ) );
	console.log( "FRX.file", FRX.file.name );
	console.log( "FRX.url", FRX.url.split( "/" ).pop() );

	if ( FRX.content ) { HBJ.addParser( JSON.parse( FRX.content ) ); return; }

	if ( FRX.file ) { HBJ.read(); return; }

	if ( FRX.url ) { HBJ.onChange( FRX.url ); return; }

};



HBJ.read = function () {

	const reader = new FileReader();
	reader.onload = ( event ) => HBJ.addParser( JSON.parse( event.target.result ) );
	reader.readAsText( FRX.file );
};



HBJ.onChange = function ( url ) {

	const xhr = new XMLHttpRequest();
	xhr.responseType = "json";
	xhr.open( "get", FRX.url, true );
	xhr.onload = ( xhr ) => HBJ.addParser( xhr.target.response );
	xhr.send( null );

};


//////////




HBJ.addParser = function ( json ) {

	const loader = document.body.appendChild( document.createElement( 'script' ) );

	loader.onload = () => { HBJ.parse( json )};

	loader.src = "./js/parsers/hbj-hbjson-parser.js";

};



HBJ.handle();