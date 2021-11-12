// copyright 2021 Theo Armour. MIT license.
/* globals GFFdivFileInfo, GFFdivGithubFoldersFiles */
/* jshint esversion: 6 */
/* jshint loopfunc: true */


const GFF = {};

GFF.folderMeta = [];
GFF.foldersMeta = [];


GFF.init = function () {

	GFF.jsonReposFolders = COR.pathContent + `v-${ COR.version }/js/gff-multiple.js`;

	GFFdivDetails = MNUdivContent.appendChild( document.createElement( 'div' ) );

	GFFdivDetails.addEventListener( "contextmenu", GFF.onContextMenu );

	const info =
		`Access a wide variety of sample files in many formats hosted in the <a href="https://ladybug.tools" target="_blank" >Ladybug Tools</a> / <a href="https://www.ladybug.tools/3d-models/" target="_blank">3D Models repository</a><br>
<br>
File name: <a href="https://github.com/ladybug-tools/spider-2021/tree/main/lib-spider-09/gff-github-folder-files" target="_blank">gff-github-folder-files.js</a><br>
Name space: GFF<br>
Release: 2021-11-11`;


	GFFdivDetails.innerHTML = `
<details id=GFFdet ontoggle=GFF.getFolders(); class=divNavResize >

	<summary class="summary-primary gmd-1" title="View selected items">Sample files gallery
		${ MNU.addInfoBox( info ) }
	</summary>

	<div>

		<p>Sample files for you to load, view, and experiment with - and export into new formats:</p>

		<div id=GFFdivGithubFoldersFiles></div>

		<div id=GFFdivFileInfo></div>

		<br>

	</div>

</details>`;

};



GFF.getFolders = function () {

	const script = document.head.appendChild( document.createElement( "script" ) );
	script.onload = () => {

		const htm = GFF.foldersMeta.map( ( item, index ) => {

			if ( !item.user ) { return item.group; }

			return `
<details ontoggle=GFFdivFoldersFiles${ index }.innerHTML=GFF.getGithubFoldersFiles(${ index },"multiple"); >

	<summary class="summary-secondary">${ index + 1 } - ${ item.title }</summary>

	<div id=GFFdivFoldersFiles${ index } ></div>

</details>`;
		} ).join( "" );

		GFFdivGithubFoldersFiles.innerHTML = htm;

	};

	script.src = GFF.jsonReposFolders;

};



GFF.getGithubFoldersFiles = function ( index, items ) {

	const item = GFF.foldersMeta[ index ];

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
			<button onclick=GFF.viewAllFiles(); >View all the files</button><br>New file every five seconds. Reload page to stop
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

		const item = GFF.foldersMeta[ GFF.index ];

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
	GFF.extensions = GFF.foldersMeta[ GFF.index ].extensions;
	GFF.files = JSON.parse( response );
	//console.log( "GFF.files", GFF.files );

	const item = GFF.foldersMeta[ GFF.index ];
	GFF.folderMeta = item;
	//console.log( 'item', item );

	item.branch = item.branch || "master";

	item.urlGitHubSource = 'https://github.com/' + item.user + item.repo + '/blob/' + item.branch + '/' + item.pathRepo;

	item.urlGitHubPage = 'https://cdn.jsdelivr.net/gh/' + item.user + item.repo + '@' + item.branch + '/' + item.pathRepo;

	item.threeViewer = "../../spider-viewer/index.html";

	let count = 1;

	let htm = "";

	for ( let file of GFF.files ) {

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

GFF.sites =
	[
		[ "https://www.ladybug.tools/spider-2021/spider-viewer/", "Aragog gbXML Viewer" ],
		[ "https://www.ladybug.tools/spider-covid-19-viz-3d/", "Radiance RAD File Viewer" ],
		[ "https://prediqtiv.github.io/eye-cue/replay/dev", "predIQtiv" ],
		[ "https://webmath.github.io/algesurf/ray-marching/r3/algesurf-ray-marching-r3.html", "algeSurf" ],
		[ "https://www.ladybug.tools/spider/analemma3d/index.html#r20/analemma3d.html", "Analemma 3D" ],
		[ "https://www.ladybug.tools/spider/build-well/r14/build-well.html", "Build Well" ],
		[ "https://www.ladybug.tools/spider/burning-manalemma-2017/index.html#r10/burning-manalemma-2017.html#latitude:40.786944,longitude:-119.204444,zoom:11,offsetUTC:-420", "BurningmAnalemma" ],
		[ "https://www.ladybug.tools/spider/cookbook/scatter-well/r1/index.html", "Scatter Well" ],
		[ "https://www.ladybug.tools/spider/cookbook/rad-to-threejs/r5/rad-to-three.html", "Radiance RAD File Viewer" ]
	];


GFF.timer;


GFF.viewAllFiles = function () {

	GFF.index = 0; // Math.floor( Math.random() * sites.length );

	THR.controls.autoRotate = true;

	clearInterval( GFF.timer );

	GFF.displayNext();

	GFF.timer = setInterval( GFF.displayNext, 5000 );

};


GFF.displayNext = function () {

	const ext = GFF.files[ GFF.index ].name.toLowerCase().split( "." ).pop();

	if ( GFF.extensions.includes( ext ) ) {

		const file = 'https://cdn.jsdelivr.net/gh/' + GFF.folderMeta.user + GFF.folderMeta.repo +
		'@' + GFF.folderMeta.branch + '/' + GFF.files[ GFF.index ].path;

		location.hash = file;

	}

	GFF.index++;

	GFF.index = GFF.index >= GFF.files.length ? 0 : GFF.index;

};
