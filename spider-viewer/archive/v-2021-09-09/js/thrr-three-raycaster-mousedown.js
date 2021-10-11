// copyright 2021 Theo Armour. MIT license.
/* global THREE, COR */
// jshint esversion: 6
// jshint loopfunc: true

/* global renderer, divPopUp */

const THRR = {
	// three.js pointer interaction with scene

	intersectObjects: [],
	line: undefined,
	pointer: new THREE.Vector2(),
	raycaster: new THREE.Raycaster(),
};


THRR.init = function () {

	THRR.geometryLine = new THREE.BufferGeometry();
	//geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( 3 * 3 ), 3 ) );

	THRR.materialLine = new THREE.LineBasicMaterial( { color: 0xffffff, transparent: true } );

	THR.group.remove( THRR.line );
	THRR.line = new THREE.LineLoop( THRR.geometryLine, THRR.materialLine );
	THR.group.add( THRR.line );

	THRR.intersectObjects = THR.group.children;

	THRR.addPointerDown();

	THRR.getHtm = THRR.getHtmDefault;

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

	if ( event.button !== 2 ) { THRR.onClick(); return; }

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

	//if ( !THRR.intersected ) {
		divPopUp.style.display = "none";
	//}

	THR.renderer.domElement.removeEventListener( "click", THRR.onClick );

};




// THRR.getHtmDefault = function ( intersected ) {
// 	//const htm = JSON.stringify( intersected.object, null, "<br>" ).slice( 1, - 1 ).replace( /[",]/g, "");

// 	const htm = JSON.stringify( intersected.object, null, "\t" ).replace( /[",]/g, "" );

// 	// htm = `
// 	// 	<a href="https://en.wikipedia.org/wiki/${ name }" target="_blank">${ name }</a><br>
// 	// 	${ ( + country[ 6 ] ).toLocaleString() } people
// 	// 	`;

// 	return htm;
// };



// THRR.getHtmDefault = function ( intersected ) {

// 	console.log( "intersected", THRR.intersected );

// 	const mesh = THRR.intersected.object;

// 	const htm = `
// 	<div>
// 		id: ${ THR.group.children.indexOf( mesh ) }<br>
// 		geometry: ${ mesh.geometry.type }<br>
// 		name: ${ mesh.name }</br>
// 		uuid: ${ mesh.uuid }<br>
// 		<button onclick=THRR.getMeshData(${ THR.group.children.indexOf( mesh ) }); >view mesh data</button>
// 	</div>`;

// 	return htm;
// };



// THRR.getMeshData = function ( index ) {

// 	//console.log( "index", index );

// 	if ( window.JTV ) {

// 		JTV.init();

// 		JTV.onLoad( index );

// 		detNavMenu.open = true;
// 		detData.open = true;

// 	}

// };



// THRR.getHtmDefault = function ( intersected ) {
// 	console.log( "intersected", intersected );

// 	//if ( !geo ) { geo = new THREE.Geometry().fromBufferGeometry( intersected.object.geometry ); }
// 	//console.log( "geo", geo );

// 	let item;
// 	let index = intersected.faceIndex;

// 	for ( item = 0; item <= count; item++ ) {

// 		const limit = item * 12;

// 		if ( index < limit ) { break; }

// 	}

// 	htm = `
// faceIndex: ${ intersected.faceIndex + 1 }<br>
// item: ${ item }<br>
// `;

// 	return htm;

// };




THRR.getHtmDefault = function ( intersected ) {

	console.log( "intersected", intersected );

	THRR.timeStart = performance.now();
	THR.scene.updateMatrixWorld();
	mesh = intersected.object;
	mesh.updateMatrix();
	//console.log( "mesh", mesh );

	const meshPosition = mesh.localToWorld( mesh.geometry.attributes.position );
	const face = intersected.face;
	const vertexA = new THREE.Vector3().fromBufferAttribute( meshPosition, face.a );
	//console.log( "vertex", vertexA );
	const vertexB = new THREE.Vector3().fromBufferAttribute( meshPosition, face.b );
	const vertexC = new THREE.Vector3().fromBufferAttribute( meshPosition, face.c );

	THRR.geometryLine = new THREE.BufferGeometry().setFromPoints( [ vertexA, vertexB, vertexC ] );
	//geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( 3 * 3 ), 3 ) );

	THRR.materialLine = new THREE.LineBasicMaterial( { color: 0x000000, transparent: false } );

	THR.scene.remove( THRR.line );
	THRR.line = new THREE.LineLoop( THRR.geometryLine, THRR.materialLine );
	THR.scene.add( THRR.line );

	//mesh.children.forEach( ( mesh, index ) => {

	//const rooms = mesh.userData.geometry;
	console.log( "mesh", mesh.userData );

	const htm = `
	<div>
face index: ${ intersected.faceIndex }<br>
type: ${ mesh.type}<br>
has user data: ${ !!mesh.userData.attributes }
	</div>`;

	// children:<br>${ children }<br>

	return htm
};



