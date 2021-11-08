

const OBT = {};



//OBT.path = "https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@gh-pages/";

OBT.path = "https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@gh-pages/";

//OBT.path = "https://raw.githack.com/ladybug-tools/3d-models/gh-pages/quaternius/";

OBT.fileName = "CommonTree_5";

OBT.urlDefaultFile = "quaternius/ultimate-nature-pack/CactusFlowers_5";

OBT.scripts = [
	"https://cdn.jsdelivr.net/gh/mrdoob/three.js@r133/examples/js/loaders/DDSLoader.js",
	"https://cdn.jsdelivr.net/gh/mrdoob/three.js@r133/examples/js/loaders/MTLLoader.js",
	"https://cdn.jsdelivr.net/gh/mrdoob/three.js@r133/examples/js/loaders/OBJLoader.js",
	"https://cdn.jsdelivr.net/gh/mrdoob/three.js@r133/examples/js/controls/DragControls.js"
];

OBT.loadedScripts = 0;

OBT.init = function () {

	FRXdivDetails.innerHTML += `
<p><button onclick=OBT.init() >test obj</button> <input type=file id=inpObj  onchange=OBT.parseObj() multiple ></p>`;

	FRX.loadLoaders( OBT, OBT.scripts, OBT.loadScripts );


};


OBT.loadScripts = function () {

	OBT.loadedScripts++;

	if ( OBT.loadedScripts === OBT.scripts.length ) {

		OBT.manager = new THREE.LoadingManager();

		OBT.manager.addHandler( /\.dds$/i, new THREE.DDSLoader() );

		//OBT.loadObj();

	}

};


OBT.parseObj = function () {

	let objUrl, mtlUrl;
	const files = inpObj.files;
	const objFile = Array.from( files ).find( file => file.name.toLowerCase().endsWith( 'obj' ) );
	const mtlFile = Array.from( files ).find( file => file.name.toLowerCase().endsWith( 'mtl' ) );

	//console.log( "objFile", objFile );

	const reader1 = new FileReader();
	reader1.onload = () => {
		mtlUrl = reader1.result;
		parseObj();
	}
	reader1.readAsText( mtlFile );

	function parseObj () {

		const reader0 = new FileReader();

		reader0.onload = () => {

			objUrl = reader0.result;

			//console.log( "objUrl", objUrl );

			const mtlLoader = new THREE.MTLLoader();

			const mtl = mtlLoader.parse( mtlUrl );

			const objLoader = new THREE.OBJLoader();

			objLoader.setMaterials( mtl );

			obj = objLoader.parse( objUrl );

			console.log( "obj", obj );

			COR.reset( obj.children );

		};

		reader0.readAsText( objFile );

	};




};


OBT.loadObj = function ( fName = OBT.urlDefaultFile, path = OBT.path ) {
	console.log( 'fName', fName );
	//console.log( 'path', path );
	//console.log( 'params', params );

	new THREE.MTLLoader( OBT.manager )
		.setPath( path )
		.load( fName + ".mtl", function ( materials ) {

			materials.preload();

			new THREE.OBJLoader( OBT.manager )
				.setMaterials( materials )
				.setPath( path )
				.load( fName + '.obj', function ( obj ) {

					const object = obj;
					object.name = fName + ".obj";

					console.log( "object", object );

					COR.reset( object.children );

				} );

		} );

};

