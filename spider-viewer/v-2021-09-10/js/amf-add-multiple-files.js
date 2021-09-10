// copyright 2021 Theo Armour. MIT license.
/* global MNU, FRX, FRXdivMenuFileRead, FRXdivLog  */
// jshint esversion: 6
// jshint loopfunc: true

const AMF = {};


AMF.fileList = [
	"jti-json-tree-init.js",
	"jte-json-tree-edit.js",
	"jtf-json-tree-finder.js",
	"jth-json-tree-helper.js",
	"jtp-json-tree-parse.js"
];

AMF.path = "../lib-spider-09/jtv-json-tree-view/v-2021-09-10/"


AMF.addFiles = function ( list = AMF.fileList, callback = AMF.callback ) {

	list.forEach( file => AMF.addFile( AMF.path + file, callback ))

}

AMF.addFile = function( url, callback ) {

	const loader = document.body.appendChild( document.createElement( 'script' ) );

	loader.onload = () => {

		AMF.count++;
		if ( AMF.count === AMF.fileList.length ) { callback(); }

	};

	loader.src = url;

}