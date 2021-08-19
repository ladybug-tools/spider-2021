// copyright 2021 Theo Armour. MIT license.
/* global MNU, FRL, FRLdivMenuFileRead, FRLdivLog  */
// jshint esversion: 6
// jshint loopfunc: true


const FRL = {};

FRL.path = "lib-spider-08/parsers/v-2021-08-18/";

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

	FRL.handleFiles( fName );

};



FRL.handleFiles = function ( fName ) {

	console.log( "fName", fName );

	if ( fName.endsWith( ".3dm" ) ) { FRL.load( r3DM, "3dm-parser.js" ); return; }

	if ( fName.endsWith( "xml" ) ) { FRL.load( GBX, "gbx-gbxml-parser.js" ); return; }

	if ( fName.endsWith( "gltf" ) || fName.endsWith( "glb" ) ) { FRL.load( GLTF, "gltf-parser.js" ); return; }

	if ( fName.endsWith( "hbjson" ) ) { FRL.load( HBJ, "hbj-hbjson-parser.js" ); return; }

	if ( fName.endsWith( ".idf" ) || fName.endsWith( ".osm" ) ) { FRL.load( IDF, "idf-parser.js" ); return; }

	if ( fName.endsWith( ".obj" ) ) { FRL.load( OBJ, "obj-parser.js" ); return; }

	if ( fName.endsWith( ".rad" ) ) { FRL.load( RAD, "rad-parser.js" ); return; }

	if ( fName.endsWith( ".stl" ) ) { FRL.load( STL, "stl-parser.js" ); return; }

	if ( fName.endsWith( ".vtk" ) || fName.endsWith( ".vtp" ) ) { FRL.load( VTK, "vtk-parser.js" ); return; }

	if ( fName.endsWith( ".zip" ) ) {

	}

};


FRL.load = function ( obj, parser ) {

	if ( obj === undefined ) {

		scr = document.body.appendChild( document.createElement( 'script' ) );
		scr.src = COR.path + FRL.path + parser;

	} else {

		obj.read( FRL.files );

	}

	FRL.onProgress( FRL.file && FRL.file.size || 0, "Load complete" );

}


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
