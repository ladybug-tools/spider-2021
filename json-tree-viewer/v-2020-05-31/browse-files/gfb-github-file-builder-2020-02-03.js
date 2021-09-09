// copyright 2020 Theo Armour. MIT license.
/* global GFBdivGetFiles, GFBselFiles, GFBdivOnLoad, GFBdivFileLoaded, GFBtxtRawJson, JTV, JTVdivJsonView */
// jshint esversion: 6
// jshint loopfunc: true


const GFB = {};

GFB.url = "https://api.github.com/repos/ladybug-tools/spider/git/trees/master?recursive=1";
GFB.prefix = "https://rawcdn.githack.com/ladybug-tools/spider/master/";
GFB.source = "https://github.com/ladybug-tools/spider/blob/master/sandbox/honeybee-schema-builder/honeybee-json-schema-sample-files-by-javascipt";

// GFB.init() is at end of file



GFB.init = function() {

	GFBdivGetFilesBuilder.innerHTML = GFB.getMenu();

};


GFB.getMenu = function() {

	const htm = `
	<details ontoggle=GFB.getFileNames();>

		<summary>Honeybee Builder sample files</summary>

		<p>
			JavaScript-generated Honeybee Schema sample files from
			<a href="${ GFB.source }" target="_blank">Ladybug Tools / Spider / Sandbox
			</a> on GitHub. Tooltips indicate file size. Click file title to view contents.
		</p>

		<select id=GFBselFiles onchange=GFB.getUrl(this.value) size=12 style=overflow:auto;width:100% ></select>

		<div id=GFBdivOnLoad ></div>

		<div id=GFBdivFileLoaded ></div>

	</details>`;

	return htm;

};


GFB.getFileNames = function () {

	if ( GFB.filesData ) { return; }

	fetch( GFB.url )
		.then( response => response.json() )
		.then( json => {

			GFB.filesData = json.tree.filter( item => item.path.includes( "honeybee-json-schema-sample-files-by-javascipt" ) ).filter( item => item.path.endsWith( ".json" ) ).map( item => item );

			GFBselFiles.innerHTML = GFB.getOptions();

			GFBselFiles.selectedIndex = 24; // select a default file

			//GFB.getUrl(); //GFO.getFileJson(); // load a default file

		} );

};



GFB.getOptions = function () {

	const options = GFB.filesData.map( ( item, index ) =>
		`<option value=${ index } title="${ item.size.toLocaleString() } bytes" >${ index + 1 } ${ item.path.split( "/" ).pop() }</option>` );

	GFBdivOnLoad.innerHTML = `<p>Files found on GitHub: ${ options.length }</p>`;

	return options;

};



GFB.getUrl = function ( index = 24 ) {

	const item = GFB.filesData[ index ];

	//console.log( 'item', item );

	GFB.url = GFB.prefix + item.path;

	fetch( GFB.url )
		.then( response => response.json() )
		.then( json => {

			//GFB.filesData = json.tree; //.filter( item => item.path.includes( "samples" ) ).filter( item => item.path.endsWith( ".json" ) ).map( item => item );

			GFO.url = GFB.url;

			GFO.getFileJson(); // load a default file

		} );

};




GFB.onLoad = function (event) { // console.log( 'gfB event', event );

	const title = GFB.file.path.split( "/" ).pop();

	GFBdivFileLoaded.innerHTML =
		`<p>Link to file loaded. Click to edit.<br> <a href="${ GFB.source + title }" target="_blank" >${ title }</a></p>`;


};


// for testing

GFB.processJson = function () {

	const rooms = GFB.json.rooms;

	for ( let room of rooms ) {

		const faces = room.faces;

		for ( let face of faces ) {

			const boundary = face.geometry.boundary;

			for ( let point of boundary ) {

				console.log( 'point', point );
			}

		}
	}
};


GFB.init();