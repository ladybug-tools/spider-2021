
const COR = {
	user: "ladybug-tools",
	repo: "spider-2021",
	branch: "master",
	defaultFile: "README.md",
	ignoreFolders: [],
	path: "../../",
}


function init () {

	const source = "https://github.com/theo-armour/2021/";

	const version = document.head.querySelector( "[ name=date ]" ).content;

	const description = document.head.querySelector( "[ name=description ]" ).content;



	//GOR.path = GRV.path = \

	MNU.path = "../../";

	MNU.init();

	aGithub.href = source;

	spnVersion.innerHTML = version;

	divDescription.innerHTML = description;

	GFF.init();
	GFF.source = "../../lib-spider/gff-github-folder-files/gff-gbxml.js";



	THR.init();

	THR.animate();

	THR.addLights();

	THR.addGround();

	THR.group = THR.getGroupNew();

	THRU.addMeshes( 100 );

	FOX.path = COR.path;
	FOX.defaultFile = COR.defaultFile;
	FOX.init();

	THR.zoomObjectBoundingSphere();

	// FOO.init();

	// FOO.extension = "json";
	// FOO.responseType = "json";
	// FOO.onLoadFile = PP.onLoadJson;

	// path = "../../assets/json/";

	// FOO.requestFile( path + "lab_building_result.json" );

	// JTV.init();

	//HRT.init();

	// if running on server, keeps address bar pointed to latest dev

	if ( !location.hash && location.protocol === "https:" ) {

		window.history.pushState( "", "", "../" );

	} else {

		THR.controls.autoRotate = false;

	}

};

