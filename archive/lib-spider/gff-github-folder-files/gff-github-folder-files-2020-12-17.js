/* globals GFFdivFileInfo, GFFdivGithubFoldersFiles */
/* jshint esversion: 6 */
/* jshint loopfunc: true */


const GFF = {


};


GFF.getGbxml = function () {

	const script = document.head.appendChild( document.createElement( "script" ) );
	script.onload = () => {

		const htm = GFF.gbxml.map( ( item, index ) => `
<details ontoggle=GFFdivFoldersFiles${ index }.innerHTML=GFF.getGithubFoldersFiles(${ index },"gbxml"); >

<summary id=TMPsumSurfaces >${ index + 1 } - ${ item.title }</summary>

<div id=GFFdivFoldersFiles${ index } ></div>

</details>` ).join( "" );

		GFFdivGithubFoldersFiles.innerHTML = htm;

	};

	script.src = "../../lib/gff-github-folder-files/gff-gbxml.js";

};

GFF.iconGitHubMark = "../../lib/assets/icons/octicon.svg";
GFF.iconInfo = `<img src=${ GFF.iconGitHubMark } height=11 style=opacity:0.5 >`;
GFF.iconExternalLink = `<img width=16 src="../../lib/assets/icons/icon-link-external.svg">`;
GFF.files = []; //GFF.items.map( item => [] );


GFF.getMenuGithubFoldersFiles = function () {

	GFF.getGbxml();


};


GFF.getGithubFoldersFiles = function ( index, items ) {

	GFF.items = GFF[ items ];
	const item = GFF[ items ][ index ];

	console.log( "item", item );
	item.urlGitHubApiContents = 'https://api.github.com/repos/' + item.user + item.repo + '/contents/' + item.pathRepo;

	GFF.extension = item.extension;

	GFF.index = index;

	const htm =
		`
		<p><i>${ item.subTitle }</i></p>

		<div id=GALdivGallery${ index } ></div>

		<p>Click any ${ GFF.iconInfo } icon to view file source code on GitHub.</p>

		<p>Click any file title to view the file in this script.</p>

		<p>Click any ❐ icon to go full screen & get link to individual file.</p>

		<p>Tool tips provide file size.

		<p>
			<button onclick=GFF.viewFiles(${ index }); >View all the files</button><br>Press any key to stop
		</p>

		<hr>

	`;

	GFF.requestFile( item.urlGitHubApiContents, GFF.callbackGitHubMenu, index );

	return htm;

};


GFF.viewFiles = function ( index ) {

	divPopUp.hidden = true;

	GFF.index = index;
	GFF.count = 0;
	GFF.isRunning = true;

	GFF.loadFile( index, GFF.count );

	window.addEventListener( "keydown", GFF.onKeydown );

};



GFF.onKeydown = function () {

	location.reload();

};



GFF.loadFile = function ( index = 0 ) {

	const item = GFF.items[ GFF.index ];
	//console.log( 'item', item );

	item.urlGitHubPage = 'https://cdn.jsdelivr.net/gh/' + item.user + item.repo + '@' + item.branch + '/';

	const file = GFF.files[ index ][ GFF.count ];

	FOO.messagePopUp = `
	<p>File: <b>${ file.path.split( "/" ).pop() }</b></p>
	<p>Size: ${ file.size.toLocaleString() }</p>
	<p>Press any key to stop the demo.</p>
	`;

	location.hash = item.urlGitHubPage + file.path;

	//GFF.isRunning = false;

	GFF.count++;

	if ( GFF.count >= GFF.files[ index ].length ) {

		GFF.count = 0;

	}


	divPopUp.hidden = true;

	GFF.timer = setTimeout( () => { GFF.loadFile( index ); }, GFF.timeout );

};



GFF.requestFile = function ( url, callback, index ) {

	GFF.index = index;

	const xhr = new XMLHttpRequest();
	xhr.crossOrigin = 'anonymous';
	xhr.open( 'GET', url, true );
	xhr.onerror = function ( xhr ) { console.log( 'error:', xhr ); };
	xhr.onprogress = onRequestFileProgress;
	xhr.onload = callback;
	xhr.send( null );


	function onRequestFileProgress ( xhr ) {

		let name = xhr.target.responseURL.split( '/' ).pop();

		const item = GFF.items[ GFF.index ];

		name = name ? item.user + '/' + name : `${ item.user }  ${ item.repo } `;

		GFFdivFileInfo.innerHTML = `
		<p>
			Files from: ${ name }<br>
			Bytes loaded: ${ xhr.loaded.toLocaleString() }<br>
		</p>`;

	}

};



GFF.callbackGitHubMenu = function ( xhr ) {

	const response = xhr.target.response;
	GFF.extension = GFF.items[ GFF.index ].extension;
	let files = JSON.parse( response );
	//files = files.filter( file => file.name.toLowerCase().endsWith( GFF.extension ) );
	GFF.files[ GFF.index ] = files;

	const item = GFF.items[ GFF.index ];
	//console.log( 'item', item );

	item.branch = item.branch || "master";

	item.urlGitHubSource = 'https://github.com/' + item.user + item.repo + '/blob/' + item.branch + '/' + item.pathRepo;

	item.urlGitHubPage = 'https://cdn.jsdelivr.net/gh/' + item.user + item.repo + '@' + item.branch + '/' + item.pathRepo;

	item.threeViewer = "../../spider-gbxml-viewer/index.html";

	let count = 1;

	let htm = "";

	for ( let file of files ) {

		//if ( file.name.toLowerCase().endsWith( GFF.extension ) === false &&
		//	file.name.toLowerCase().endsWith( '.zip' ) === false ) { continue; }

		const fileName = encodeURI( file.name );

		htm += `
		<div style=margin:0.5rem 0; >

			<a href=${ item.urlGitHubSource + fileName } title="Source code on GitHub. Edit me!" >
				${ GFF.iconInfo }</a>

			${ count++ } <a href=#${ item.urlGitHubPage + fileName } title="${ file.size.toLocaleString() } bytes" >${ file.name }</a>

			<a href=${ GFF.urlViewer }#${ item.urlGitHubPage }${ fileName } title="Link to just this file. Open file in new tab." target="_blank" >
			${ GFF.iconExternalLink }</a><br>
<!--
			<iframe src="https://www.ladybug.tools/spider-2020/spider-gbxml-viewer-lt/#${ item.urlGitHubPage }${ fileName }" ></iframe>
-->
		</div>`;

	}

	const divGallery = GFFdivGithubFoldersFiles.querySelectorAll( "#GALdivGallery" + GFF.index )[ 0 ];
	//console.log( 'divGallery', divGallery );

	divGallery.innerHTML = htm;

};
