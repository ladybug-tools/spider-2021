// copyright 2020 Theo Armour. MIT license.
// See pushme-pullyou/templates-01/modules/template
// 2020-02-13
/* globals FOOdivFileOpenObj, THREE, THR, FO, FOOdet, OM */
// jshint esversion: 6
// jshint loopfunc: true


const FOO = {};
const OM = {};

//FOO.path = "https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@gh-pages/";

FOO.path = "https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@gh-pages/";

//FOO.path = "https://raw.githack.com/ladybug-tools/3d-models/gh-pages/quaternius/";

FOO.fileName = "CommonTree_5";

FOO.urlDefaultFile = FOO.path +"quaternius/ultimate-nature-pack/CactusFlowers_5.obj";

FOO.scripts = [
	"https://cdn.jsdelivr.net/gh/mrdoob/three.js@r124/examples/js/loaders/DDSLoader.js",
	"https://cdn.jsdelivr.net/gh/mrdoob/three.js@r124/examples/js/loaders/MTLLoader.js",
	"https://cdn.jsdelivr.net/gh/mrdoob/three.js@r124/examples/js/loaders/OBJLoader.js",
	"https://cdn.jsdelivr.net/gh/mrdoob/three.js@r124/examples/js/controls/DragControls.js"
];





FOO.init = function () {

	FOO.getMenu();

	//GFFdet8.ontoggle = FOO.loadScripts;

	//FOO.loadScripts();

	window.addEventListener( 'hashchange', FOO.testForObj, false );



};



FOO.getMenu = function () {

	console.log( "", 23 );

	const htm = `
<details id=FOOdet>

	<summary class="sumMenuTertiary" title="foo-file-open-obj.js" >

		File open OBJ


	</summary>

	<input type="file" id=inpFiles onchange="FOO.readFile()"><br>

	<!--
	<p><select id=FOOselObjects size=10 style=width:100%; ></select></p>

	<p><button onclick=FOO.getObjectsData() >get objects data</button></p>

	<div id=FOOdivMessage ></div>

	<p><button onclick=FOO.saveFile() >save file</button></p>

	<p><button onclick=FOO.requestFile("composition-3d-01.json") >open composition-3d.json</button></p>

	-->

	<p><button onclick=FOO.addForest(); >add forest</button></p>

</details>`;

	FOOdivFileOpenObj.innerHTML = htm;

};


FOO.readFile = function() {

	const reader = new FileReader();

	reader.addEventListener( "load", () => FOO.loadScripts( reader.result ), false );

	if ( inpFiles.files[ 0 ] ) { reader.readAsDataURL( inpFiles.files[ 0 ] ); }

}


FOO.loadScripts = function ( url = FOO.urlDefaultFile ) {

	if ( !FOO.scr0 ) {

		FOO.scr0 = document.body.appendChild( document.createElement( 'script' ) );
		FOO.scr0.onload = FOO.loadScripts;
		FOO.scr0.src = FOO.scripts[ 0 ];

	} else if ( !FOO.scr1 ) {

		FOO.scr1 = document.body.appendChild( document.createElement( 'script' ) );
		FOO.scr1.onload = FOO.loadScripts;
		FOO.scr1.src = FOO.scripts[ 1 ];

	} else if ( !FOO.scr2 ) {

		FOO.scr2 = document.body.appendChild( document.createElement( 'script' ) );
		FOO.scr2.onload = FOO.loadScripts;
		FOO.scr2.src = FOO.scripts[ 2 ];

	} else if ( !FOO.scr3 ) {

		FOO.scr3 = document.body.appendChild( document.createElement( 'script' ) );
		FOO.scr3.onload = FOO.loadScripts;
		FOO.scr3.src = FOO.scripts[ 3 ];
		console.log( 'FOO scripts loaded' );

	} else {

		FOO.manager = new THREE.LoadingManager();

		FOO.manager.addHandler( /\.dds$/i, new THREE.DDSLoader() );

		//location.hash = url;
		// var dragControls = new THREE.DragControls( OM.objects, THR.camera, THR.renderer.domElement );
		// dragControls.addEventListener( 'dragstart', function ( event ) { THR.controls.enabled = false; } );
		// dragControls.addEventListener( 'dragend', function ( event ) { THR.controls.enabled = true; } );

	}

};



FOO.testForObj = function () {

	if ( location.hash.endsWith( ".obj" ) === false ) { return; }
	//console.log( 'hash', location.hash );

	FOO.url = location.hash.slice( 1 );

	FOO.fileName = location.hash.split( "/" ).pop().slice( 0, -4 );
	//console.log( 'FOO.fileName', FOO.fileName  );

	let path = location.hash.slice( 1 ).split( "/" );
	path.pop();
	path = path.join( "/" ) + "/";
	//console.log( 'path', path );

	//OM.selected = [];

	FOO.loadObj( FOO.fileName, path );

	FOOdet.hidden = false;

	FOOdet.open = true;

	// OM.dragControls = new THREE.DragControls( THR.group.children, THR.camera, THR.renderer.domElement );
	// OM.dragControls.transformGroup = true;
	// OM.dragControls.addEventListener( 'dragstart', function ( event ) { THR.controls.enabled = false; } );
	// OM.dragControls.addEventListener( 'dragend', function ( event ) { THR.controls.enabled = true; } );


};



