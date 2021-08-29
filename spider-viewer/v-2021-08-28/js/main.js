// copyright 2021 Theo Armour. MIT license.
/* global THREE, COR */
// jshint esversion: 6
// jshint loopfunc: true

const COR = {
	user: "ladybug-tools",
	repo: "spider-2021",
	branch: "main",
	//path: "../../",
	//pathJs: "spider-viewer/v-2021-08-27/js/handlers/",
	defaultFile: "README.md",
	ignoreFolders: [],
	//ignoreFolders: ["archive", "lib", "lib3d", "lib-templates"],
	filterFiles: [ "gif", "md", "jpg", "html", "license", "pdf", "png", "svg", "txt" ],
	urlSource: "https://github.com/ladybug-tools/spider-2021/tree/main/spider-viewer",
	urlAssets: "https://pushme-pullyou.github.io/tootoo-2021/",
	iconGitHub: `<img src="https://pushme-pullyou.github.io/tootoo-2021/lib/assets/icons/mark-github.svg">`,
	iconInfo: `<img class=infoImg src="https://pushme-pullyou.github.io/tootoo-2021/lib/assets/icons/noun_Information_585560.svg">`,
	iconExternalFile: `<img class=infoImg  src="https://pushme-pullyou.github.io/tootoo-2021/lib/assets/icons/icon-external-link.svg">`,
	title: document.title ? document.title : location.href.split( "/" ).pop().slice( 0, - 5 ).replace( /-/g, " " ),
	version: document.head.querySelector( "[ name=date ]" ).content,
	description: document.head.querySelector( "[ name=description ]" ).content,
};

const description = `
Online interactive <a href="https://www.gbxml.org" target="_blank">gbXML</a>
in 3D viewer in your browser,
designed to be forked, hacked and remixed using the WebGL and the
<a href="https://threejs.org" target="_blank">Three.js</a> JavaScript library`;


COR.files = [
	"https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/gbxml-sample-files/revit-sample-files/2020_rac_advanced_sample_project.xml",
	"https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/gbxml-sample-files/files-open-fast/annapolis-md-single-family-residential-2016.xml",
	"https://cdn.jsdelivr.net/gh/GreenBuildingXML/Sample-gbXML-Files@master/gbXML_TRK.xml",
	"https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/3dm-sample-files/heart_signet.3dm",
	"https://cdn.jsdelivr.net/gh/ladybug-tools/honeybee-schema@master/samples/model_large/single_family_home.hbjson",
	"https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/gltf-sample-files/2021/Avocado.glb",
	"https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/idf-sample-files/2020/2020-06-08-michal.idf",
	"https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/obj/female02.obj",
	"https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/rad-sample-files/various-sources/DaylightingJSONTestBuilding.rad",
	"https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/stl-samples/Geometric_Knot.stl"

	//"https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/gbxml-sample-files/files-open-fast/8-a.xml",
	//"https://cdn.jsdelivr.net/gh/ladybug-tools/spider@master/gbxml-sample-files/zip/bilt-2019-template.zip",
	// "https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/gbxml-sample-files/bristol-clifton-downs-fixed.xml",
	// "https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/gbxml-sample-files/bristol-clifton-down-road-utf16.xml",
	// "https://cdn.jsdelivr.net/gh/ladybug-tools/spider@master/gbxml-sample-files/zip/warwick-university-5k-surfaces.zip",
	// "https://cdn.jsdelivr.net/gh/ladybug-tools/spider@master/gbxml-sample-files/annapolis-md-single-family-residential-2016.xml",
	// "https://cdn.jsdelivr.net/gh/ladybug-tools/spider@master/gbxml-sample-files/zip/pittsburg-airport.zip",
	//"https://www.ladybug.tools/spider/gbxml-sample-files/aspen-co-resort-retail.xml",
	//"https://www.ladybug.tools/spider/gbxml-sample-files/samples-2/Berlin_Office_SAM2017.xml",
	// "https://GreenBuildingXML.github.io/Sample_gbXML_Files/ChapelHillOffice.xml",
	// "https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/gbxml-sample-files/samples-2/18141-M18.xml",
	// "https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/idf-sample-files/2020/HospitalLowEnergy.idf",
	// "../../lib-spider/idf-parser/HospitalLowEnergy.idf",
	//"../../lib-spider/gltf-parser/Duck1.gltf",
	//"https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/hbjson-sample-files/2021/Lab_Building.hbjson"

];


