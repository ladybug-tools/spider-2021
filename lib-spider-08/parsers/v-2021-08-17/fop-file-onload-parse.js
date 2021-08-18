FOP = {};

FOP.r3dmParser = undefined;
FOP.gbxmlParser = undefined;
FOP.gltfParser = undefined;
FOP.hbjsonParser = undefined;
FOP.idfParser = undefined;
FOP.objParser = undefined;
FOP.stlParser = undefined;
FOP.vtkParser = undefined;
FOP.zipParser = undefined;

FOP.onLoad = function ( fName ) {

	//console.log( "fop", fileName, string, files );

	if ( fName.endsWith( ".3dm" ) ) {

		if ( FOP.r3dmParser === undefined ) {

			//console.log( "fName 3dm", FOP.files.files[ 0 ] );

			FOP.r3dmParser = document.body.appendChild( document.createElement( 'script' ) );
			FOP.r3dmParser.onload = () => r3DM.read3DM( FRL.files );
			FOP.r3dmParser.src = COR.path + "lib-spider/3dm-parser/v-2021-08-13/3dm-parser.js";

		} else {

			r3DM.read3DM( FOP.files );

		}

		return;

	}



	if ( fName.endsWith( "gltf" ) || fName.endsWith( "glb" ) ) {

		if ( FOP.gltfParser === undefined ) {

			FOP.gltfParser = document.body.appendChild( document.createElement( 'script' ) );
			FOP.gltfParser.onload = () => GLTF.readGltf( FRL.files );
			FOP.gltfParser.src = COR.path + "lib-spider-08/parsers/v-2021-08-17/gltf-parser.js";

		} else {

			GLTF.readGltf( FRL.files );

		}

		return;

	}










	if ( fileName.endsWith( "xml" ) ) {

		if ( FOP.gbxmlParser === undefined ) {

			FOP.gbxmlParser = document.body.appendChild( document.createElement( 'script' ) );
			FOP.gbxmlParser.onload = () => GBX.parse( string );
			FOP.gbxmlParser.src = COR.path + "lib-spider-08/parsers/v-2021-08-17/gbx-gbxml-parser.js";

		} else {

			GBX.parse( string );

		}

	}

	if ( fileName.endsWith( "gltf" ) || fileName.endsWith( "glb" ) ) {

		if ( FOP.gltfParser === undefined ) {

			FOP.gltfParser = document.body.appendChild( document.createElement( 'script' ) );
			FOP.gltfParser.onload = () => GLTF.readGltf( FOP.files );
			FOP.gltfParser.src = COR.path + "lib-spider/gltf-parser/v-2021-08-13/gltf-parser.js";

		} else {

			GLTF.readGltf( FOP.files );

		}

		return;

	}

	if ( fileName.endsWith( "hbjson" ) ) {

		if ( FOP.hbjsonParser === undefined ) {

			FOP.hbjsonParser = document.body.appendChild( document.createElement( 'script' ) );
			FOP.hbjsonParser.onload = () => HBJ.processJson( string );
			FOP.hbjsonParser.src = COR.path + "lib-spider/hbj-hbjson-parser/v-2021-08-16/hbj-hbjson-parser.js";

		} else {

			HBJ.processJson( string );

		}

		return;

	}

	if ( fileName.endsWith( "idf" ) || fileName.endsWith( "osm" ) ) {

		if ( FOP.idfParser === undefined ) {

			FOP.idfParser = document.body.appendChild( document.createElement( 'script' ) );
			FOP.idfParser.onload = () => IDF.parseString( string );
			FOP.idfParser.src = COR.path + "lib-spider/idf-parser/v-2021-08-13/idf-parser.js";

		} else {

			IDF.parseString( string );

		}

		FOP.onProgress( FOP.file.size, "Load complete" );

		return;

	}

	if ( fileName.endsWith( ".obj" ) ) {

		if ( FOP.objParser === undefined ) {

			FOP.objParser = document.body.appendChild( document.createElement( 'script' ) );
			FOP.objParser.onload = () => OBJ.loadOBJ( FOP.files );
			FOP.objParser.src = COR.path + "lib-spider/obj-parser/v-2021-08-13/obj-parser.js";

		} else {

			OBJ.loadObj( FOP.files );

		}

		FOP.onProgress( FOP.file.size, "Load complete" );

		return;

	}

	if ( fileName.endsWith( ".stl" ) ) {

		if ( FOP.stlParser === undefined ) {

			FOP.stlParser = document.body.appendChild( document.createElement( 'script' ) );
			FOP.stlParser.onload = () => STL.loadSTL( FOP.files );
			FOP.stlParser.src = COR.path + "lib-spider/stl-parser/v-2021-08-13/stl-parser.js";

		} else {

			STL.loadSTL( FOP.files );

		}

		FOP.onProgress( FOP.file.size, "Load complete" );

		return;

	}

	if ( fileName.endsWith( "vtk" ) || fileName.endsWith( "vtp" ) ) {

		if ( FOP.vtkParser === undefined ) {

			FOP.vtkParser = document.body.appendChild( document.createElement( 'script' ) );
			FOP.vtkParser.onload = () => VTK.readVTK( FOP.files );
			FOP.vtkParser.src = COR.path + "lib-spider/vtk-parser/v-2021-08-13/vtk-parser.js";

		} else {

			VTK.readVTK( FOP.files );

		}

		return;

	}

	if ( fileName.endsWith( ".zip" ) ) {

		// FOP.dataZip = FOP.file;
		// //console.log( "name", FOP.file.name );
		// FOZ.onLoadFile();

	}
};
