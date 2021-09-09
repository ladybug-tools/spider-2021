// copyright 2020 Theo Armour. MIT license.
/* global GFOdivGetFiles, GFOselFiles, GFOdivOnLoad, GFOdivFileLoaded, GFOtxtRawJson, JTV, JTVdivJsonView */
// jshint esversion: 6
// jshint loopfunc: true


const GFO = {};

GFO.url = "https://api.github.com/repos/ladybug-tools-in2/honeybee-schema/git/trees/master?recursive=1";


GFO.init = function() {

	GFOdivGetFilesOpen.innerHTML = GFO.getMenu();

	//GFO.getFileJson(); // for testing

};


GFO.getMenu = function() {

	const htm = `
	<details open>

		<summary>URL opened details

		<span class="couponcode" >??<span id=divDetails class="coupontooltip" >
			<p>Statistics arising from the results of the xmlHTTPRequest made using the given URL</p>
		</span></span>

		</summary>

		<div id=GFOdivOnLoad ></div>

		<div id=GFOdivFileLoaded ></div>

	</details>


	<details>

		<summary>Raw JSON file

		<span class="couponcode" >??<span id=divDetails class="coupontooltip" >
			<p>The plain text JSON source code as read directly from the GitHub repository. The text is editable.</p>

			<p>It could even be saveable, is you ask nicely.</p>
		</span></span>

		</summary>

		<textarea id=GFOtxtRawJson style=height:400px;width:100%;></textarea>

	</details>

	<br>
`;

	return htm;

};



GFO.getFileJson = function () {

	GFO.timeStart = performance.now();

	const xhr = new XMLHttpRequest();
	xhr.open( 'GET', GFO.url, true );
	xhr.onerror = ( xhr ) => console.log( 'error:', xhr );
	//xhr.onprogress = ( xhr ) => console.log( 'bytes loaded:', xhr.loaded );
	xhr.onload = ( xhr ) => {

		GFO.json = JSON.parse( xhr.target.response );
		//console.log( 'xhr', xhr );
		console.log( 'GFO.json', GFO.json );

		GFO.loaded = xhr.loaded

		GFOtxtRawJson.value = xhr.target.response;

		JTV.json = GFO.json;

		let eventGfoLoad = new Event( "onloadJson", { "bubbles": true, "cancelable": false, detail: true } );

		//window.addEventListener( "onloadjson", GFO.onLoad, false );

		window.dispatchEvent( eventGfoLoad );

		GFO.onLoad()

	};

	xhr.send( null );

};


GFO.onLoad = function ( event ) {

	//console.log( 'GFO event', event );

	GFOdivOnLoad.innerHTML =
		`<p>
			bytes loaded: ${ GFO.loaded.toLocaleString() }<br>
			time stamp: ${ ( performance.now() - GFO.timeStart ).toLocaleString() }
		</p>`

	GFOdivFileLoaded.innerHTML =
		`<p>Link to url loaded. Click to open.<br> <a href="${ GFO.url }" target="_blank" >${ GFO.url }</a></p>`;

};



GFO.init();