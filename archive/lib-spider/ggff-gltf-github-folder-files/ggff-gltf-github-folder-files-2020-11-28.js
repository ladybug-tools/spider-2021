/* globals GGFFdivFileInfo, GGFFdivGithubFoldersFiles */
/* jshint esversion: 6 */
/* jshint loopfunc: true */


const GGFF = {
	extension: ".xml",
	isRunning: false,
	timeout: 3000,
	urlViewer: "../../spider-gbxml-viewer/index.html"
};

GGFF.items = [
	{
		"extension": ".gltf",
		"user": "KhronosGroup",
		"repo": "/glTF-Sample-Models",
		"pathRepo": "2.0/",
		"title": "Khronos Group glTF-Sample-Model",
		"subTitle":
			`Files from the
		<a href="https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0" target="_blank">glTF Sample Files</a>
		repository on GitHub.
		Includes a variety of gbXML files from various vendors and organizations.`
	},
	{
		"extension": ".gltf",
		"user": "google",
		"repo": "/model-viewer",
		"pathRepo": "packages/shared-assets/models/",
		"title": "Google Model Viewer",
		"subTitle":
			`Files from the
		<a href="https://github.com/google/model-viewer" target="_blank">https://github.com/google/model-viewer</a>
		repository on GitHub.
		Includes a variety of gbXML files from various vendors and organizations.`
	},

	// {
	// 	"extension": ".",
	// 	"user": "",
	// 	"repo": "/xxx",
	// 	"pathRepo": "xxx/",
	// 	"title": "",
	// 	"subTitle":
	// 		`Files from the
	// 	<a href="/" target="_blank"> Sample Files</a>
	// 	repository on GitHub.
	// 	Includes a variety of gbXML files from various vendors and organizations.`
	// },


];


GGFF.iconGitHubMark = "https://ladybug.tools/spider-2020/assets/icons/octicon.svg";
GGFF.iconInfo = `<img src=${ GGFF.iconGitHubMark } height=11 style=opacity:0.5 >`;

GGFF.iconExternalLink = `<img width=16 src="https://www.ladybug.tools/spider-2020/assets/icons/icon-link-external.svg">`;
GGFF.files = GGFF.items.map( item => [] );


GGFF.getMenuGithubFoldersFiles = function () {

	const htm = GGFF.items.map( ( item, index ) =>
		`
		<details ontoggle="GGFFdivFoldersFiles${ index }.innerHTML=GGFF.getGithubFoldersFiles(${ index });" >

			<summary id=TMPsumSurfaces >${ index + 1 } - ${ item.title }</summary>

			<div id=GGFFdivFoldersFiles${ index } ></div>

		</details>
	`
	).join( "" );

	return htm;

};


GGFF.getGithubFoldersFiles = function ( index ) {

	const item = GGFF.items[ index ];

	item.urlGitHubApiContents = 'https://api.github.com/repos/' + item.user + item.repo + '/contents/' + item.pathRepo;

	GGFF.extension = item.extension;

	GGFF.index = index;

	const htm =
		`
		<p><i>${ item.subTitle }</i></p>

		<div id=GALdivGallery${ index } ></div>

		<p>Click any ${ GGFF.iconInfo } icon to view file source code on GitHub.</p>

		<p>Click any file title to view the file in this script.</p>

		<p>Click any ❐ icon to go full screen & get link to individual file.</p>

		<p>Tool tips provide file size.

		<p>
			<button onclick=GGFF.viewFiles(${ index }); >View all the files</button><br>Press any key to stop
		</p>

		<hr>

	`;

	GGFF.requestFile( item.urlGitHubApiContents, GGFF.callbackGitHubMenu, index );

	return htm;

};


GGFF.viewFiles = function ( index ) {

	divPopUp.hidden = true;

	GGFF.index = index;
	GGFF.count = 0;
	GGFF.isRunning = true;

	GGFF.loadFile( index, GGFF.count );

	window.addEventListener( "keydown", GGFF.onKeydown );

};



GGFF.onKeydown = function () {

	location.reload();

};



