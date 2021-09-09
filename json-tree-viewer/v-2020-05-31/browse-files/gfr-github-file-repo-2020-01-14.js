// copyright 2020 Theo Armour. MIT license.
/* global GFRdivGetFiles, GFRselFiles, GFRdivOnLoad, GFRdivFileLoaded, GFRtxtRawJson, JTV, JTVdivJsonView */
// jshint esversion: 6
// jshint loopfunc: true


const GFR = {};

GFR.repos = [

	"jaanga/jaanga.github.io",
	"ladybug-tools-in2/honeybee-schema",
	"ladybug-tools-in2/energy-model-measure",
	"nasa/NASA-3D-Resources"

];

// GFR.url = "https://api.github.com/repos/ladybug-tools-in2/honeybee-schema/git/trees/master?recursive=1";
// GFR.prefix = "https://rawcdn.githack.com/ladybug-tools-in2/honeybee-schema/master/";
// GFR.source = "https://github.com/";

// GFR.init() is at end of file



GFR.init = function () {

	GFRdivGetFilesRepo.innerHTML = GFR.getMenu();

	GFRselRepo.innerHTML = GFR.getOptionsUrls();

	//GFRselRepo.selectedIndex = 1;

	//GFR.getUrl( GFRselRepo.selectedIndex );

};


GFR.getMenu = function () {

	const htm = `
	<details>

		<summary>JSON files in repositories</summary>

		<p>
			JSON files gathered using the GitHub API from selected repositories on GitHub.
			Click to load the <a href="https://developer.github.com/v3/git/trees/" target="_blank">Git Tree</a> JSON file for that repoditory.
			More details available in JavaScript developer console.
		</p>

		<select id=GFRselRepo onchange=GFR.getUrl(this.selectedIndex) size=10 style=overflow:auto;width:100% ></select>

		<div id=GFRdivOnLoad ></div>

	</details>
`;

	return htm;

};



GFR.getUrl = function ( index ) {

	repo = GFR.repos[ index ];

	GFR.url = `https://api.github.com/repos/${ repo }/git/trees/master?recursive=1`;

	GFR.getFileNames();

};



GFR.getFileNames = function () {

	fetch( GFR.url )
		.then( response => response.json() )
		.then( json => {

			GFR.filesData = json.tree; //.filter( item => item.path.includes( "samples" ) ).filter( item => item.path.endsWith( ".json" ) ).map( item => item );

			GFO.url = `https://api.github.com/repos/${ repo }/git/trees/master?recursive=1`;

			GFO.getFileJson(); // load a default file

		} );

};



GFR.getOptionsUrls = function () {

	const options = GFR.repos.map( ( item, index ) =>
		`<option value=${ index } title="" >${ index + 1 } ${ item }</option>` );

	GFRdivOnLoad.innerHTML = `<p>Files found on GitHub: ${ options.length }</p>`;

	return options;

};


GFR.init();