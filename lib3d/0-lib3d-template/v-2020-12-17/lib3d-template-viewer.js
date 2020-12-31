
const source = "https://github.com/pushme-pullyou/too-too-2020/tree/master/lib3d-template-viewer"

const version = "v-2020-12-17";

const description = document.head.querySelector( "[ name=description ]" ).content;

const icon = `<img style=color: teal; title = "Your AEC 3D viewer happy place!" height = "24" width = "24"; src = "https://ladybug.tools/artwork/icons_bugs/ico/spider.ico" >`

//const urlDefault = "README.md";

function init () {

	aGithub.href = source;

	spnVersion.innerHTML = version;

	divDescription.innerHTML = description;

	aMenuFooter.innerHTML = icon;




	THR.init();

	THR.animate();

	THR.addLights();

	THR.addGround();

	THR.group = THR.setSceneNew();

	THRU.addMeshes(100);

	THRR.updateScene();

	// FOO.init();

	// FOO.extension = "json";
	// FOO.responseType = "json";
	// //FOO.onLoadFile = PP.onLoadJson;

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