GGFF.loadFile = function ( index = 0 ) {

	const item = GGFF.items[ GGFF.index ];
	//console.log( 'item', item );

	item.urlGitHubPage = 'https://cdn.jsdelivr.net/gh/' + item.user + item.repo + '@' + item.branch + '/';

	const file = GGFF.files[ index ][ GGFF.count ];

	FOO.messagePopUp = `
	<p>File: <b>${ file.path.split( "/" ).pop() }</b></p>
	<p>Size: ${ file.size.toLocaleString() }</p>
	<p>Press any key to stop the demo.</p>
	`;

	location.hash = item.urlGitHubPage + file.path;

	//GGFF.isRunning = false;

	GGFF.count++;

	if ( GGFF.count >= GGFF.files[ index ].length ) {

		GGFF.count = 0;

	}


	divPopUp.hidden = true;

	GGFF.timer = setTimeout( () => { GGFF.loadFile( index ); }, GGFF.timeout );

};



GGFF.requestFile = function ( url, callback, index ) {

	GGFF.index = index;

	const xhr = new XMLHttpRequest();
	xhr.crossOrigin = 'anonymous';
	xhr.open( 'GET', url, true );
	xhr.onerror = function ( xhr ) { console.log( 'error:', xhr ); };
	xhr.onprogress = onRequestFileProgress;
	xhr.onload = callback;
	xhr.send( null );


	function onRequestFileProgress ( xhr ) {

		let name = xhr.target.responseURL.split( '/' ).pop();

		const item = GGFF.items[ GGFF.index ];

		name = name ? item.user + '/' + name : `${ item.user }  ${ item.repo } `;

		GGFFdivFileInfo.innerHTML = `
		<p>
			Files from: ${ name }<br>
			Bytes loaded: ${ xhr.loaded.toLocaleString() }<br>
		</p>`;

	}

};



GGFF.callbackGitHubMenu = function ( xhr ) {

	const response = xhr.target.response;
	GGFF.extension = GGFF.items[ GGFF.index ].extension;
	let files = JSON.parse( response );
	//files = files.filter( file => file.name.toLowerCase().endsWith( GGFF.extension ) );
	GGFF.files[ GGFF.index ] = files;

	const item = GGFF.items[ GGFF.index ];
	//console.log( 'item', item );

	item.branch = item.branch || "master";

	item.urlGitHubSource = 'https://github.com/' + item.user + item.repo + '/blob/' + item.branch + '/' + item.pathRepo;

	item.urlGitHubPage = 'https://cdn.jsdelivr.net/gh/' + item.user + item.repo + '@' + item.branch + '/' + item.pathRepo;

	item.threeViewer = "../../spider-gbxml-viewer/index.html";

	let count = 1;

	let htm = "";

	for ( let file of files ) {

		//if ( file.name.toLowerCase().endsWith( GGFF.extension ) === false &&
		//	file.name.toLowerCase().endsWith( '.zip' ) === false ) { continue; }

		const fileName = encodeURI( file.name );

		htm += `
		<div style=margin:0.5rem 0; >

			<a href=${ item.urlGitHubSource + fileName } title="Source code on GitHub. Edit me!" >
				${ GGFF.iconInfo }</a>

			${ count++ } <a href=#${ item.urlGitHubPage + fileName } title="${ file.size.toLocaleString() } bytes" >${ file.name }</a>

			<a href=${ GGFF.urlViewer }#${ item.urlGitHubPage }${ fileName } title="Link to just this file. Open file in new tab." target="_blank" >
			${ GGFF.iconExternalLink }</a><br>
<!--
			<iframe src="https://www.ladybug.tools/spider-2020/spider-gbxml-viewer-lt/#${ item.urlGitHubPage }${ fileName }" ></iframe>
-->
		</div>`;

	}

	const divGallery = GGFFdivGithubFoldersFiles.querySelectorAll( "#GALdivGallery" + GGFF.index )[ 0 ];
	//console.log( 'divGallery', divGallery );

	divGallery.innerHTML = htm;

	GFO.init()

};
