////////// Interacting between DOM and 3D

/* global renderer, divPopUp */

const THRR = {
	// three.js pointer interaction with scene

	raycaster: new THREE.Raycaster(),
	pointer: new THREE.Vector2(),
	intersectObjects: [],
};


THRR.updateScene = function () {

	THRR.intersectObjects = THR.group.children;

	THRR.addPointerDown();

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

	THRR.intersectObjects = THR.group.children.filter( mesh => mesh.visible );

	let intersects = THRR.raycaster.intersectObjects( THRR.intersectObjects );

	//console.log( "intersects", intersects );

	if ( intersects.length ) {

		THRR.intersected = intersects[ 0 ];

		//if ( intersected.instanceId ) {


		if ( event.button === 2 && THRR.intersected.object.geometry.vertices ) {

			vertices = THRR.intersected.object.geometry.vertices;

			//console.log( "intersected", vertices );

			THRR.intersected.object.visible = !THRR.intersected.object.visible;

			THRU.addLine( THRR.intersected.object, vertices );

			texts = vertices.map( ( vtx, i ) => THRU.drawPlacard( "" + i, THR.radius / 2000, 0xffffff, vtx.x, vtx.y, vtx.z ) );

			THRR.intersected.object.add( ...texts );
			//THRR.intersected.);

			return;

		}

		divPopUp.hidden = false;
		divPopUp.style.left = event.clientX + 0 + "px";
		divPopUp.style.top = event.clientY + "px";
		divPopUp.innerHTML = THRR.getHtm( THRR.intersected );

		THR.renderer.domElement.addEventListener( "click", THRR.onClick );

		//}
	} else {
		if ( [ "touchstart", "touchmove", "pointerdown" ].includes( event.type ) ) {
			divPopUp.hidden = true;
		}

		THRR.intersected = undefined;
	}
};

THRR.onClick = function () {
	if ( !THRR.intersected ) {
		divPopUp.hidden = true;
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
		id: ${THR.group.children.indexOf( mesh ) }<br>
		geometry: ${ mesh.geometry.type }<br>
		name: ${ mesh.name }</br>
		uuid: ${mesh.uuid }<br>
		<button onclick=THRR.getMeshData(${THR.group.children.indexOf( mesh ) }); >view mesh data</button>
	</div>`;

	return htm;
};



THRR.getMeshData = function ( index ) {

	//console.log( "index", index );

	JTV.init();

	JTV.onLoad( index );

	detNavMenu.open = true;
	detData.open = true;

};
