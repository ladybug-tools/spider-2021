// copyright 2021 Theo Armour. MIT license.
/* global */
// jshint esversion: 6
// jshint loopfunc: true


const FRL = {};

//FRL.r3dmParser = undefined;
FRL.gltfParser = undefined;
FRL.idfParser = undefined;
FRL.objParser = undefined;
FRL.stlParser = undefined;
FRL.vtkParser = undefined;

FRL.init = function () {


	FRLdivMenuFileRead.innerHTML = `
<details id=detFile>

	<summary class="summary-primary gmd-1" title="View selected items">
		File menu

		<span class="info">
			<img class=infoImg src="../../lib/assets/icons/noun_Information_585560.svg">
			<div class="infoTooltip gmd-5">
				<div>
					Open <a href="http://gbxml.org" target="_blank">gbXML</a>,
					gLTF, IDF & OSM, OBJ, STL, VTK Files
				</div>
				<!-- <p><a href="https://www.energyplus.net/" target="_blank">EnergyPlus</a> IDF and OSM files</p> -->
			</div>
		</span>

	</summary>

	<div id=FRdivMenuFileReader> </div>

	<p>
		<input type=file id=FRLinpFile onchange=FRL.readFile(this); accept="*">
	</p>

	<div id=FRLdivLog></div>

	<div id=FOZdivFileOpenZip></div>

</details>`;

};



FRL.readFile = function ( files ) {

	FRL.timeStart = performance.now();
	FRL.files = files;
	FRL.file = FRL.files.files[ 0 ];

	FRL.reader = new FileReader();
	FRL.reader.onload = FRL.onLoad;

	FRL.reader.readAsText( FRL.file );

};


FRL.onLoad = function () {

	console.log( "file", FRL.file );

	FRL.fileName = FRL.file.name;
	FRL.hostName = FRL.file.type;

	string = FRL.reader.result;
	//console.log( "", string );

	const fname = FRL.file.name.toLowerCase();

	if ( fname.endsWith( ".zip" ) ) {

		// FRL.dataZip = FRL.file;
		// //console.log( "name", FRL.file.name );
		// FOZ.onLoadFile();

	}


	if ( fname.endsWith( ".3dm" ) ) {

		if ( FRL.r3dmParser === undefined ) {

			console.log( "", fname );

			FRL.r3dmParser = document.body.appendChild( document.createElement( 'script' ) );
			FRL.r3dmParser.onload = () => r3DM.read3DM( FRL.files );
			FRL.r3dmParser.src = "../../lib-spider/3dm-parser/v-2021-08-12/3dm-parser.js";

		} else {

			r3DM.read3DM( FRL.files );

		}

		return;

	}


	if ( fname.endsWith( "xml" ) ) {

		GBX.parseResponse( string );

		FRL.onProgress( FRL.file.size, "Load complete" );

		return;

	}

	if ( fname.endsWith( "gltf" ) || fname.endsWith( "glb" ) ) {

		if ( FRL.gltfParser === undefined ) {

			FRL.gltfParser = document.body.appendChild( document.createElement( 'script' ) );
			FRL.gltfParser.onload = () => GLTF.readGltf( FRL.files );
			FRL.gltfParser.src = "https://www.ladybug.tools/spider-2021/lib-spider/gltf-parser/v-2021-01-29/gltf-parser.js";

		} else {

			GLTF.readGltf( FRL.files );

		}

		return;

	}

	if ( fname.endsWith( "idf" ) || fname.endsWith( "osm" ) ) {

		if ( FRL.idfParser === undefined ) {

			FRL.idfParser = document.body.appendChild( document.createElement( 'script' ) );
			FRL.idfParser.onload = () => IDF.parseString( string );
			FRL.idfParser.src = "../../lib-spider/idf-parser/v-2021-08-11/idf-parser.js";

		} else {

			IDF.parseString( string );

		}

		FRL.onProgress( FRL.file.size, "Load complete" );

		return;

	}

	if ( fname.endsWith( ".obj" ) ) {

		if ( FRL.objParser === undefined ) {

			FRL.objParser = document.body.appendChild( document.createElement( 'script' ) );
			FRL.objParser.onload = () => OBJ.loadOBJ( FRL.files );
			FRL.objParser.src = "https://www.ladybug.tools/spider-2021/lib-spider/obj-parser/v-2021-01-30/obj-parser.js";

		} else {

			OBJ.loadObj( FRL.files );

		}

		FRL.onProgress( FRL.file.size, "Load complete" );

		return;

	}

	if ( fname.endsWith( ".stl" ) ) {

		if ( FRL.stlParser === undefined ) {

			FRL.stlParser = document.body.appendChild( document.createElement( 'script' ) );
			FRL.stlParser.onload = () => STL.loadSTL( FRL.files );
			FRL.stlParser.src = "https://www.ladybug.tools/spider-2021/lib-spider/stl-parser/v-2021-01-30/stl-parser.js";

		} else {

			STL.loadSTL( FRL.files );

		}

		FRL.onProgress( FRL.file.size, "Load complete" );

		return;

	}

	if ( fname.endsWith( "vtk" ) || fname.endsWith( "vtp" ) ) {

		if ( FRL.vtkParser === undefined ) {

			FRL.vtkParser = document.body.appendChild( document.createElement( 'script' ) );
			FRL.vtkParser.onload = () => VTK.readVTK( FRL.files  );
			FRL.vtkParser.src = "https://www.ladybug.tools/spider-2021/lib-spider/vtk-parser/v-2021-01-27/vtk-parser.js";

		} else {

			VTK.readVTK( FRL.files );

		}

		return;

	}
};


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
