const JTH = {}


JTH.init = function () {

	JTHdivJsonTreeHelper.innerHTML = JTH.getMenu();

	//window.addEventListener( "onloadjson", JTH.onLoad, false );

}


JTH.getMenu = function() {

	const htm =
	`
	<details class="details-secondary">

		<summary class="summary-secondary" >
			JSON tree Helper
			<span id=MNUspnFile ></span>
			${ MNU.addInfoBox( "JSON tree view helpers to help with viewing and sharing JSON data" ) }
		</summary>

		<p id=JTHpButtons >
			<button id=but onclick=JTH.toggleAll(); >close all</button>
			<button id=but onclick=JTH.toggleAll(true); >open all</button>
		</p>

	</details>`;

	return htm;

};


JTH.onLoad = function () {

	//JTH.addPopupHelp();

	//const details = Array.from( JTVdivJsonTree.querySelectorAll( "details" ) ).filter( det => det.children.length < 10 );

	//console.log( 'details', details );
	//details[ 0 ].open = true;

};


JTH.addPopupHelp = function () {

	let id = 0;

	detailsArray = Array.from( JTVdivJsonTree.querySelectorAll( "details" ) ).filter( det => det.children.length < 10 && !det.innerText.includes( "model" ) );

	//console.log( 'detailsArray', detailsArray );

	detailsArray.forEach( (details, index ) => {

		txt = details.innerText
		txt = txt.slice( 0, txt.indexOf( " " ) );
		details.childNodes[ 1 ].title = txt;

	} );


	// for ( tree of trees ) {

	// 	const size = tree.size;

	// 	console.log( 'size', tree, size );

	// 	// for ( let face of faces ) {

	// 	// 	face.id = id;

	// 	// 	face.button = `<button onclick=console.log(this.value);JTH.addHighLight(this.value); value=${ id++ } >faces</button>`;

	// 	// }
	// }

	//JTVdivJsonTree.innerHTML = JTV.parseJson( JTV.root, GFL.json, 0 );

	//htm = `<button onclick=console.log(this.value); value=23 >faces</button>`;

	//JTVdivJsonTree.innerHTML = JTVdivJsonTree.innerHTML.replace( /xxxx/g, htm );

};



JTH.addHelp = function () {

};



JTH.toggleAll = function ( boole = false ) {

	JTVdivJsonTree.querySelectorAll( "details" ).forEach( detail => detail.open = boole );

};


JTH.addUrls = function () {

	JTVdivJsonTree.innerHTML = JTVdivJsonTree.innerHTML.replace(
		/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a href="$1">$1</a> ' );

};


JTH.init();