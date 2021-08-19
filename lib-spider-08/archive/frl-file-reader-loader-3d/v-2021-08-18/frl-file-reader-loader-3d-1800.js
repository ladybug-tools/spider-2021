// copyright 2021 Theo Armour. MIT license.
/* global MNU, FOP, FRLdivMenuFileRead, FRLdivLog  */
// jshint esversion: 6
// jshint loopfunc: true


const FRL = {};

FRL.init = function () {

	const info =
		`Open <a href="http://gbxml.org" target="_blank">gbXML</a>, HBJSON, 3DM, gLTF, <a href="https://www.energyplus.net/" target="_blank">EnergyPlus</a> IDF and OSM files, OBJ, STL, VTK Files`;

	FRLdivMenuFileRead.innerHTML = `
<details id=detFile >
		<summary class="summary-primary gmd-1" title="Open files on your device: ">File menu
		<span id=MNUspnFile ></span>
		${ MNU.addInfoBox( info ) }
	</summary>

	<div id=FRdivMenuFileReader> </div>

	<p>Select a file from your device or network,</p>
	<p>
		<input type=file id=FRLinpFile onchange=FRL.wrangle(this); accept="*">
	</p>

	<div id=FRLdivLog></div>

	<div id=FOZdivFileOpenZip></div>

</details>`;

};


FRL.wrangle = function ( inpFiles ) {

	FRL.timeStart = performance.now();

	FRL.files = inpFiles;
	FRL.file = FRL.files.files[ 0 ];
	FRL.fileName = FRL.file.name;
	FRL.hostName = FRL.file.type;

	const fName = FRL.file.name.toLowerCase();

	//console.log( "frl", fName, FRL.files );

	FOP.handleFiles( fName );

};



// FRL.readFile = function ( files ) {

// 	FRL.timeStart = performance.now();
// 	FRL.files = files;
// 	FRL.file = FRL.files.files[ 0 ];

// 	FRL.reader = new FileReader();
// 	FRL.reader.onload = FRL.onLoad;

// 	FRL.reader.readAsText( FRL.file );

// };


// FRL.onLoad = function () {

// 	//console.log( "file", FRL.file );

// 	FRL.fileName = FRL.file.name;
// 	FRL.hostName = FRL.file.type;

// 	const string = FRL.reader.result;

// 	const fName = FRL.file.name.toLowerCase();

// 	console.log( "ftl", fName, string, FRL.files );

// 	FOP.onLoad( fName );

// };


FRL.onProgress = function ( size = 0, note = "" ) {

	FRL.timeToLoad = ( performance.now() - FRL.timeStart ).toLocaleString();
	FRL.size = size;

	// const a = document.createElement( 'a' );
	// a.href = url;
	// FOO.hostName = a.hostname;
	const htm =
		`
		<p>
			<span class=attributeTitle >File name</span>: <span class=attributeValue >${ FRL.fileName }</span></br>
			<span class=attributeTitle >Host|type</span>: <span class=attributeValue >${ FRL.hostName }</span></br>
 			<span class=attributeTitle >Bytes loaded</span>: <span class=attributeValue >${ size.toLocaleString() }</span></br>
			<span class=attributeTitle >Time to load</span>: <span class=attributeValue>${ FRL.timeToLoad } ms</span></br>
			${ note }
		</p>
	`;

	FRLdivLog.innerHTML = htm;

	};
