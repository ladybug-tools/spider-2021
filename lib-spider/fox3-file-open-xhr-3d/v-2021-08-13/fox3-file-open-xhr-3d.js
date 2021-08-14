// copyright 2021 Theo Armour. MIT license.
/* global  */
// jshint esversion: 6
// jshint loopfunc: true


const FOX = {};

FOX.documentTitle = document.title;


FOX.init = function ( { defaultFile = "README.md", path = "../../../" } = {} ) {

	FOX.defaultFile = defaultFile;
	//FOX.path = path;
	window.addEventListener( "hashchange", FOX.onHashChange );

};



FOX.onHashChange = function () {
	//console.log( "path", FOX.path );

	FOX.timeStart = performance.now();
	const fileName = location.hash ? location.hash.slice( 1 ) : FOX.defaultFile;
	const fileTitle = fileName.split( "/" ).pop();
	FOX.extension = fileTitle.toLowerCase().split( '.' ).pop();
	FOX.url = fileName;

	//console.log( "FOX url", FOX.url );


	if ( FOX.extension === "3dm" ) {

		if ( FOX.r3dmParser === undefined ) {

			FOX.r3dmParser = document.body.appendChild( document.createElement( 'script' ) );
			FOX.r3dmParser.onload = () => r3DM.init( fileName );
			FOX.r3dmParser.src = "../../lib-spider/3dm-parser/v-2021-08-13/3dm-parser.js";

		} else {

			r3DM.init( fileName );

		}

		return;

	}

	if ( [ "gif", "jpg", "png", "svg" ].includes( FOX.extension ) ) {

		divContentMain.innerHTML = `<a href=${ FOX.url } title="Open this image in a new window" target="_blank" ><img src="${ url }" style=max-width:100% ></a>`;

		return;

	}

	if ( FOX.extension === "xml" || FOX.extension === "gbxml" ) {

		//GBX.parseResponse( FOX.string );

		GBX.onChange( fileName )

	}

	if ( FOX.extension === "gltf" || FOX.extension === "glb" ) {

		if ( FOX.gltfParser === undefined ) {

			FOX.gltfParser = document.body.appendChild( document.createElement( 'script' ) );
			FOX.gltfParser.onload = () => GLTF.init( fileName );
			FOX.gltfParser.src = "../../lib-spider/gltf-parser/v-2021-01-29/gltf-parser.js";

		} else {

			GLTF.init( fileName );

		}

		return;

	}

	if ( FOX.extension === "hbjson" ) {

		//GBX.parseResponse( FOX.string );

		if ( FOX.hbjsonParser === undefined ) {

			FOX.hbjsonParser = document.body.appendChild( document.createElement( 'script' ) );
			FOX.hbjsonParser.onload = () => HBJ.init( fileName );
			FOX.hbjsonParser.src = "../../lib-spider/hbj-hbjson-parser/v-2021-08-13/hbj-hbjson-parser.js";

		} else {

			HBJ.init( fileName );

		}

		return;

	}

	if ( FOX.extension === "idf" || FOX.extension === "osm" ) {

		if ( FOX.idfParser === undefined ) {

			FOX.idfParser = document.body.appendChild( document.createElement( 'script' ) );
			FOX.idfParser.onload = () => IDF.init( fileName );
			FOX.idfParser.src = "../../lib-spider/idf-parser/v-2021-08-13/idf-parser.js";

		} else {

			IDF.init( fileName );

		}

		return;

	}

	if ( FOX.extension === "obj" ) {

		if ( FOX.objParser === undefined ) {

			FOX.objParser = document.body.appendChild( document.createElement( 'script' ) );
			FOX.objParser.onload = () => OBJ.init( fileName );
			FOX.objParser.src = "../../lib-spider/obj-parser/v-2021-08-13/obj-parser.js";

		} else {

			OBJ.init( fileName );

		}

		return;

	}


	if ( FOX.extension === "stl" ) {

		if ( FOX.stlParser === undefined ) {

			FOX.stlParser = document.body.appendChild( document.createElement( 'script' ) );
			FOX.stlParser.onload = () => STL.init( fileName );
			FOX.stlParser.src = "../../lib-spider/stl-parser/v-2021-08-13/stl-parser.js";

		} else {

			STL.init( fileName );

		}

		return;

	}


	if ( FOX.extension === "vtk" ) {

		if ( FOX.vtkParser === undefined ) {

			FOX.vtkParser = document.body.appendChild( document.createElement( 'script' ) );
			FOX.vtkParser.onload = () => VTK.init( fileName );
			FOX.vtkParser.src = "../../lib-spider/vtk-parser/v-2021-08-13/vtk-parser.js";

		} else {

			VTK.init( fileName );

		}

		return;

	}

	if ( FOX.extension === "zip" ) {

		FOX.dataZip = FOX.string;
		FOZ.onLoadFile();

		return;

	}

	//divContentMain.innerHTML = `<iframe src="${ FOX.url }" height=${ window.innerHeight } width=100% ></iframe>`;

};

