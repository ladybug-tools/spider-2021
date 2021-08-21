// copyright 2021 Theo Armour. MIT license.
/* global MNU, FRX, FRXdivMenuFileRead, FRXdivLog  */
// jshint esversion: 6
// jshint loopfunc: true


const FRX = {};

FRX.path = "lib-spider-08/parsers/v-2021-08-21/";


FRX.onHashChange = function () {
	//console.log( "path", FRX.path );

	FRX.timeStart = performance.now();
	const fileName = location.hash ? location.hash.slice( 1 ) : FRX.defaultFile;
	//const fileTitle = fileName.split( "/" ).pop();
	//FRX.extension = fileTitle.toLowerCase().split( '.' ).pop();
	FRX.url = fileName;

	FRX.handleFiles( FRX.url );

};


FRX.init = function ( defaultFile ) {

	FRX.defaultFile = defaultFile;

	window.addEventListener( "hashchange", FRX.onHashChange );

	const info =
		`Open <a href="http://gbxml.org" target="_blank">gbXML</a>, HBJSON, 3DM, gLTF, <a href="https://www.energyplus.net/" target="_blank">EnergyPlus</a> IDF and OSM files, OBJ, STL, VTK Files`;

	FRXdivMenuFileRead.innerHTML = `
<details id=detFile >
		<summary class="summary-primary gmd-1" title="Open files on your device: ">File menu
		<span id=MNUspnFile ></span>
		${ MNU.addInfoBox( info ) }
	</summary>

	<div id=FRdivMenuFileReader> </div>

	<p>Select a file from your device or network,</p>
	<p>
		<input type=file id=FRXinpFile onchange=FRX.wrangle(this); accept="*">
	</p>

	<div id=FRXdivLog></div>

	<div id=FOZdivFileOpenZip></div>

</details>`;

};


FRX.wrangle = function ( inpFiles ) {

	FRX.timeStart = performance.now();

	FRX.files = inpFiles;
	// FRX.file = FRX.files.files[ 0 ];
	// FRX.fileName = FRX.file.name;
	// FRX.hostName = FRX.file.type;

	const fName = FRX.files.files[ 0 ].name.toLowerCase();

	FRX.handleFiles( fName );

};


FRX.handle = function ( obj = GBX ) {

	if ( FRX.files ) {

		obj.read( FRX.files );
		console.log( "FRX.files ", FRX.files );

	} else if ( FRX.url ) {

		obj.onChange( FRX.url );
		console.log( "FRX.url", FRX.url );

	}

};


FRX.handleFiles = function ( fName ) {

	//console.log( "fName", fName );

	if ( fName.endsWith( ".3dm" ) ) { FRX.load( r3DM, "3dm-parser.js" ); return; }

	if ( fName.endsWith( "xml" ) ) { FRX.load( GBX, "gbx-gbxml-parser.js" ); return; }

	if ( fName.endsWith( "gltf" ) || fName.endsWith( "glb" ) ) { FRX.load( GLTF, "gltf-parser.js" ); return; }

	if ( fName.endsWith( "hbjson" ) ) { FRX.load( HBJ, "hbj-hbjson-parser.js" ); return; }

	if ( fName.endsWith( ".idf" ) || fName.endsWith( ".osm" ) ) { FRX.load( IDF, "idf-parser.js" ); return; }

	if ( fName.endsWith( ".obj" ) ) { FRX.load( OBJ, "obj-parser.js" ); return; }

	if ( fName.endsWith( ".rad" ) ) { FRX.load( RAD, "rad-parser.js" ); return; }

	if ( fName.endsWith( ".stl" ) ) { FRX.load( STL, "stl-parser.js" ); return; }

	if ( fName.endsWith( ".vtk" ) || fName.endsWith( ".vtp" ) ) { FRX.load( VTK, "vtk-parser.js" ); return; }

	if ( fName.endsWith( ".zip" ) ) {

	}

};


FRX.load = function ( obj, parser ) {

	if ( obj === undefined ) {

		scr = document.body.appendChild( document.createElement( 'script' ) );
		scr.src = COR.path + FRX.path + parser;

	} else {

		FRX.handle( obj );

	}

	FRX.onProgress( FRX.file && FRX.file.size || 0, "Load complete" );

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
