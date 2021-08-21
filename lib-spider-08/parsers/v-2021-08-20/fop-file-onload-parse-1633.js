// copyright 2021 Theo Armour. MIT license.
/* global COR, FRL, r3DM, GBX, GLTF, HBJ, IDF, OBJ, STL, VTK */
// jshint esversion: 6
// jshint loopfunc: true

const FOP = {};

FOP.path = "lib-spider-08/parsers/v-2021-08-18/";


FOP.handleFiles = function ( fileName ) {

	console.log( "fop", fileName );

	if ( fileName.endsWith( ".3dm" ) ) {

		loadLoader( r3DM, "3dm-parser.js" );

		return;

	}



	if ( fileName.endsWith( "xml" ) ) {

		loadLoader( COR.gbxmlParser, "gbx-gbxml-parser..js" );

		// if ( COR.gbxmlParser === undefined ) {

		// 	COR.gbxmlParser = document.body.appendChild( document.createElement( 'script' ) );
		// 	COR.gbxmlParser.onload = () => GBX.read( FRL.files );
		// 	COR.gbxmlParser.src = COR.path + FOP.path + "gbx-gbxml-parser.js";

		// } else {

		// 	GBX.read( FRL.files );

		// }

		// FRL.onProgress( FRL.file.size, "Load complete" );

		return;

	}


	if ( fileName.endsWith( "gltf" ) || fileName.endsWith( "glb" ) ) {

		if ( COR.gltfParser === undefined ) {

			COR.gltfParser = document.body.appendChild( document.createElement( 'script' ) );
			COR.gltfParser.onload = () => GLTF.read( FRL.files );
			COR.gltfParser.src = COR.path + FOP.path + "gltf-parser.js";

		} else {

			GLTF.read( FRL.files );

		}

		FRL.onProgress( FRL.file.size, "Load complete" );

		return;

	}


	if ( fileName.endsWith( "hbjson" ) ) {

		if ( COR.hbjsonParser === undefined ) {

			COR.hbjsonParser = document.body.appendChild( document.createElement( 'script' ) );
			COR.hbjsonParser.onload = () => HBJ.read( FRL.files );
			COR.hbjsonParser.src = COR.path + FOP.path + "hbj-hbjson-parser.js";

		} else {

			HBJ.read( FRL.files );

		}

		FRL.onProgress( FRL.file.size, "Load complete" );

		return;

	}


	if ( fileName.endsWith( ".idf" ) || fileName.endsWith( ".osm" ) ) {

		if ( COR.idfParser === undefined ) {

			COR.idfParser = document.body.appendChild( document.createElement( 'script' ) );
			COR.idfParser.onload = () => IDF.read( FRL.files );
			COR.idfParser.src = COR.path + FOP.path + "idf-parser.js";

		} else {

			IDF.read( FRL.files );

		}

		FRL.onProgress( FRL.file.size, "Load complete" );

		return;

	}

	if ( fileName.endsWith( ".obj" ) ) {

		if ( COR.objParser === undefined ) {

			COR.objParser = document.body.appendChild( document.createElement( 'script' ) );
			COR.objParser.onload = () => OBJ.read( FRL.files );
			COR.objParser.src = COR.path + FOP.path + "obj-parser.js";

		} else {

			OBJ.read( FRL.files );

		}

		FRL.onProgress( FRL.file.size, "Load complete" );

		return;

	}


	if ( fileName.endsWith( ".rad" ) ) {

		if ( COR.objParser === undefined ) {

			COR.objParser = document.body.appendChild( document.createElement( 'script' ) );
			COR.objParser.onload = () => RAD.read( FRL.files );
			COR.objParser.src = COR.path + FOP.path + "rad-parser.js";

		} else {

			RAD.read( FRL.files );

		}

		FRL.onProgress( FRL.file.size, "Load complete" );

		return;

	}


	if ( fileName.endsWith( ".stl" ) ) {

		if ( COR.stlParser === undefined ) {

			COR.stlParser = document.body.appendChild( document.createElement( 'script' ) );
			COR.stlParser.onload = () => STL.read( FRL.files );
			COR.stlParser.src = COR.path + FOP.path + "stl-parser.js";

		} else {

			STL.read( FRL.files );

		}

		FRL.onProgress( FRL.file.size, "Load complete" );

		return;

	}

	if ( fileName.endsWith( ".vtk" ) || fileName.endsWith( ".vtp" ) ) {

		if ( COR.vtkParser === undefined ) {

			COR.vtkParser = document.body.appendChild( document.createElement( 'script' ) );
			COR.vtkParser.onload = () => VTK.read( FRL.files );
			COR.vtkParser.src = COR.path + FOP.path + "vtk-parser.js";

		} else {

			VTK.read( FRL.files );

		}

		FRL.onProgress( FRL.file.size, "Load complete" );

		return

	}

	if ( fileName.endsWith( ".zip" ) ) {

		// FOP.dataZip = FOP.file;
		// //console.log( "name", FOP.file.name );
		// FOZ.onLoadFile();

	}
};



FOP.loadLoader = function ( obj, parser ) {

	if ( obj === undefined ) {

		scr = document.body.appendChild( document.createElement( 'script' ) );
		scr.src = COR.path + FOP.path + parser;

	} else {

		obj.read( FRL.files );

	}

	FRL.onProgress( FRL.file.size, "Load complete" );

};