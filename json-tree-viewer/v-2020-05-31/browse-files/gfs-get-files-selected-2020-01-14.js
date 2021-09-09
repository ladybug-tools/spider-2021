// copyright 2020 Theo Armour. MIT license.
/* global GFO, GFRdivGetFilesSelected, GFSselOptionUrls */
// jshint esversion: 6
// jshint loopfunc: true


const GFS = {};

GFS.urls = [

	"https://rawcdn.githack.com/ladybug-tools-in2/honeybee-schema/master/honeybee_schema/samples/model_complete_single_zone_office_detailed_loads.json",
	"https://rawcdn.githack.com/ladybug-tools-in2/honeybee-schema/gh-pages/model.json",

	// https://www.sitepoint.com/10-example-json-files/
	"https://raw.githubusercontent.com/corysimmons/colors.json/master/colors.json",
	"http://ip-api.com/json/",
	"https://support.oneskyapp.com/hc/en-us/article_attachments/202761727/example_2.json",
	"https://opensource.adobe.com/Spry/data/json/object-02.js",
	"https://opensource.adobe.com/Spry/data/json/object-03.js",
	"https://opensource.adobe.com/Spry/data/json/donuts.js",
	"https://data.hawaii.gov/api/views/usep-nua7/rows.json",
	"https://data.cityofchicago.org/api/views/y6yq-dbs2/rows.json"
];


GFS.init = function () {

	GFRdivGetFilesSelected.innerHTML = GFS.getMenu();

	GFSselOptionUrls.innerHTML = GFS.urls.map( url => `<option>${url.split( "/").pop() }</option>` );
	GFSselOptionUrls.selectedIndex = 0;


};


GFS.getMenu = function () {

	const htm = `
		<details>

		<summary>Selected JSON files

		<span class="couponcode" >??<span class="coupontooltip" >
			Various JSON files from around the Internet that may be useful for testing the Viewer.
		</span></span>

		</summary>

		<p><select id=GFSselOptionUrls oninput=GFS.getUrl(GFS.urls[GFSselOptionUrls.selectedIndex]) size=8 ></select></p>

		<div id="divJsonView"></div>

	</details>`;

	return htm;

};



GFS.getUrl = function ( index ) {

	GFS.url = GFS.urls[ GFSselOptionUrls.selectedIndex ];

	fetch( GFS.url )
		.then( response => response.json() )
		.then( json => {

			GFS.filesData = json.tree; //.filter( item => item.path.includes( "samples" ) ).filter( item => item.path.endsWith( ".json" ) ).map( item => item );

			GFO.url = GFS.url;

			GFO.getFileJson(); // load a default file

		} );

};



GFS.init();