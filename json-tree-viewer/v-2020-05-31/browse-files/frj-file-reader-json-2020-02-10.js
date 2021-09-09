// copyright 2020 Theo Armour. MIT license.
// See pushme-pullyou/templates-01/modules/file-reader
// 2020-01-15
/* divContent */
// jshint esversion: 6
// jshint loopfunc: true


const FRJ = {};



FRJ.init = function () {

	FRJdivFileReaderJson.innerHTML += FRJ.getMenu();

};



FRJ.getMenu = function () {

	const htm = `
<details open>

	<summary>
		Open a file on your computer

		<span class="couponcode">?? <span class="coupontooltip">
			<a href="https://developer.mozilla.org/en-US/docs/Web/API/FileReader" target="_blank">file reader on mdn</a>
			aaa bbb cccc
		</span></span>

	</summary>

	<!-- accept = '.rad, .res, .pts' multiple -->

	<p>
		<input type=file id=FRTinpFile onchange=FRJ.openFile(this);  >
	</p>

	<!--
	<textarea id=FRTtxtArea style=height:500px;overflow:auto;width:100%; ></textarea>
	-->

	<p id=FRTpStats ></p>


</details>`;

	return htm;

};


FRJ.openFile = function ( files ) {

	FRJ.timeStart = performance.now();

	const reader = new FileReader();
	reader.onload = ( event ) => {

		FRJ.files = files;
		FRJ.result = reader.result;

		JTV.json = JSON.parse( FRJ.result );

		FRJ.event = new Event( "onloadJson", {"bubbles": true, "cancelable": false, detail: true } );

		//window.addEventListener( "onloadjson", FRJ.onLoad, false )

		FRJ.onLoad();

		window.dispatchEvent( FRJ.event );


	};

	reader.readAsText( files.files[ 0 ] );

};


FRJ.onLoad = function () {

	//FRTtxtArea.innerHTML = FRJ.result;
	const files = FRJ.files;

	GFOtxtRawJson.value = FRJ.result;

	GFOdivOnLoad.innerHTML = `
		name: ${ files.files[ 0 ].name }<br>
		size: ${ files.files[ 0 ].size.toLocaleString() } bytes<br>
		type: ${ files.files[ 0 ].type }<br>
		modified: ${files.files[ 0 ].lastModifiedDate.toLocaleDateString() }<br>
		time to load: ${ ( performance.now() - FRJ.timeStart ).toLocaleString() } ms`;

	GFOdivFileLoaded.innerHTML = "";

	//console.log( 'FRJ files', files.files );
	//console.log( 'FRJ event', event );

};


FRJ.init();