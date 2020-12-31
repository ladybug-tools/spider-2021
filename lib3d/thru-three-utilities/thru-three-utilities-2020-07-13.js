const THRU = {};


THRU.group = new THREE.Group();
THRU.groupTellTale = new THREE.Group();


THRU.setSceneNew = function () {

	THR.scene.remove(THRU.group,THRU.groupTellTale );

	THRU.group = new THREE.Group();
	THRU.groupTellTale = new THREE.Group();

	THR.scene.add(THRU.group,THRU.groupTellTale);

};



THRU.removeLines = function() {

	THRR.intersectObjects.forEach( item => {

		const lines = item.children.filter( child => child.type === "Line") ;
		item.remove( ... lines );

	} );

};

THRU.addTellTale = function( siz = 0.5 ) { 

	const geometry = new THREE.BoxBufferGeometry( siz, siz, siz );
	const material = new THREE.MeshNormalMaterial();
	THRU.tellTale = new THREE.Mesh( geometry, material );
	THRU.groupTellTale.add( THRU.tellTale );

	return THRU.tellTale;

};


THRU.addLine = function( mesh, vertices, color = 0x000000 ) { // THRR-caster only

	const geometry = new THREE.Geometry();
	geometry.vertices = vertices;
	const material = new THREE.LineBasicMaterial( { color: color } );
	const line = new THREE.Line( geometry, material );
	mesh.add( line );

	return line;

};

THRU.addMesh = function (size = 10) {
	// CylinderGeometry( radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded )
	// SphereGeometry( radius, segmentsWidth, segmentsHeight, phiStart, phiLength, thetaStart, thetaLength )
	// TorusGeometry( radius, tube, radialSegments, tubularSegments, arc )

	types = [
		new THREE.BoxBufferGeometry(size, size, size),
		new THREE.CylinderBufferGeometry(5, 5, size),
		new THREE.DodecahedronGeometry(5),
		new THREE.SphereBufferGeometry(0.5 * size),
		new THREE.TorusBufferGeometry(size, 0.5 * size),
		new THREE.TorusKnotBufferGeometry(size, 0.5 * size),
	];

	const geometry = types[Math.floor(types.length * Math.random())];

	// geometry.applyMatrix4( new THREE.Matrix4().makeRotationX( -0.5 * Math.PI ) );
	// geometry.applyMatrix4( new THREE.Matrix4().makeScale( 1, 1, 1 ) );
	// geometry.applyMatrix4( new THREE.Matrix4().makeTranslation( 0, 0, 0 ) );

	//const material = new THREE.MeshNormalMaterial( { transparent: true });  
	//const geometry = new THREE.BoxBufferGeometry(size, size, size);
	const material = new THREE.MeshPhongMaterial({ color: 0xffffff * Math.random(), opacity: 0.85, side: 1, specular: 0x444444, side: 2, transparent: true });
	mesh = new THREE.Mesh(geometry, material);
	mesh.userData.type = mesh.geometry.type;
	mesh.receiveShadow = true;
	mesh.castShadow = true;

	return mesh;
};



THRU.addMeshes = function (count = 100) {
	THR.group.add(
		...Array(count)
			.fill()
			.map(() => THRU.addMesh())
	);

	THR.group.children.forEach((mesh, i) => {
		mesh.position.set(Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100);
		mesh.rotation.set(0.2 * Math.random(), 0.2 * Math.random(), 0.2 * Math.random());
		mesh.userData.index = i;
		mesh.name = "mesh " + i;

	});
};



//////////

THRU.toggleBoundingBoxHelper = function( { group = THR.group, visible = undefined } = {} ) {

	if ( !THRU.boundingBoxHelper ) {

		const bbox = new THREE.Box3().setFromObject( group );

		THRU.boundingBoxHelper = new THREE.Box3Helper( bbox, 0xff0000 );
		THRU.boundingBoxHelper.geometry.computeBoundingBox();
		THRU.boundingBoxHelper.name = "boundingBoxHelper";
		THRU.group.add( THRU.boundingBoxHelper );

	 } else {

		THRU.boundingBoxHelper.visible = visible || !THRU.boundingBoxHelper.visible;

	}

};



