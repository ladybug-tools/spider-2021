// copyright 2021 Theo Armour. MIT license.


/* global renderer, divPopUp */

const THRR = {
	// three.js pointer interaction with scene

	raycaster: new THREE.Raycaster(),
	pointer: new THREE.Vector2(),
	intersectObjects: [],
};


THRR.init = function () {

	const geometry = new THREE.BufferGeometry();
	geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( 4 * 3 ), 3 ) );

	const material = new THREE.LineBasicMaterial( { color: 0xffffff, transparent: true } );

	THRR.line = new THREE.LineLoop( geometry, material );
	THR.scene.add( THRR.line );

	THRR.intersectObjects = THR.group.children;

	THRR.addPointerDown();

	if ( !window.divPopUp ) {

		divPopUp = document.body.appendChild( document.createElement( "div" ) );
		divPopUp.classList.add( "infoTooltip" );

	}


};

THRR.addPointerDown = function () {

	THR.renderer.domElement.addEventListener( "pointerdown", THRR.onPointerDown );
	THR.renderer.domElement.addEventListener( "touchstart", THRR.onPointerDown );
	THR.renderer.domElement.addEventListener( "touchmove", THRR.onPointerDown );

	//divInfo.innerHTML = "";

};

THRR.onPointerDown = function ( event ) {

	//console.log( "event", event );

	if ( event.type === "touchmove" || event.type === "touchstart" ) {
		event.clientX = event.touches[ 0 ].clientX;
		event.clientY = event.touches[ 0 ].clientY;
	}

	THRR.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	THRR.pointer.y = -( event.clientY / window.innerHeight ) * 2 + 1;

	THRR.raycaster.setFromCamera( THRR.pointer, THR.camera );

	THRR.intersectObjects = THR.group.children; //.children.filter( mesh => mesh.visible );

	let intersects = THRR.raycaster.intersectObjects( THRR.intersectObjects, true );

	//console.log( "intersects", intersects );

	if ( intersects.length ) {

		THRR.intersected = intersects[ 0 ];

		//if ( intersected.instanceId ) {

		// if ( event.button === 2 && THRR.intersected.object.geometry.vertices ) {

		// 	vertices = THRR.intersected.object.geometry.vertices;

		// 	//console.log( "intersected", vertices );

		// 	THRR.intersected.object.visible = !THRR.intersected.object.visible;

		// 	THRU.addLine( THRR.intersected.object, vertices );

		// 	texts = vertices.map( ( vtx, i ) => THRU.drawPlacard( "" + i, THR.radius / 2000, 0xffffff, vtx.x, vtx.y, vtx.z ) );

		// 	THRR.intersected.object.add( ...texts );
		// 	//THRR.intersected.);

		// 	return;

		// }

		divPopUp.style.display = "block";
		divPopUp.style.left = event.clientX + 0 + "px";
		divPopUp.style.top = event.clientY + "px";
		divPopUp.innerHTML = THRR.getHtm( THRR.intersected );

		THR.renderer.domElement.addEventListener( "click", THRR.onClick );

		//}
	} else {
		if ( [ "touchstart", "touchmove", "pointerdown" ].includes( event.type ) ) {
			divPopUp.style.display = "none";
		}

		THRR.intersected = undefined;
	}
};

THRR.onClick = function () {

	if ( !THRR.intersected ) {
		divPopUp.style.display = "none";
	}

	THR.renderer.domElement.removeEventListener( "click", THRR.onClick );
};


THRR.getHtm = function ( intersected ) {
	//const htm = JSON.stringify( intersected.object, null, "<br>" ).slice( 1, - 1 ).replace( /[",]/g, "");

	const htm = JSON.stringify( intersected.object, null, "\t" ).replace( /[",]/g, "" );

	// htm = `
	// 	<a href="https://en.wikipedia.org/wiki/${ name }" target="_blank">${ name }</a><br>
	// 	${ ( + country[ 6 ] ).toLocaleString() } people
	// 	`;

	return htm;
};


THRR.getHtm = function ( intersected ) {

	console.log( "intersected", THRR.intersected );
	const mesh = THRR.intersected.object;

	const htm = `
	<div>
		id: ${ THR.group.children.indexOf( mesh ) }<br>
		geometry: ${ mesh.geometry.type }<br>
		name: ${ mesh.name }</br>
		uuid: ${ mesh.uuid }<br>
		<button onclick=THRR.getMeshData(${ THR.group.children.indexOf( mesh ) }); >view mesh data</button>
	</div>`;

	return htm;
};



THRR.getMeshData = function ( index ) {

	//console.log( "index", index );

	if ( window.JTV ) {

		JTV.init();

		JTV.onLoad( index );

		detNavMenu.open = true;
		detData.open = true;

	}



};

/////

THRR.getHtm = function ( intersected ) {
	console.log( "intersected", intersected );

	//if ( !geo ) { geo = new THREE.Geometry().fromBufferGeometry( intersected.object.geometry ); }
	//console.log( "geo", geo );

	let item;
	let index = intersected.faceIndex;

	for ( item = 0; item <= count; item++ ) {

		const limit = item * 12;

		if ( index < limit ) { break; }

	}

	htm = `
faceIndex: ${ intersected.faceIndex + 1 }<br>
item: ${ item }<br>
`;

	return htm;

};



THRR.getHtm = function ( intersected ) {
	//console.log( "intersected", intersected );

	//scene.updateMatrixWorld();
	const mesh = intersected.object;
	//mesh.updateMatrix();
	//console.log( "mesh", mesh );

	const meshPosition = mesh.geometry.attributes.position;
	const face = intersected.face;
	const vertexA = new THREE.Vector3().fromBufferAttribute( meshPosition, face.a );
	console.log( "vertex", vertexA );
	const linePosition = THRR.line.geometry.attributes.position;
	linePosition.copyAt( 0, meshPosition, face.a );
	linePosition.copyAt( 1, meshPosition, face.b );
	linePosition.copyAt( 2, meshPosition, face.c );
	linePosition.copyAt( 3, meshPosition, face.a );
	THRR.line.geometry.applyMatrix4( intersected.object.matrix );

	//mesh.children.forEach( ( mesh, index ) => {

	const rooms = mesh.userData.geometry;
	console.log( "mesh", mesh.userData.geometry );


	let index;

	for ( let i = 0; i < rooms.length; i++ ) {

		//console.log( "room", i, rooms[ i ] );
		const boundary = rooms[ i ].userData.face.geometry.boundary;


		for ( item of boundary ) {

			//console.log( "item", item );

			if ( item[ 0 ].toFixed( 4 ) === vertexA.x.toFixed( 4 ) &&
				item[ 1 ].toFixed( 4 ) === vertexA.y.toFixed( 4 )  &&
				item[ 2 ].toFixed( 4 ) === vertexA.z.toFixed( 4 )
			) {

				index = i; // Math.floor( i / 6 );
				//console.log( "bingo!", index, vertexA );
				console.log( "bingo!", index, item,"\n",vertexA );

				break;

			}

		}
	}

	let data
	if ( rooms[ index ] ) {

		const data = rooms[ index ].userData;
		console.log( "data", data );

	return `
id: ${ index }<br>
type: ${ mesh.name }<br>
name: ${ data.room[ 0 ].display_name }<br>
boundary: ${ data.face.boundary_condition.type }<br>`;

	} else {
		return "Not found. Try again"
	}



};
