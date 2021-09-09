// copyright 2020 Theo Armour. MIT license.
/* global GFDdivGetFiles, GFDselFiles, GFDdivOnLoad, GFDdivFileLoaded, GFDtxtRawJson, JTV, JTVdivJsonView */
// jshint esversion: 6
// jshint loopfunc: true


const GFD = {};

GFD.url = "https://api.github.com/repos/ladybug-tools/dragonfly-schema/git/trees/master?recursive=1";
GFD.prefix = "https://rawcdn.githack.com/ladybug-tools/dragonfly-schema/master/";
GFD.source = "https://github.com/ladybug-tools/dragonfly-schema/blob/master/dragonfly_schema/samples/";

// GFD.init() is at end of file



GFD.init = function() {

	GFDdivGetFilesDragonfly.innerHTML = GFD.getMenu();

};


GFD.getMenu = function() {

	const htm = `
<details ontoggle=GFD.getFileNames();>

	<summary>Dragonfly Schema sample files</summary>

	<p>
		JSON files from
		<a href="${ GFD.source }" target="_blank">Ladybug Tools / Dragonfly Schema</a>
			on GitHub. Tooltips indicate file size in bytes. Click file title to view its contents.
		More details available in JavaScript developer console.
	</p>

	<select id=GFDselFiles onchange=GFD.getUrl(this.value) size=10 style=overflow:auto;width:100% ></select>

	<div id=GFDdivOnLoad ></div>

	<div id=GFDdivFileLoaded ></div>

</details>`;

	return htm;

};


GFD.getFileNames = function () {

	fetch( GFD.url )
		.then( response => response.json() )
		.then( json => {

			GFD.filesData = json.tree.filter( item => item.path.includes( "samples" ) ).filter( item => item.path.endsWith( ".json" ) ).map( item => item );

			GFDselFiles.innerHTML = GFD.getOptions();

			GFDselFiles.selectedIndex = 28; // select a default file

			GFD.getUrl(); //GFO.getFileJson(); // load a default file

		} );

};



GFD.getOptions = function () {

	const options = GFD.filesData.map( ( item, index ) =>
		`<option value=${ index } title="${ item.size.toLocaleString() } bytes" >${ index + 1 } ${ item.path.split( "/" ).pop() }</option>` );

	GFDdivOnLoad.innerHTML = `<p>Files found on GitHub: ${ options.length }</p>`;

	return options;

};



GFD.getUrl = function ( index = 3 ) {

	const item = GFD.filesData[ index ];

	//console.log( 'item', item );

	GFD.url = GFD.prefix + item.path;

	fetch( GFD.url )
		.then( response => response.json() )
		.then( json => {

			//GFD.filesData = json.tree; //.filter( item => item.path.includes( "samples" ) ).filter( item => item.path.endsWith( ".json" ) ).map( item => item );

			GFO.url = GFD.url;

			GFO.getFileJson(); // load a default file

		} );

};


GFD.onLoad = function (event) { // console.log( 'gfD event', event );

	const title = GFD.file.path.split( "/" ).pop();

	GFDdivFileLoaded.innerHTML =
		`<p>Link to file loaded. Click to edit.<br> <a href="${ GFD.source + title }" target="_blank" >${ title }</a></p>`;


};


// for testing

GFD.processJson = function () {

	const rooms = GFD.json.rooms;

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


GFD.init();