THRU.toggleWireframe = function( obj = THR.group ) {

	obj.traverse( child => {

		if ( child instanceof THREE.Mesh ) {

			child.material.wireframe = !child.material.wireframe;

		}

	} );

};



THRU.toggleMeshEdges = function( obj = THR.group) {

	if ( !THR.group.userData.edges ) {

		const lineMaterial = new THREE.LineBasicMaterial( { color: 0x000000 } );

		for ( let mesh of obj.children ) {

			if ( !mesh.geometry ) { continue; }

			const edgesGeometry = new THREE.EdgesGeometry( mesh.geometry );
			const surfaceEdge = new THREE.LineSegments( edgesGeometry, lineMaterial );
			//surfaceEdge.rotation.copy( mesh.rotation );
			//surfaceEdge.position.copy( mesh.position );
			mesh.add( surfaceEdge );

		}

		THR.group.userData.edges = true

		return;

	}


	obj.traverse( child => {

		if ( child instanceof THREE.Line ) {

			child.visible = !child.visible;

		}

	} );

};


// not

THRU.toggleSurfaceNormalsVisible = function( obj = THR.group ) {

	let material = new THREE.MeshNormalMaterial();
	
	const types = [ 'BoxBufferGeometry', 'BufferGeometry', 'ConeBufferGeometry', 'CylinderBufferGeometry',
	'ShapeBufferGeometry', 'SphereBufferGeometry' ];
	
	if ( THR.scene.children.includes( THRU.helperNormalsFaces ) ) {
		
		THR.scene.remove( THRU.helperNormalsFaces );
		
	} else {
		
		
		THRU.helperNormalsFaces = new THREE.Group();
		
		obj.traverse( function ( child ) {
			
			if ( child instanceof THREE.Mesh && child.visible ) {
				
				if ( child.geometry.type === 'ShapeGeometry' ) {
					
					child.geometry.computeFaceNormals();
					
					const helperNormalsFace = new THREE.FaceNormalsHelper( child, 2, 0xff00ff, 3 );
					THRU.helperNormalsFaces.add( helperNormalsFace );
					//THRU.helperNormalsFaces.visible = false;
					console.log( 'helperNormalsFace', helperNormalsFace );
					
				} else if ( types.includes( child.geometry.type ) === true ) {
					console.log( "", 23 ); 

					const geometry = new THREE.Geometry();
					const geo = geometry.fromBufferGeometry( child.geometry );
					const mesh = new THREE.Mesh( geo, material );
					mesh.rotation.copy( child.rotation );
					mesh.position.copy( child.position );

					const helperNormalsFace = new THREE.FaceNormalsHelper( mesh, 0.05 * THRU.radius, 0xff00ff, 3 );
					helperNormalsFace.userData.index = child.userData.index;

					THRU.helperNormalsFaces.add( helperNormalsFace );
					//THRU.helperNormalsFaces.visible = false;

				} else {

					console.log( 'child.geometry.type', child.geometry.type );

				}

			}

		} );

		THRU.helperNormalsFaces.name = 'helperNormalsFaces';

		THR.scene.add( THRU.helperNormalsFaces );

	}

};

////////// Material handling

THRU.setObjectOpacity = function( obj = THR.group, range = THRrngOpacity ) {

	const opacity = parseInt( range.value, 10 );
	//outOpacity.value = opacity + "%";

	//console.log( "opacity", opacity );

	obj.traverse( child => {

		if ( child instanceof THREE.Mesh ) {

			child.material.opacity = opacity / 100;

		}

	} );

};



////////// text


