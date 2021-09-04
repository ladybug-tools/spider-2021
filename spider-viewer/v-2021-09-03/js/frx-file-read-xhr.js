// copyright 2021 Theo Armour. MIT license.
/* global MNU, FRX, FRXdivMenuFileRead, FRXdivLog  */
// jshint esversion: 6
// jshint loopfunc: true


const FRX = {};

FRX.reader = new FileReader();
FRX.path = "";

FRX.init = function ( defaultFile ) {

	FRX.defaultFile = defaultFile;

	window.addEventListener( "hashchange", FRX.onHashChange );

	const info = `
<p>Open <a href="http://gbxml.org" target="_blank">gbXML</a>, HBJSON, Rhino 3DM, gLTF,
<a href="https://www.energyplus.net/" target="_blank">EnergyPlus</a> IDF and OSM, OBJ, STL, VTK files.</p>
Use the file dialog, drag&drop or a URL`;

	FRXdivMenuFileRead.innerHTML = `
<details id=detFile >
		<summary class="summary-primary gmd-1" title="Open files on your device: ">File menu
		<span id=MNUspnFile ></span>
		${ MNU.addInfoBox( info ) }
	</summary>

	<div id=FRdivMenuFileReader> </div>

	<p>Select a file from your device or network,</p>
	<p>
		<input type=file id=FRXinpFiles onchange=FRX.onInputFiles(this); accept="*" multiple>
	</p>

	<div id=FRXdivLog></div>

	<div id=FOZdivFileOpenZip></div>

</details>`;

};


FRX.onHashChange = function () {


	FRX.timeStart = performance.now();
	const url = location.hash ? location.hash.slice( 1 ) : FRX.defaultFile;
	//const fileTitle = fileName.split( "/" ).pop();
	//FRX.extension = fileTitle.toLowerCase().split( '.' ).pop();
	FRX.content = "";
	FRX.file = "";
	FRX.fileName = url.split( "/").pop();
	FRX.url = url;

	FRX.loadHandler( FRX.url );

};


FRX.onInputFiles = function () {

	//console.log( "FRX files", files.files, files );



	FRX.index = 0;
	FRX.files = FRXinpFiles.files;
	// FRX.file = FRX.files[ 0 ];
	// FRX.fileName = FRX.file.name;
	// FRX.hostName = FRX.file.type;
	// FRX.content = "";
	// FRX.url = "";


	FRX.readFile();
};


FRX.readFile = function () {

	//console.log( "FRX.files[ FRX.index ]", FRX.files[ FRX.index ] );

	FRX.timeStart = performance.now();

	FRX.reader.readAsText( FRX.files[ FRX.index ] );

	FRX.file = FRX.files[ FRX.index ];
	FRX.fileName = FRX.file.name;
	FRX.hostName = FRX.file.type;
	FRX.content = "";
	FRX.url = "";

	//console.log( "", FRX.index, FRX.file );

	FRX.index++;

	if ( FRX.index < FRX.files.length ) {

		setTimeout( FRX.readFile, 2000 );

	}

}




FRX.reader.onload = function () {

	FRX.loadHandler( FRX.fileName.toLowerCase() )

// 	if ( window.FRXdivLog ) {

// 		FRXdivLog.innerHTML = `
// name: ${ FRX.file.name }<br>
// size: ${ FRX.file.size.toLocaleString() } bytes<br>
// type: ${ FRX.file.type }<br>
// modified: ${ FRX.file.lastModifiedDate.toLocaleDateString() }<br>
// time to load: ${ ( performance.now() - FRX.timeStart ).toLocaleString() } ms`;

// 	}

};



FRX.loadHandler = function ( fName ){

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

	if ( fName.endsWith( ".zip" ) ) { FRX.load( ZIP, "zip-handler.js" ); return; }

};


FRX.load = function ( obj, parser ) {

	console.log( "FRX.path ", FRX.path  );

	if ( obj === undefined ) {

		//console.log( "obj", obj );
		scr = document.body.appendChild( document.createElement( 'script' ) );
		//scr.onload dealt with individually by each handler
		scr.src = COR.path + `js/handlers/${ parser }`;
		//scr.src = `js/handlers/${ parser }`;

	} else {

		obj.handle();

	}

	FRX.onProgress( FRX.file && FRX.file.size || 0, "Load complete" );

};


// template

// ZZZ.handle = function () {

// 	//console.log( "FRX.content", FRX.content.slice( 0, 100 ) );
// 	console.log( "FRX.file", FRX.file.name );
// 	console.log( "FRX.url", FRX.url.split( "/").pop() );

// 	if ( FRX.content ) { ZZZ.parse( FRX.content ); return; }

// 	if ( FRX.file ) { ZZZ.read(); return; }

// 	if ( FRX.url ) { ZZZ.onChange( FRX.url ); return; }

// };



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
 			<span class=attributeTitle >Bytes loaded</span>: <span class=attributeValue >${ FRX.size.toLocaleString() }</span></br>
			<span class=attributeTitle >Time to load</span>: <span class=attributeValue>${ FRX.timeToLoad } ms</span></br>
			${ note }
		</p>
	`;

	FRXdivLog.innerHTML = htm;

};