let r3DM = undefined;
let GBX = undefined;
let GLTF = undefined;
let HBJ = undefined;
let IDF = undefined;
let OBJ = undefined;
let RAD = undefined;
let STL = undefined;
let VTK = undefined;
let ZIP = undefined;


function init () {


	//MNU.path = "../../";
	MNU.init();

	CORdivStats.innerHTML = `
<p
	title="View number of objects that need rendering and total number of triangles used to create objects">
	<button onclick="THR.setStats()">View renderer statistics</button>
</p>`;


	sumNavMenu.hidden = false;

	GFF.init();
	//GFF.source = "../../lib-spider/gff-github-folder-files/gff-multiple.js";

	EXP.init();

	THR.init();

	THR.animate();

	THR.addLights();

	THR.addGround();

	THR.group = THR.getGroupNew();

	//THRU.addMeshes( 100 );
	//THR.zoomObjectBoundingSphere();

	FRX.init();
	FRX.defaultFile = COR.files[ 0 ];


	window.addEventListener( "dragenter", dragenter, false );
	window.addEventListener( "dragover", dragover, false );
	window.addEventListener( "drop", drop, false );

	TXT.init();

	// if running on server, keep address bar pointed to latest rev

	if ( !location.hash && location.protocol === "https:" ) {

		window.history.pushState( "", "", "../" );

		COR.path = `./v-${ COR.version }/`; //`https://www.ladybug.tools/spider-2021/v-${ COR.version }/`;

	} else {


		//COR.path = `https://www.ladybug.tools/spider-2021/v-${ COR.version }/`;
		COR.path = "./"; // `./v-${ COR.version }/`;

		THR.controls.autoRotate = false;

	}

	GFF.init();
	FRX.onHashChange();

};


function dragenter ( event ) {
	event.stopPropagation();
	event.preventDefault();
}

function dragover ( event ) {
	event.stopPropagation();
	event.preventDefault();
}

function drop ( event ) {
	event.stopPropagation();
	event.preventDefault();

	FRX.onInputFile( event.dataTransfer );
}



COR.reset = function ( obj = [] ) {

	if ( chkNewFile.checked ) { THR.group = THR.getGroupNew(); }

	objs = Array.isArray( obj ) ? obj : [ obj ];

	const meshes = objs.filter( mesh => mesh.type === "Mesh" );

	// if ( !!meshes.length ) {

	// 	const meshGroup = new THREE.Group();
	// 	meshGroup.add( ...meshes );
	// 	THR.group.add( meshGroup );

	// }
	// //console.log( "meshes", meshes );

	const groups = objs.filter( obj => obj.type === "Group" );

	if ( groups.length ) {

		THR.group.add( ...groups.children );
		console.log( "groups", groups  );
	}


	const model = new THREE.Group();
	model.add( ...meshes );

	THR.group.add( model );

	THR.zoomObjectBoundingSphere();
	//THRU.toggleBoundingBoxHelper();

	THRR.init();

	dragControls = new THREE.DragControls( [ model ], THR.camera, THR.renderer.domElement );

	dragControls.transformGroup = true;
	dragControls.addEventListener( 'dragstart', function ( event ) { THR.controls.enabled = false; } );
	dragControls.addEventListener( 'dragend', function ( event ) { THR.controls.enabled = true; } );

	FRX.onProgress( FRX.size || 0, "Load complete" );

};
COR.index = 1;

COR.test = function () {

	setInterval( COR.run, 3000 );

};


COR.run = function () {

	if ( COR.index < COR.files.length ) {

		location.hash = COR.files[ COR.index++ ];

	}
}