//THRU.drawPlacard = function( text = 'abc', scale = 0.05, color = Math.floor( Math.random() * 255 ), x = 0, y = 0, z = 10 ) {
THRU.drawPlacard = function( text = 'abc', scale = 0.05, color = Math.floor( Math.random() * 255 ), position) {

	// add update
	// 2019-07-12 ~ https://github.com/jaanga/jaanga.github.io/tree/master/cookbook-threejs/examples/placards

	const placard = new THREE.Object3D();

	const texture = canvasMultilineText( text, { backgroundColor: color  }  );
	const spriteMaterial = new THREE.SpriteMaterial( { map: texture, opacity: 0.9, transparent: true } );
	const sprite = new THREE.Sprite( spriteMaterial );
	sprite.position.copy( position );
	sprite.scale.set( scale * texture.image.width, scale * texture.image.height );

	//const geometry = new THREE.Geometry();
	//const v = function( x, y, z ){ return new THREE.Vector3( x, y, z ); };
	//geometry.vertices = [ v( 0, 0, 0 ),  v( x, y, z ) ];
	//const material = new THREE.LineBasicMaterial( { color: 0xaaaaaa } );
	//const line = new THREE.Line( geometry, material );
	//placard.add( sprite, line );

	placard.add( sprite );

	return placard;


	function canvasMultilineText( textArray, parameters ) {

		parameters = parameters || {} ;

		const canvas = document.createElement( 'canvas' );
		const context = canvas.getContext( '2d' );
		let width = parameters.width ? parameters.width : 0;
		const font = parameters.font ? parameters.font : '48px monospace';
		const color = parameters.backgroundColor ? parameters.backgroundColor : 120 ;

		if ( typeof textArray === 'string' ) textArray = [ textArray ];

		context.font = font;

		for ( let i = 0; i < textArray.length; i++) {

			width = context.measureText( textArray[ i ] ).width > width ? context.measureText( textArray[ i ] ).width : width;

		}

		canvas.width = width + 20;
		canvas.height =  parameters.height ? parameters.height : textArray.length * 60;

		//context.fillStyle = 'hsl( ' + color + ', 80%, 50% )' ;
		//context.fillRect( 0, 0, canvas.width, canvas.height);

		// context.lineWidth = 1 ;
		// context.strokeStyle = '#000';
		// context.strokeRect( 0, 0, canvas.width, canvas.height );

		context.fillStyle = '#000' ;
		context.font = font;

		for ( let i = 0; i < textArray.length; i++) {

			context.fillText( textArray[ i ], 10, 48  + i * 60 );

		}

		const texture = new THREE.Texture( canvas );
		texture.minFilter = texture.magFilter = THREE.NearestFilter;
		texture.needsUpdate = true;

		return texture;

	}

};



THRU.addText = function( text = "Hello world!\n123", position = new THREE.Vector3() ) {

	textMesh = new troika_3d_text.TextMesh();
	//textMesh.font = "../../asTHRUs/Inconsolata-Regular.ttf";
	textMesh.text = text;
	textMesh.fontSize = 0.1 * THR.radius;
	textMesh.rotation.x = 0.5 * Math.PI;
	textMesh.position.copy( position );
	textMesh.castShadow = true;
	textMesh.color = "maroon";

	bbox = textMesh.geometry; //.computeBoundingBox();
	console.log( "bbox", bbox );
	THRU.group.add(textMesh);

	// be sure to call sync() after all properties are THRU to update the rendering:
	//textMesh.sync();

  };



  THRU.addDoubleSidedText = function ( {
	text = "Hello, World!\nThree.js\nabc 123",
	color = 0xffffff * Math.random(),
	size = 5,
	position = new THREE.Vector3( 10, 10, 10)

} = {} ) {

	const textMesh = new troika_3d_text.TextMesh();
	textMesh.text = "1 " + text;
	textMesh.fontSize = size;
	textMesh.rotation.y = 0.5 * Math.PI;
	textMesh.rotation.x = 1.507;
	textMesh.anchorX = "center";
	textMesh.anchorY = "middle";
	textMesh.position.copy( position );
	textMesh.color = color;
	textMesh.material.side = 0;
	textMesh.name = "1 " + text;

	// textMesh2 = new troika_3d_text.TextMesh();
	// textMesh2.text = "2 " + text;
	// textMesh2.fontSize = size;
	// textMesh2.rotation.x = 0.5 * Math.PI;
	// textMesh2.rotation.y = Math.PI;
	// textMesh2.anchorX = "center";
	// textMesh2.anchorY = "middle";
	// textMesh2.position.copy( position );
	// textMesh2.material.color = new THREE.Color( "red");
	// textMesh2.material.side = 0;
	// textMesh2.name = "2 " + text;

	textMesh2 = textMesh.clone();
	textMesh2.rotation.y = Math.PI;
	//textMesh2.material.color = new THREE.Color( "red");

	// const geometry = new THREE.BoxBufferGeometry( );
	// const material = new THREE.MeshNormalMaterial();
	// const mesh = new THREE.Mesh(geometry, material);
	// mesh.position.copy( position )

	return [ textMesh, textMesh2 ];

};



  THRU.toggleTitles = function() {

	THR.group.children.map( child => {

		text = child.name;
		position = child.position.clone().add( new THREE.Vector3( 0, 0, 8 ) )

		//THRU.addText( text, child.position );
		child.add( ... THRU.addDoubleSidedText( { text: text, position: new THREE.Vector3( 0, 0, 8 )  }) );

	})
  };


