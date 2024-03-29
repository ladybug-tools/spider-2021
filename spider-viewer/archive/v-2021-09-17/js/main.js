

// This places is becoming very messy

const COR = {
	user: "ladybug-tools",
	repo: "spider-2021",
	branch: "main",
	path: "../",
	//pathTooToo: "../../../pushme-pullyou-tootoo-2021/",
	pathTooToo: "https://pushme-pullyou.github.io/tootoo-2021/",
	defaultFile: "../../home-page.md",
	defaultIgnoreFolders: [],
	//ignoreFolders: ["archive", "lib", "lib3d", "lib-templates"],
	filterFiles: [ "gif", "md", "jpg", "html", "license", "pdf", "png", "svg", "txt" ],
	urlSource: "https://github.com/ladybug-tools/spider-2021/tree/main/spider-viewer",
	urlAssets: "https://pushme-pullyou.github.io/tootoo-2021/",
	iconGitHub: `<img src="https://pushme-pullyou.github.io/tootoo-2021/lib/assets/icons/mark-github.svg">`,
	iconInfo: `<img class=infoImg src="https://pushme-pullyou.github.io/tootoo-2021/lib/assets/icons/noun_Information_585560.svg">`,
	iconExternalFile: `<img class=infoImg  src="https://pushme-pullyou.github.io/tootoo-2021/lib/assets/icons/icon-external-link.svg">`,
	iconPencil: `<img class=infoImg  src="https://pushme-pullyou.github.io/tootoo-2021/lib/assets/icons/icon-pencil-edit.svg">`,
	title: document.title ? document.title : location.href.split( "/" ).pop().slice( 0, - 5 ).replace( /-/g, " " ),
	version: document.head.querySelector( "[ name=date ]" ).content,
	description: document.head.querySelector( "[ name=description ]" ).content,
};



COR.files = [
	"https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/gbxml-sample-files/revit-sample-files/2020_rac_advanced_sample_project.xml",
	"https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/gbxml-sample-files/files-open-fast/annapolis-md-single-family-residential-2016.xml",
	"https://cdn.jsdelivr.net/gh/GreenBuildingXML/Sample-gbXML-Files@master/gbXML_TRK.xml",
	"https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/3dm-sample-files/heart_signet.3dm",
	"https://cdn.jsdelivr.net/gh/ladybug-tools/honeybee-schema@master/samples/model_large/single_family_home.hbjson",
	"https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/hbjson-sample-files/2021/b10d47.hbjson",
	"https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/hbjson-sample-files/2021/2bo0tugx.rzj.hbjson",
	"https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/gltf-sample-files/2021/Avocado.glb",
	"https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/idf-sample-files/2020/2020-06-08-michal.idf",
	"https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/obj/female02.obj",
	"https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/rad-sample-files/various-sources/DaylightingJSONTestBuilding.rad",
	"https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/stl-samples/Geometric_Knot.stl",
	"https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/hbjson-sample-files/Spider_Df_file.3dm"

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



function init () {

	// if running on server, keep address bar pointed to latest rev

	if ( !location.hash && location.protocol === "https:" ) {

		window.history.pushState( "", "", "../" );

		COR.path = "../";

	} else {

		COR.path = "../../";

		//THR.controls.autoRotate = false;

	}

	THR.init();

	THR.animate();

	THR.addLights();

	THR.addGround();

	THRU.resetScene()

	//THR.group = THR.getGroupNew();
	//THRU.addMeshes( 100 );
	//THR.zoomObjectBoundingSphere();

	// Items generally loaded in order of appearance on the menu

	MNU.init();
	sumNavMenu.hidden = false;


	//CKE.init();

	FRX.init();
	FRX.defaultFile = COR.files[ 5 ];

	GRA.init();

	GFF.init();
	//GFFdet.open = true;


	// //GRV.getFiles = GRV.getFilesAll;
	// GRV.getFiles = GRV.getFilesCurated;
	// GRV.init();
	// GRVdet.open = true;
	// //GRVsumRepo.hidden = true;


	JTI.init(); // Json Tree View

	SSO.init(); // Set surface type opacity
	//SSOdet.open = true;

	EXP.init(); // Export

	FRX.onHashChange();

	FRX.onProgress( FRX.size || 0, "Load complete" );


	THR.initStats();

	//AMF.addFiles();

	SSL.init();  // Splash Screen Loader

	DBD.init()

};




COR.reset = function ( obj = [] ) {

	if ( chkNewFile.checked ) { THR.group = THR.getGroupNew(); }


	THR.group.name = "THR.groupsParent";

	const objects = Array.isArray( obj ) ? obj : [ obj ];

	const meshes = objects.filter( mesh => mesh.type === "Mesh" );

	const groups = objects.filter( obj => obj.type === "Group" );

	if ( groups.length ) {

		THR.group.add( ...groups.children );
		console.log( "groups", groups  );
	}

	model = new THREE.Group();

	model.name = FRX.fileName;
	model.userData.extension = FRX.extension;
	model.userData.url = FRX.url || "";

	model.add( ...meshes );

	THR.group.add( model );

	scene.traverse( function ( object ) {

		if ( object.isMesh ) {

			object.geometry.computeVertexNormals();
			object.receiveShadow = object.castShadow = true;
			object.material.side = 2;
			object.material.needsUpdate = true;

		}

	} );


	THR.zoomObjectBoundingSphere();

	THRR.init(); // Three Raycaster

	//console.log( "model", model );

	if ( chkNewFile.checked === false ) {

		THR.dragControls = new THREE.DragControls( [ model ], THR.camera, THR.renderer.domElement );

		THR.dragControls.transformGroup = true;
		THR.dragControls.addEventListener( 'dragstart', function ( event ) { THR.controls.enabled = false; } );
		THR.dragControls.addEventListener( 'dragend', function ( event ) { THR.controls.enabled = true; } );

	}

	JTVdet.open = false;
	JTVdivJsonTree.innerHTML = "";



};


COR.addDragControls = function () {

	THR.dragControls = new THREE.DragControls( [ model ], THR.camera, THR.renderer.domElement );

	THR.dragControls.transformGroup = true;
	THR.dragControls.addEventListener( 'dragstart', function ( event ) { THR.controls.enabled = false; } );
	THR.dragControls.addEventListener( 'dragend', function ( event ) { THR.controls.enabled = true; } );



}
