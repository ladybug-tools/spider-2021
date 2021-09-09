// copyright 2021 Theo Armour. MIT license.
/* globals GFFdivFileInfo, GFFdivGithubFoldersFiles */
/* jshint esversion: 6 */
/* jshint loopfunc: true */


const GFF = {};

//GFF.iconGitHubMark = "https://pushme-pullyou.github.io/tootoo-2021/lib/assets/icons/octicon.svg";
//GFF.iconInfo = `<img src=${ GFF.iconGitHubMark } height=11 style=opacity:0.5 >`;
//GFF.iconExternalLink = `<img width=16 src="https://pushme-pullyou.github.io/tootoo-2021/lib/assets/icons/icon-link-external.svg">`;
GFF.files = [];



GFF.init = function () {

	GFF.jsonReposFolders = COR.path + "js/gff-multiple.js"

	GFFdivDetails.addEventListener( "contextmenu", GFF.onContextMenu );

	const info =
`Access a wide variety of files in formats supported by Spider Viewer 2021<br>
<br>
File name: gff-github-folder-files.js<br>
Name space: GFF<br>
Release: 2021-09-09`;


	GFFdivDetails.innerHTML = `
<details ontoggle=GFF.getFolders(); class=divNavResize >

	<summary class="summary-primary gmd-1" title="View selected items">Sample files gallery
		${ MNU.addInfoBox( info ) }
	</summary>

	<div>

		<p>Sample files you view load, view, and experiment with and export into new formats:</p>

		<div id=GFFdivGithubFoldersFiles></div>

		<div id=GFFdivFileInfo></div>

		<br>

	</div>

</details>`;

};



GFF.getFolders = function () {

	const script = document.head.appendChild( document.createElement( "script" ) );
	script.onload = () => {

		const htm = GFF.folders.map( ( item, index ) => {

			if ( !item.user ) { return item.group; }

			return `
<details ontoggle=GFFdivFoldersFiles${ index }.innerHTML=GFF.getGithubFoldersFiles(${ index },"multiple"); >

	<summary class="summary-secondary">${ index + 1 } - ${ item.title }</summary>

	<div id=GFFdivFoldersFiles${ index } ></div>

</details>`; } ).join( "" );

		GFFdivGithubFoldersFiles.innerHTML = htm;

	};

	script.src = GFF.jsonReposFolders;

};



GFF.getGithubFoldersFiles = function ( index, items ) {

	const item = GFF.folders[ index ];

	item.urlGitHubApiContents = 'https://api.github.com/repos/' + item.user + item.repo + '/contents/' + item.pathRepo;

	GFF.extension = item.extension;

	GFF.index = index;

	const htm =
		`
		<p><i>${ item.subTitle }</i></p>

		<div id=GALdivGallery${ index } ></div>

		<p>Click any ${ COR.iconGitHub } icon to view file source code on GitHub.</p>

		<p>Click any file title to view the file in this script.</p>

		<p>Click any ${ COR.iconExternalFile } icon to open the source in a new tab.</p>

		<p>Tool tips provide file size.

		<p>
			<button onclick=GFF.viewFiles(); >View all the files</button><br>Press any key to stop
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

	const item = GFF.folders[ GFF.index ];
	GFF.files = item;
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
	//	<a href=${ GFF.urlViewer }#${ item.urlGitHubPage }${ fileName } title="Link to just this file. Open file in new tab." target="_blank" >

		htm += `
		<div style=margin:0.5rem 0; >

			<a href=${ item.urlGitHubSource + fileName } title="Source code on GitHub. Edit me!" >
				${ COR.iconGitHub }</a>

			${ count++ } <a href=#${ item.urlGitHubPage + fileName } title="${ file.size.toLocaleString() } bytes" >${ file.name }</a>

			<a href="https://${ item.user }.github.io${ item.repo }/${ item.pathRepo }${ fileName }" title="Link to just this file. Open file in new tab." target="_blank" >

			${ COR.iconExternalFile }</a><br>

		</div>`;

	}

	const divGallery = GFFdivGithubFoldersFiles.querySelectorAll( "#GALdivGallery" + GFF.index )[ 0 ];

	divGallery.innerHTML = htm;

};


//////////



GFF.onContextMenu = function ( event ) {

	event.preventDefault();
	//console.log( "event", event.target.parentNode );

	if ( !window.GFFdivPopUp ) {

		GFFdivPopUp = document.body.appendChild( document.createElement( 'div' ) );

	}

	GFFdivPopUp.classList.add( "infoTooltip" );
	//GFFdivPopUp.style.cssText = `border: 1px solid red; width: 10rem; position: absolute;`
	GFFdivPopUp.style.display = "block";
	GFFdivPopUp.style.left = event.pageX - 10 + "px";
	GFFdivPopUp.style.top = event.pageY - 10 + "px";
	GFFdivPopUp.style.zIndex = "50";

	const htm = `
	<div><button onclick=GFF.toggleChildren(GFFdivDetails,false); >close all</button></div>
	`;

	//<div><button onclick=GFF.toggleChildren(GFFdivDetails,true); >open all</button></div>
	//<hr>
	//<div><button onclick=GFF.toggleChildren(${ event.target.parentNode.id },true); >open children</button></div>
	//<div><button onclick=GFF.toggleChildren(${ event.target.parentNode.id },false); >close children</button></div>

	GFFdivPopUp.innerHTML = htm;

	window.addEventListener( "click", GFF.onClick );

};


GFF.toggleChildren = function ( element = GFFdivDetails, boole = false ) {

	//console.log( "el", element, element.querySelectorAll( "details" ) )

	element.open = boole;

	Array.from( element.querySelectorAll( "details" ) ).slice( 1 ).forEach( detail => detail.open = boole );

};



GFF.onClick = function () {

	GFFdivPopUp.style.display = "none";

	GFFdivPopUp.innerHTML = "";

	window.removeEventListener( "click", GFF.onClick );

};



//////////


let timer;
GFF.ii = 0; // Math.floor( Math.random() * sites.length );


GFF.viewFiles = function ( index = 0 ) {

	console.log( "index", index );

	clearInterval( timer );

	displayNext();

	timer = setInterval( displayNext, 10000 );


	GFF.ii = index;
	GFF.count = 0;
	GFF.isRunning = true;

	//GFF.loadFile( index, GFF.count );

	window.addEventListener( "keydown", GFF.onKeydown );

};


function displayNext () {

	GFF.ii = GFF.ii >= GFF.files.length ? 0 : GFF.ii;

	if ( !GFF.files[ GFF.ii ].fileName ) { return; }

	ifr.onload = function () { ifr.className = 'fade-in'; };

	setTimeout( function () { ifr.className = 'fade-out'; }, 8000 );

	ifr.src = GFF.folders[ index ].fileName;

	history.replaceState( '', document.title, window.location.pathname );

	index++;

}

GFF.onKeydown = function () {

	location.reload();

};



GFF.mmmloadFile = function ( index = 0 ) {

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