////////// camera

  THRU.toggleCameraOrthoPerspective = function() {


	if ( THRU.cameraOrtho === undefined ) {

		THRU.cameraPerspective = THR.camera;
		THRU.controlsPerspective = THR.controls;

		const r = THR.radius;
		THRU.cameraOrtho = new THREE.OrthographicCamera( -r, r, r, -r, 1, 1000 );
		THRU.cameraOrtho.up.set( 0, 0, 1 );
		THR.scene.add( THRU.cameraOrtho );
		THRU.controlsOrtho = new THREE.OrbitControls( THRU.cameraOrtho, THR.renderer.domElement );
	}

	if ( THRUbutOrtho.style.backgroundColor !== "pink" ) {

		THR.camera = THRU.cameraOrtho;
		THR.camera.updateProjectionMatrix();
		THR.controls = THRU.controlsOrtho;

		//GBX.THRUAllVisible();
		THR.zoomObjectBoundingSphere();

		THRUbutOrtho.style.backgroundColor = "pink";

		lblFOV.hidden = true;

	} else {

		THR.camera = THRU.cameraPerspective;
		THR.camera.updateProjectionMatrix();
		THR.controls = THRU.controlsPerspective;
		//THR.scene.remove( THRU.cameraOrtho );

		//GBX.THRUAllVisible();
		THR.zoomObjectBoundingSphere();

		THRUbutOrtho.style.backgroundColor = "";

		lblFOV.hidden = false;
	}

};


THRU.setCameraPosition = function (view) {

	const v = ( x, y, z ) => new THREE.Vector3( x, y, z );

	const views = {
		top: v( 0, 0, 2 * THR.radius ),
		front: v( 0, -2 * THR.radius, 0 ),
		back: v( 0, 2 * THR.radius, 0 ),
		right: v( 2 * THR.radius, 0, 0 ),
		left: v( -2 * THR.radius, 0, 0 ),
		bottom: v( 0, 0, -2 * THR.radius )

	}

	THR.camera.position.copy( THR.controls.target.clone().add( views[ view ]));

	// THR.camera.up.set(0, 0, 1);
	
	// if ( THR.camera.type === "PerspectiveCamera" ) {

	// 	//THR.zoomToFitObject();

	// } 

};


THRU.setFieldOfView = function( range ){

	angle = + range.value

	THR.camera.fov = angle;
	THR.camera.updateProjectionMatrix ();

};


THRU.setCameraNear = function( range) {

	//console.log( "", range.value );        
	
	distance = THR.camera.position.distanceTo( THR.axesHelper.position ) + THR.radius;

	THR.camera.near = + ( distance * ( + range.value / 100 ) );

	//console.log( "THR.camera.near", THR.camera.near );

	THR.camera.updateProjectionMatrix ();
};


//////////

THRU.setObjectExplode = function( range ) {

	const scale = range.value / 100;

	THR.group.children.forEach( obj => {
		if ( !obj.position.original) { obj.position.original = obj.position.clone();
	} } );

	THR.group.children.forEach( obj => {
		
		obj.position.copy( obj.position.original.clone().multiplyScalar( 1 + scale ) ) 
		
	} );

};


