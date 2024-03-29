/* globals GFFdivFileInfo, GFFdivGithubFoldersFiles */
/* jshint esversion: 6 */
/* jshint loopfunc: true */


const GFF = {

	//source: "https://www.ladybug.tools/spider-2021/spider-viewer/v-2021-08-28/js/gff-multiple.js"

};

GFF.iconGitHubMark = "https://pushme-pullyou.github.io/tootoo-2021/lib/assets/icons/octicon.svg";
GFF.iconInfo = `<img src=${ GFF.iconGitHubMark } height=11 style=opacity:0.5 >`;
GFF.iconExternalLink = `<img width=16 src="https://pushme-pullyou.github.io/tootoo-2021/lib/assets/icons/icon-link-external.svg">`;
GFF.files = [];



GFF.init = function () {

	GFF.source = COR.path + "js/gff-multiple.js"


	GFFdivDetails.addEventListener( "contextmenu", GFF.onContextMenu );

	const info =
`Access a wide variety of files in formats supported by the Spider Viewer <br>
<br>
File name: gff-github-folder-files.js<br>
Name space: GFF<br>
Release 2021-08-17`;

	GFFdivDetails.innerHTML = `
<details ontoggle=GFF.getMenuGithubFoldersFiles() class=divNavResize >

	<summary class="summary-primary gmd-1" title="View selected items">Sample files gallery
	${ MNU.addInfoBox( info ) }
	</summary>

	<div>

		<p>Sample files you can load, view, experiment with and export into new formats:</p>

		<div id=GFFdivGithubFoldersFiles></div>

		<div id=GFFdivFileInfo></div>

		<br>

	</div>

</details>`;

};


GFF.getMenuGithubFoldersFiles = function () {

	GFF.getFolders();

};





GFF.getFolders = function () {

	const script = document.head.appendChild( document.createElement( "script" ) );
	script.onload = () => {

		const htm = GFF.folders.map( ( item, index ) => {

			if ( !item.user ) { return item.group; }

			return `<details ontoggle=GFFdivFoldersFiles${ index }.innerHTML=GFF.getGithubFoldersFiles(${ index },"multiple"); >

<summary id=TMPsumSurfaces class="summary-secondary">${ index + 1 } - ${ item.title }</summary>

<div id=GFFdivFoldersFiles${ index } ></div>

</details>`; } ).join( "" );

		GFFdivGithubFoldersFiles.innerHTML = htm;

	};

	script.src = GFF.source;

};





GFF.getGithubFoldersFiles = function ( index, items ) {

	const item = GFF.folders[ index ];

	//console.log( "item", item );
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

		const item = GFF.folders[ GFF.index ];

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
	GFF.extensions = GFF.folders[ GFF.index ].extensions;
	let files = JSON.parse( response );
	//files = files.filter( file => file.name.toLowerCase().endsWith( GFF.extension ) );
	GFF.files[ GFF.index ] = files;

	const item = GFF.folders[ GFF.index ];
	//console.log( 'item', item );

	item.branch = item.branch || "master";

	item.urlGitHubSource = 'https://github.com/' + item.user + item.repo + '/blob/' + item.branch + '/' + item.pathRepo;

	item.urlGitHubPage = 'https://cdn.jsdelivr.net/gh/' + item.user + item.repo + '@' + item.branch + '/' + item.pathRepo;

	item.threeViewer = "../../spider-viewer/index.html";


	let count = 1;

	let htm = "";

	for ( let file of files ) {

		const ext = file.name.toLowerCase().split( "." ).pop();

		if ( GFF.extensions.includes( ext ) === false &&
			file.name.toLowerCase().endsWith( '.zip' ) === false && GFF.extensions.length ) { continue; }

		const fileName = encodeURI( file.name );

		htm += `
		<div style=margin:0.5rem 0; >

			<a href=${ item.urlGitHubSource + fileName } title="Source code on GitHub. Edit me!" >
				${ GFF.iconInfo }</a>

			${ count++ } <a href=#${ item.urlGitHubPage + fileName } title="${ file.size.toLocaleString() } bytes" >${ file.name }</a>

			<a href=${ GFF.urlViewer }#${ item.urlGitHubPage }${ fileName } title="Link to just this file. Open file in new tab." target="_blank" >
			${ GFF.iconExternalLink }</a><br>
<!--
			<iframe src="https://www.ladybug.tools/spider-2021/spider-viewer/index.html#${ item.urlGitHubPage }${ fileName }" ></iframe>
-->
		</div>`;

	}

	const divGallery = GFFdivGithubFoldersFiles.querySelectorAll( "#GALdivGallery" + GFF.index )[ 0 ];
	//console.log( 'divGallery', divGallery );

	divGallery.innerHTML = htm;

};


//////////


GFF.viewFiles = function ( index ) {

	//divPopUp.hidden = true;

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

	const item = GFF.folders[ GFF.index ];
	//console.log( 'item', item );

	item.urlGitHubPage = 'https://cdn.jsdelivr.net/gh/' + item.user + item.repo + '@' + item.branch + '/';

	const file = GFF.files[ index ][ GFF.count ];

	// FOO.messagePopUp = `
	// <p>File: <b>${ file.path.split( "/" ).pop() }</b></p>
	// <p>Size: ${ file.size.toLocaleString() }</p>
	// <p>Press any key to stop the demo.</p>
	// `;

	location.hash = item.urlGitHubPage + file.path;

	//GFF.isRunning = false;

	GFF.count++;

	if ( GFF.count >= GFF.files[ index ].length ) {

		//GFF.count = 0;

	}

	//divPopUp.hidden = true;

	GFF.timer = setTimeout( () => { GFF.loadFile( index ); }, GFF.timeout );

};




GFF.onContextMenu = function ( event ) {

	event.preventDefault();

	console.log( "event", event.target.parentNode );

	//el = event.target.parentNode;

	if ( !window.divPopUp ) {

		divPopUp = document.body.appendChild( document.createElement( 'div' ) );

	}

	divPopUp.classList.add( "infoTooltip" );
	//divPopUp.style.cssText = `border: 1px solid red; width: 10rem; position: absolute;`
	divPopUp.style.display = "block";
	divPopUp.style.left = event.pageX - 10 + "px";
	divPopUp.style.top = event.pageY - 10 + "px";
	divPopUp.style.zIndex = "50";

	const htm = `
	<div><button onclick=GFF.toggleChildren(GFFdivDetails,false); >close all</button></div>
	`;

	//<div><button onclick=GFF.toggleChildren(GFFdivDetails,true); >open all</button></div>
	//<hr>
	//<div><button onclick=GFF.toggleChildren(${ event.target.parentNode.id },true); >open children</button></div>
	//<div><button onclick=GFF.toggleChildren(${ event.target.parentNode.id },false); >close children</button></div>

	divPopUp.innerHTML = htm;

	window.addEventListener( "click", GFF.onClick );

};


GFF.toggleChildren = function ( element = GFFdivDetails, boole = false ) {

	//console.log( "el", element, element.querySelectorAll( "details" ) )

	element.open = boole;

	Array.from( element.querySelectorAll( "details" ) ).slice( 1 ).forEach( detail => detail.open = boole );

};



GFF.onClick = function () {

	divPopUp.style.display = "none";

	divPopUp.innerHTML = "";

	window.removeEventListener( "click", GFF.onClick );

};

