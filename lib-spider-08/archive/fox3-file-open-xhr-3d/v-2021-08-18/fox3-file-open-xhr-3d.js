// copyright 2021 Theo Armour. MIT license.
/* global  */
// jshint esversion: 6
// jshint loopfunc: true


const FOX = {};

FOX.documentTitle = document.title;


FOX.init = function ( { defaultFile = "README.md" } = {} ) {

	FOX.defaultFile = defaultFile;
	//FOX.path = path;
	window.addEventListener( "hashchange", FOX.onHashChange );

};



FOX.onHashChange = function () {
	//console.log( "path", FOX.path );

	FOX.timeStart = performance.now();
	const fileName = location.hash ? location.hash.slice( 1 ) : FOX.defaultFile;
	const fileTitle = fileName.split( "/" ).pop();
	FOX.extension = fileTitle.toLowerCase().split( '.' ).pop();
	FOX.url = fileName;

	FRL.handleFiles( FOX.url );

};

