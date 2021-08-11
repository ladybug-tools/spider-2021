
const COR = {
	user: "ladybug-tools",
	repo: "spider-2021",
	branch: "main",
	defaultFile: "README.md",
	ignoreFolders: [],
	path: "../../",
}


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
	"https://www.ladybug.tools/spider/gbxml-sample-files/bristol-clifton-downs-fixed.xml",
	"https://www.ladybug.tools/spider/gbxml-sample-files/bristol-clifton-down-road-utf16.xml",
	"https://cdn.jsdelivr.net/gh/ladybug-tools/spider@master/gbxml-sample-files/zip/warwick-university-5k-surfaces.zip",
	"https://cdn.jsdelivr.net/gh/ladybug-tools/spider@master/gbxml-sample-files/annapolis-md-single-family-residential-2016.xml",
	"https://cdn.jsdelivr.net/gh/ladybug-tools/spider@master/gbxml-sample-files/zip/pittsburg-airport.zip",
	"https://www.ladybug.tools/spider/gbxml-sample-files/aspen-co-resort-retail.xml",
	"https://www.ladybug.tools/spider/gbxml-sample-files/samples-2/Berlin_Office_SAM2017.xml",
	"https://GreenBuildingXML.github.io/Sample_gbXML_Files/ChapelHillOffice.xml",
	"https://cdn.jsdelivr.net/gh/ladybug-tools/spider@master/gbxml-sample-files/samples-2/18141-M18.xml",
	"https://www.ladybug.tools/3d-models/gbxml-sample-files/revit-sample-files/2020_rac_advanced_sample_project.xml",
	"https://ladybug.tools/3d-models/idf-sample-files/2020/HospitalLowEnergy.idf"


];

function init () {

	const source = "https://github.com/ladybug-tools/spider-2021/tree/main/spider-viewer";

	const version = document.head.querySelector( "[ name=date ]" ).content;

	const description = document.head.querySelector( "[ name=description ]" ).content;



	//GOR.path = GRV.path = \

	MNU.path = "../../";

	MNU.init();

	aGithub.href = source;

	spnVersion.innerHTML = version;

	divDescription.innerHTML = description;

	FRL.init();

	GFF.init();
	GFF.source = "../../lib-spider/gff-github-folder-files/gff-multiple.js";

	EXP.init();

	THR.init();

	THR.animate();

	THR.addLights();

	THR.addGround();

	THR.group = THR.getGroupNew();

	//THRU.addMeshes( 100 );
	//THR.zoomObjectBoundingSphere();

	// FOX.path = COR.path;
	FOX.init();
	FOX.defaultFile = COR.files[ 14 ]
	FOX.onHashChange();

	TXT.init();

	//GBX.init();
	//GBX.onHashChange();
	//location.hash = COR.files[ 14 ];

	// if running on server, keep address bar pointed to latest rev

	if ( !location.hash && location.protocol === "https:" ) {

		window.history.pushState( "", "", "../" );

	} else {

		THR.controls.autoRotate = false;

	}

};

