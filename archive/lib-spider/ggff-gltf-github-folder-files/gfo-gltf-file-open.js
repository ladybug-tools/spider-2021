const GFO = {};

GFO.init = function () {

	window.addEventListener( "hashchange", GFO.onHashChange );

	GFO.reset();

	if ( location.hash ) {

		GFO.onHashChange();

	}

};



GFO.onHashChange = function () {

	console.log( 'hash', location.hash );

	THRU.setSceneNew();

	const fileName = location.hash.split( "/" ).pop();

	GFO.url = location.hash.slice( 1 );

	GFO.url = `https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/${ fileName }/glTF/${ fileName }.gltf`;

	GFO.loadGltf( GFO.url );

};



GFO.loadGltf = function ( url ) {

	const script = document.head.appendChild( document.createElement( "script" ) );

	script.onload = () => {

		const loader = new THREE.GLTFLoader();

		loader.load(
			// resource URL
			url,
			// called when the resource is loaded
			function ( gltf ) {

				THR.scene.add( gltf.scene );

				gltf.animations; // Array<THREE.AnimationClip>
				gltf.scene; // THREE.Group
				gltf.scenes; // Array<THREE.Group>
				gltf.cameras; // Array<THREE.Camera>
				gltf.asset; // Object

				console.log( "gltf.asset", gltf.asset );

				//THR.updateScene();

				//THR.zoomObjectBoundingSphere();

				//object = THR.scene.children[ 7 ];
				//THR.zoomToFitObject( object );

			},
			// called while loading is progressing
			function ( xhr ) {

				console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

			},
			// called when loading has errors
			function ( error ) {

				console.log( 'An error happened' );

			}

		)

	};

	script.src = "https://cdn.rawgit.com/mrdoob/three.js/r123/examples/js/loaders/GLTFLoader.js";

};


GFO.reset = function () {

	FOOdivLog.innerHTML = "";

	GFO.extension = ".gltf";

	GFO.fileName = undefined;
	GFO.hostName = undefined;
	//GFO.objects = undefined;
	GFO.messagePopUp = "<p>When you touch a surface,<br>the rotation will stop<br>and its details will appear here</p>";
	GFO.onLoad = GFO.onLoadXhr;
	//GFO.doNext = () => {};
	GFO.responseType = "text";
	GFO.string = undefined;
	GFO.timeStart = undefined;
	GFO.url = undefined;
	GFO.xhr = new XMLHttpRequest();

};





GFO.requestFile = function ( url = urlGbxmlDefault, onLoad = GFO.onLoadXhr ) {

	//console.log( 'url', url );

	GFO.timeStart = performance.now();

	GFO.url = url;
	GFO.fileName = GFO.url.split( "/" ).pop();
	GFO.extension = GFO.fileName.split( "." ).pop().toLowerCase();
	//console.log( "GFO.extension ",  GFO.extension );
	//console.log( "GFO.responseType",  GFO.responseType );

	GFO.responseType = GFO.extension === "json" ? "json" : "text";

	GFO.responseType = GFO.extension === "zip" ? "blob" : GFO.responseType;
	//console.log( "GFO.responseType",  GFO.responseType );

	GFO.xhr.open( 'GET', url, true );
	GFO.xhr.responseType = GFO.responseType;
	GFO.xhr.onerror = function ( xhr ) { console.log( 'error:', xhr ); };
	GFO.xhr.onprogress = function ( xhr ) { GFO.onProgress( xhr.loaded, GFO.note ); };
	GFO.xhr.onload = onLoad;
	GFO.xhr.send( null );

	//const path = location.hash.slice( 1 ).split( "/" )

	const a = document.createElement( 'a' );
	a.href = url;
	GFO.hostName = a.hostname;

};



GFO.onProgress = function ( size = 0, note = "" ) {

	GFO.timeToLoad = ( performance.now() - GFO.timeStart ).toLocaleString();
	GFO.size = size;

	GFO.fileInfo =
		`
		<p>
			<span class=attributeTitle >File name</span>: <span class=attributeValue >${ GFO.fileName }</span></br>
			<span class=attributeTitle >Host|type</span>: <span class=attributeValue >${ GFO.hostName }</span></br>
 			<span class=attributeTitle >Bytes loaded</span>: <span class=attributeValue >${ size.toLocaleString() }</span></br>
			<span class=attributeTitle >Time to load</span>: <span class=attributeValue>${ GFO.timeToLoad } ms</span></br>
			${ note }
		</p>
	`;
	FOOdivLog.innerHTML = GFO.fileInfo;

};



GFO.onLoadXhr = function ( xhr ) {
	//console.log( 'xhr', xhr.loaded, xhr );

	if ( xhr.loaded < 30000 ) {

		console.log( "small data warning - file may not be fully loaded" );

		//return;
	}
	GFO.onProgress( xhr.loaded, "Load complete" );

	GFO.string = xhr.target.response;

	if ( GFO.extension === "zip" ) {

		GFO.dataZip = GFO.string;
		FOZ.onLoadFile();

	} else {

		//GFO.onLoadFile();

		console.log( "", GFO.string );

	}

};


