// copyright 2021 Theo Armour. MIT license.
/* global THREE, COR*/
// jshint esversion: 6
// jshint loopfunc: true

JSN = {};


JSN.handle = function () {

	console.log( "FRX.content", FRX.content.slice( 0, 100 ) );
	console.log( "FRX.files {...}", FRX.file.name );
	console.log( "FRX.url .../", FRX.url.split( "/" ).pop() );

	if ( FRX.content ) { JSN.parseJson( JSON.parse( FRX.content ) ); return; }

	if ( FRX.file ) { JSN.readFile(); return; }

	if ( FRX.url ) { JSN.onChange( FRX.url ); return; }

};



JSN.onUnZip = function () {

	if ( JSN.loader === undefined ) {

		JSN.loader = document.body.appendChild( document.createElement( 'script' ) );
		JSN.loader.onload = () => JSN.parse();
		JSN.loader.src = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r131/examples/js/loaders/ObjectLoader.js";

	} else {

		JSN.parse();

	}

};



JSN.readFile = function () {

	const reader = new FileReader();
	reader.onload = ( event ) => JSN.parseJson( JSON.parse( event.target.result ) );
	reader.readAsText( FRX.file );

};



JSN.onChange = function ( url ) {

	const xhr = new XMLHttpRequest();
	xhr.open( "get", url, true );
	xhr.onload = ( xhr ) => JSN.parseJson( JSON.parse( xhr.target.response ) );
	xhr.send( null );

};



JSN.parseJson = function ( json ) {

	JSN.json = json;
	//console.log( "json", JSN.json );

	const loader = new THREE.ObjectLoader();
	const object = loader.parse( JSN.json );

	if ( object.isScene ) {

		THR.scene = object;

	} else {

		THR.scene.add( object );

	}

};



JSN.handle();