// copyright 2021 Theo Armour. MIT license.
/* global MNU, FRX, FRXdivMenuFileRead, FRXdivLog  */
// jshint esversion: 6
// jshint loopfunc: true


const FRX = {};

FRX.path = "./spider-viewer/v-2021-08-24/js/handlers/";


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
		<input type=file id=FRXinpFile onchange=FRX.onInputFile(this); accept="*">
	</p>

	<div id=FRXdivLog></div>

	<div id=FOZdivFileOpenZip></div>

</details>`;

};


FRX.onHashChange = function () {
	//console.log( "path", FRX.path );

	FRX.timeStart = performance.now();
	const fileName = location.hash ? location.hash.slice( 1 ) : FRX.defaultFile;
	//const fileTitle = fileName.split( "/" ).pop();
	//FRX.extension = fileTitle.toLowerCase().split( '.' ).pop();
	FRX.url = fileName;

	FRX.loadHandler( FRX.url );

};


FRX.onInputFile = function ( files ) {

	console.log( "FRX files", files.files, files );

	FRX.timeStart = performance.now();

	FRX.files = files;
	FRX.file = FRX.files.files[ 0 ];
	FRX.fileName = FRX.file.name;
	FRX.hostName = FRX.file.type;

	const fName = files.files[ 0 ].name.toLowerCase();
	console.log( "fName", fName );

	FRX.loadHandler( fName );

};


FRX.nnnnonDropFile = function ( files ) {

	console.log( "FRX files", files.files.dropEffect, files.files );

	// if ( files.files.dropEffect === undefined) {
	// 	alert( "When dropping a new file type, you have to drop a second time" )
	// }

	FRX.timeStart = performance.now();

	FRX.files = files;
	FRX.file = FRX.files.files[ 0 ];
	FRX.fileName = FRX.file.name;
	FRX.hostName = FRX.file.type;

	const fName = files.files[ 0 ].name.toLowerCase();
	console.log( "fName", fName );

	FRX.loadHandler( fName );

};



FRX.loadHandler = function ( fName ) {

	//console.log( "fName", fName );

	if ( fName.endsWith( ".3dm" ) ) { FRX.load( r3DM, "3dm-handler.js" ); return; }

	if ( fName.endsWith( "xml" ) ) { FRX.load( GBX, "gbx-handler.js" ); return; }

	if ( fName.endsWith( "gltf" ) || fName.endsWith( "glb" ) ) { FRX.load( GLTF, "gltf-handler.js" ); return; }

	if ( fName.endsWith( "hbjson" ) ) { FRX.load( HBJ, "hbj-handler.js" ); return; }

	if ( fName.endsWith( ".idf" ) || fName.endsWith( ".osm" ) ) { FRX.load( IDF, "idf-handler.js" ); return; }

	if ( fName.endsWith( ".ifc" ) ) { alert( "IFC file support coming soon!")}

	if ( fName.endsWith( ".obj" ) ) { FRX.load( OBJ, "obj-handler.js" ); return; }

	if ( fName.endsWith( ".rad" ) ) { FRX.load( RAD, "rad-handler.js" ); return; }

	if ( fName.endsWith( ".stl" ) ) { FRX.load( STL, "stl-handler.js" ); return; }

	if ( fName.endsWith( ".vtk" ) || fName.endsWith( ".vtp" ) ) { FRX.load( VTK, "vtk-handler.js" ); return; }

	if ( fName.endsWith( ".vtkjs" ) ) { alert( "VTKjs support coming soon!" ); }

	if ( fName.endsWith( ".zip" ) ) { alert( "coming soon!" ); }

};


FRX.load = function ( obj, parser ) {


	if ( obj === undefined ) {

		console.log( "obj", obj );
		scr = document.body.appendChild( document.createElement( 'script' ) );
		//scr.onload dealt with individually by each handler
		scr.src = COR.path + FRX.path + parser;

	} else {

		FRX.handle( obj );

	}

	FRX.onProgress( FRX.file && FRX.file.size || 0, "Load complete" );

};



FRX.handle = function ( obj = GBX ) {

	if ( FRX.file ) {

		obj.read();

		console.log( "FRX.files ", FRX.file );

	} else if ( FRX.files ) {

		obj.read();
		console.log( "FRX.files ", FRX.files );

	} else if ( FRX.url ) {

		obj.onChange( FRX.url );
		//console.log( "FRX.url", FRX.url );

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