FOO.loadObj = function ( fName, path, params = {} ) {
	console.log( 'fName', fName );

	//FOO.getOpenNew();

	//THR.scene.add( THR.group );

	//console.log( 'path', path );
	//console.log( 'params', params );

	new THREE.MTLLoader( FOO.manager )
		.setPath( path )
		.load( fName + ".mtl", function ( materials ) {

			materials.preload();

			new THREE.OBJLoader( FOO.manager )
				.setMaterials( materials )
				.setPath( path )
				.load( fName + '.obj', function ( obj ) {
					console.log( "obj", obj );

					const object = obj;
					object.name = fName + ".obj";

					// OM.selected = [];

					// OM.selected.push( object );

					// OM.setDragControls( OM.selected )

					// dragControls = new THREE.DragControls( OM.selected, THR.camera, THR.renderer.domElement );
					// dragControls.transformGroup = true;
					// dragControls.addEventListener( 'dragstart', function ( event ) { THR.controls.enabled = false; } );
					// dragControls.addEventListener( 'dragend', function ( event ) { THR.controls.enabled = true; } );

					object.userData.url = FOO.url;

					//object.folder =
					object.position.set( + params.px || 0, +params.py || 0, +params.pz || 0 );
					object.rotation.set( + params.rx || 0, +params.ry || 0, +params.rz || 0 );
					object.scale.set( +params.sx || 1, +params.sy || 1, +params.sz || 1 );

					object.rotation.x = Math.PI / 2;
					//object.rotation.y = 7 * Math.random();

					//object.scale.set( 3, 3, 3 );
					object.children[ 0 ].receiveShadow = true;
					object.children[ 0 ].castShadow = true;

					THR.group.add( object );

					//OM.setDragControls();

					//OM.setDragControls( THR.group.children );

					//OM.objects.push( object );

					//OMselObjects.innerHTML += `<option>${ fName }</option>`;


				} );

		} );

};




FOO.requestFile = function ( url ) {

	const xhr = new XMLHttpRequest();
	xhr.open( 'GET', url, true );
	xhr.onerror = xhr => console.log( 'error:', xhr );
	xhr.onprogress = xhr => console.log( 'bytes loaded:', xhr.loaded );
	xhr.onload = xhr => FOO.callback( xhr.target.response );
	xhr.send( null );

};


FOO.callback = function ( text ) {

	FOO.jsonLines = text.split( /\r\n|\n/ )
		.filter( line => line.startsWith( "{" ) )
		.map( line => JSON.parse( line ) );

	//console.log( '', FOO.jsonLines );

	FOO.getObjects();

};



// FOO.setSelectOptions = function () {

// 	const options = group.children.map( ( child, i ) => `<option>${ child.name } ${ i + 1 }</option>` );

// 	FOOselObjects.innerHTML = options;

// };




FOO.getObjects = function () {

	for ( let line of FOO.jsonLines ) {

		folder = line.folder || "quaternius/ultimate-nature-pack/";

		if ( line.url.startsWith( "http" ) ) {

			//console.log( 'line', line );

			FOO.url = line.url;

			THR.elevationDelta = line.elevationDelta;

			FOO.requestFile( line.url );

		} else if ( line.url.endsWith( ".obj" ) ) {

			FOO.fileName = line.url.slice( 0, -4 );
			//console.log( 'FOO.fileName ', FOO.fileName  );

			FOO.loadObj( FOO.fileName, FOO.path + folder, line );

		}

	}

};



FOO.summer = [

	"BirchTree_1",
	"BirchTree_2",
	"BirchTree_3",
	"BirchTree_4",
	"BirchTree_5",
	"CommonTree_1",
	"CommonTree_2",
	"CommonTree_3",
	"CommonTree_4",
	"CommonTree_5",
	"Willow_1",
	"Willow_2",
	"Willow_3",
	"Willow_4",
	"Willow_5",

];



FOO.addForest = function ( count = 100 ) {

	FOradOpenNew.checked = false;

	//const gbx = THR.group.getObjectByName( "gbx" );
	const bbox = new THREE.Box3().setFromObject( THR.group );

	//THRbbox = new THREE.Box3().setFromObject( THR.gbx );

	console.log( 'bbox', bbox );

	let x = 0;
	let y = -30;

	for ( let i = 0; i < count; i++ ) {

		const tree = FOO.summer[ Math.floor( Math.random() * FOO.summer.length ) ];

		if ( i % 10 === 0 ) {

			x = -20;
			y += 10;

		} else {

			x += 10 + Math.random();

			y += Math.random();

		}

		//console.log( 'gg', bbox.containsPoint( new THREE.Vector3( x, y, 1 ) ) );

		if ( bbox.containsPoint( new THREE.Vector3( x, y, 1 ) ) ) {

			continue;

		}

		const line = { px: x, py: y, ry: 7 * Math.random(), "sx": 3 + Math.random(),  "sy": 3 + Math.random(), "sz": 3 + Math.random() };

		FOO.loadObj( tree, FOO.path + "quaternius/ultimate-nature-pack/", line );

	}

};




