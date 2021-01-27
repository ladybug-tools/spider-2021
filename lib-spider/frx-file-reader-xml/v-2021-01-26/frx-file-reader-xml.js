// copyright 2020 Theo Armour. MIT license.
/* global */
// jshint esversion: 6
// jshint loopfunc: true


const FRX = {};

FRX.init = function () {


	FRXdivMenuFileRead.innerHTML = `
<details id=detFile open>

	<summary class="summary-primary gmd-1" title="View selected items">
		File menu
	</summary>

	<div id=FRdivMenuFileReader> </div>

	<p>
		<input type=file id=FRinpFile onchange=FRX.readFile(this); accept="*">
	</p>

	<div id=FRXdivLog></div>

	<div id=FOZdivFileOpenZip></div>

</details>`;

};



FRX.readFile = function ( files ) {

	FRX.timeStart = performance.now();
	FRX.files = files;
	FRX.file = FRX.files.files[ 0 ];

	FRX.reader = new FileReader();
	FRX.reader.onload = FRX.onLoad;

	FRX.reader.readAsText( FRX.file );

};


FRX.onLoad = function () {

	console.log( "file", FRX.file );

	FRX.fileName = FRX.file.name;
	FRX.hostName = FRX.file.type;

	string = FRX.reader.result;
	//console.log( "", string );


	if ( FRX.file.name.toLowerCase().endsWith( ".zip" ) ) {

		// FRX.dataZip = FRX.file;
		// //console.log( "name", FRX.file.name );

		// FOZ.onLoadFile();

	} else if ( FRX.file.name.toLowerCase().endsWith( "xml" ) ) {
		console.log( "", 23 );

		GBX.parseResponse( string );

		FRX.onProgress( FRX.file.size, "Load complete" );

	} else {

		// FRX.string = FRX.responseType === "json" ? JSON.parse( FRX.reader.result ) : FRX.reader.result;
		// FRX.onLoadFile();

	}

};


FRX.onProgress = function ( size = 0, note = "" ) {


	FRX.timeToLoad = ( performance.now() - FRX.timeStart ).toLocaleString();
	FRX.size = size;

	// const a = document.createElement( 'a' );
	// a.href = url;
	// FOO.hostName = a.hostname;
	const htm =
		`
		<p>
			<span class=attributeTitle >File name</span>: <span class=attributeValue >${ FRX.fileName }</span></br>
			<span class=attributeTitle >Host|type</span>: <span class=attributeValue >${ FRX.hostName }</span></br>
 			<span class=attributeTitle >Bytes loaded</span>: <span class=attributeValue >${ size.toLocaleString() }</span></br>
			<span class=attributeTitle >Time to load</span>: <span class=attributeValue>${ FRX.timeToLoad } ms</span></br>
			${ note }
		</p>
	`;

	FRXdivLog.innerHTML = htm;

};