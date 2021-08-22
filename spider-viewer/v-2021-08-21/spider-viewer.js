// copyright 2021 Theo Armour. MIT license.
/* global THREE, COR */
// jshint esversion: 6
// jshint loopfunc: true

const COR = {
	user: "ladybug-tools",
	repo: "spider-2021",
	branch: "main",
	path: "../../",
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
Online interactive <a href="https://www.gbxml.org" target="_blank">gbXML</a> in 3D viewer in your browser
designed to be forked, hacked and remixed using the WebGL and the
<a href="https://threejs.org" target="_blank">Three.js</a> JavaScript library`;


COR.files = [
	"https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/gbxml-sample-files/files-open-fast/annapolis-md-single-family-residential-2016.xml",
	"https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/gbxml-sample-files/files-open-fast/8-a.xml",
	"https://cdn.jsdelivr.net/gh/GreenBuildingXML/Sample-gbXML-Files@master/ConferenceCenter%20(Older).xml",
	"https://cdn.jsdelivr.net/gh/GreenBuildingXML/Sample-gbXML-Files@master/gbXML_TRK.xml",
	"https://cdn.jsdelivr.net/gh/ladybug-tools/spider@master/gbxml-sample-files/zip/bilt-2019-template.zip",
	"https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/gbxml-sample-files/bristol-clifton-downs-fixed.xml",
	"https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/gbxml-sample-files/bristol-clifton-down-road-utf16.xml",
	"https://cdn.jsdelivr.net/gh/ladybug-tools/spider@master/gbxml-sample-files/zip/warwick-university-5k-surfaces.zip",
	"https://cdn.jsdelivr.net/gh/ladybug-tools/spider@master/gbxml-sample-files/annapolis-md-single-family-residential-2016.xml",
	"https://cdn.jsdelivr.net/gh/ladybug-tools/spider@master/gbxml-sample-files/zip/pittsburg-airport.zip",
	"https://www.ladybug.tools/spider/gbxml-sample-files/aspen-co-resort-retail.xml",
	"https://www.ladybug.tools/spider/gbxml-sample-files/samples-2/Berlin_Office_SAM2017.xml",
	"https://GreenBuildingXML.github.io/Sample_gbXML_Files/ChapelHillOffice.xml",
	"https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/gbxml-sample-files/samples-2/18141-M18.xml",
	"https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/gbxml-sample-files/revit-sample-files/2020_rac_advanced_sample_project.xml",
	"https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/idf-sample-files/2020/HospitalLowEnergy.idf",
	"../../lib-spider/idf-parser/HospitalLowEnergy.idf",
	"../../lib-spider/gltf-parser/Duck1.gltf",
	"https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/hbjson-sample-files/2021/Lab_Building.hbjson"

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

	//GOR.path = GRV.path = \

	MNU.path = "../../";
	MNU.init();

	CORdivStats.innerHTML = `
<p
	title="View number of objects that need rendering and total number of triangles used to create objects">
	<button onclick="THR.setStats()">View renderer statistics</button>
</p>`;


	sumNavMenu.hidden = false;

	//FRX.init();

	GFF.init();
	//GFF.source = "../../lib-spider/gff-github-folder-files/gff-multiple.js";

	EXP.init();

	THR.init();

	THR.animate();

	THR.addLights();

	THR.addGround();

	THR.group = THR.getGroupNew();

	//THRR.init();

	//THRU.addMeshes( 100 );
	//THR.zoomObjectBoundingSphere();

	FRX.init();
	FRX.defaultFile = COR.files[ 18 ];
	FRX.onHashChange();

	TXT.init();

	// if running on server, keep address bar pointed to latest rev

	if ( !location.hash && location.protocol === "https:" ) {

		window.history.pushState( "", "", "../" );

		COR.path = "https://www.ladybug.tools/spider-2021/";

	} else {

		COR.path = "../../";

		THR.controls.autoRotate = false;

	}

};


COR.reset = function ( meshes = [] ) {

	if ( chkNewFile.checked ) { THR.group = THR.getGroupNew(); }

	meshes.forEach( mesh => {

		const child = new THREE.Group();
		child.add( mesh );
		child.name = mesh.name;
		THR.group.add( child );

	} )


	THR.zoomObjectBoundingSphere();
	//THRU.toggleBoundingBoxHelper();

	THRR.init();

	// dragControls = new THREE.DragControls( [ child ], THR.camera, THR.renderer.domElement );
	// dragControls.transformGroup = true;
	// dragControls.addEventListener( 'dragstart', function ( event ) { THR.controls.enabled = false; } );
	// dragControls.addEventListener( 'dragend', function ( event ) { THR.controls.enabled = true; } );

};