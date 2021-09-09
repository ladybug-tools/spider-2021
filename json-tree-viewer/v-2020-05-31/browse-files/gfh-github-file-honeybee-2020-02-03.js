// copyright 2020 Theo Armour. MIT license.
/* global GFHdivGetFiles, GFHselFiles, GFHdivOnLoad, GFHdivFileLoaded, GFHtxtRawJson, JTV, JTVdivJsonView */
// jshint esversion: 6
// jshint loopfunc: true


const GFH = {};

GFH.defaultSelectedIndex = 26;


GFH.url = "https://api.github.com/repos/ladybug-tools/honeybee-schema/git/trees/master?recursive=1";
GFH.prefix = "https://rawcdn.githack.com/ladybug-tools/honeybee-schema/master/";
GFH.source = "https://github.com/ladybug-tools/honeybee-schema/blob/master/samples/";

// GFH.init() is at end of file



GFH.init = function() {

	GFHdivGetFilesHoneybee.innerHTML = GFH.getMenu();

};


GFH.getMenu = function() {

	const htm = `
	<details ontoggle=GFH.getFileNames(); open>

		<summary>Honeybee Schema sample files</summary>

		<p>
			Files from <a href="https://github.com/ladybug-tools/honeybee-schema/tree/master/samples" target="_blank">ladybug-tools/ honeybee-schema
			</a> on GitHub. Tooltips indicate file size. Click file title to view contents.
		</p>

		<select id=GFHselFiles onchange=GFH.getUrl(this.value) size=12 style=overflow:auto;width:100% ></select>

		<div id=GFHdivOnLoad ></div>

		<div id=GFHdivFileLoaded ></div>

	</details>`;

	return htm;

};


GFH.getFileNames = function () {

	if ( GFH.filesData ) { return; }

	fetch( GFH.url )
		.then( response => response.json() )
		.then( json => {

			GFH.filesData = json.tree.filter( item => item.path.includes( "samples" ) ).filter( item => item.path.endsWith( ".json" ) ).map( item => item );

			GFHselFiles.innerHTML = GFH.getOptions();

			GFHselFiles.selectedIndex = GFH.defaultSelectedIndex; // select a default file

			GFH.getUrl(); //GFO.getFileJson(); // load a default file

		} );

};



GFH.getOptions = function () {

	const options = GFH.filesData.map( ( item, index ) =>
		`<option value=${ index } title="${ item.size.toLocaleString() } bytes" >${ index + 1 } ${ item.path.split( "/" ).pop() }</option>` );

	GFHdivOnLoad.innerHTML = `<p>Files found on GitHub: ${ options.length }</p>`;

	return options;

};



GFH.getUrl = function ( index = GFH.defaultSelectedIndex) {

	const item = GFH.filesData[   index ];

	//console.log( 'item', item );

	GFH.url = GFH.prefix + item.path;

	fetch( GFH.url )
		.then( response => response.json() )
		.then( json => {

			//GFH.filesData = json.tree; //.filter( item => item.path.includes( "samples" ) ).filter( item => item.path.endsWith( ".json" ) ).map( item => item );

			GFO.url = GFH.url;

			GFO.getFileJson(); // load a default file

		} );

};


GFH.onLoad = function (event) { // console.log( 'gfH event', event );

	const title = GFH.file.path.split( "/" ).pop();

	GFHdivFileLoaded.innerHTML =
		`<p>Link to file loaded. Click to edit.<br> <a href="${ GFH.source + title }" target="_blank" >${ title }</a></p>`;


};


// for testing

GFH.processJson = function () {

	const rooms = GFH.json.rooms;

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


GFH.init();